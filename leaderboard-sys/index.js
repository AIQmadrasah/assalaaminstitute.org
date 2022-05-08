require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

const main = async () => {
    const client = await auth.getClient()
    const googleSheets = google.sheets({ version: 'v4', auth: client })
    
    const getDailyVals = async () => {
        return (await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: process.env.SHEET_ID,
            range: `Daily!A2:H${process.env.RANGE}`
        })).data.values?.filter((entry) => entry[0]).map((entry) => {
            const points = entry[entry.length - 1];
            return {
                name: entry[0], 
                points: parseInt(points),
                sabaq: parseInt(entry[1]),
                sabaqpara: parseInt(entry[2]),
                dour: parseInt(entry[3]),
                attendance: parseInt(entry[4]),
                clothing: parseInt(entry[5]),
            }
        })
    }

    const getMonthlyVals = async () => {
        return (await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: process.env.SHEET_ID,
            range: `Monthly!A2:B${process.env.RANGE}`
        })).data.values?.filter((entry) => entry[0]).map((entry) => {
            const name = entry[0];
            const points = entry[entry.length - 1];
            return { name: name, points: parseInt(points) };
        })
    }

    const cacheVals = async () => {
        const values = await getDailyVals();

        values.forEach(async(value) => {
            const name = value.name.replaceAll(' ', '_');
            const date = new Date().toLocaleString().split(',')[0];
            value.date = date;
            const fp = `cache/${name}.txt`;
            if(!fs.existsSync(fp)) fs.writeFileSync(fp, JSON.stringify(value), { encoding: 'utf-8' });
            let cur = fs.readFileSync(fp, { encoding: 'utf-8' }) || '';
            if(cur.includes(date)) return;
            if(cur.split('\n').length > process.env.CACHE_THRESHOLD) {
                let cur2 = cur.split('\n');
                cur2.shift();
                cur2 = cur2.join('\n');
                cur = cur2;
            }
            fs.writeFileSync(fp, `${cur}\n${JSON.stringify(value)}`, { encoding: 'utf-8' });
        })
    }

    const saveToMonthlySheet = async () => {
        const daily = await getDailyVals();
        const monthly = await getMonthlyVals();
        const combined = daily.map((entry, index) => ([entry.name, entry.points + monthly[index].points ]));
        googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId: process.env.SHEET_ID,
            range: 'Monthly!A:B',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    ['Name', 'Monthly points'],
                    ...combined
                ]
            }
        }).catch(console.error);
    }

    const reset = async () => {

    }

    require('./server')(getDailyVals);

    setInterval(async () => {
        const now = new Date();
        const day = ({ 'mon': 1, 'tues': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 })[Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(now).toLowerCase()]
        const hour = now.getHours();
        const min = now.getMinutes();

        if(day == 6 || day == 7) return;
        
        if(hour == 23 && min == 0) {
            await cacheVals();
            await saveToMonthlySheet();
            await reset();
        }
    }, 60000);
}

main();