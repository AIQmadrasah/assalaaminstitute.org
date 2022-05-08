require('dotenv').config();
require('./server');
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
            const name = entry[0];
            const points = entry[entry.length - 1];
            return { name: name, points: parseInt(points) };
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
            const points = value.points;
            const date = new Date().toLocaleString().split(',')[0];
            const fp = `cache/${name}.txt`;
            if(!fs.existsSync(fp)) fs.writeFileSync(fp, `${date} | ${points}`, { encoding: 'utf-8' });
            let cur = fs.readFileSync(fp, { encoding: 'utf-8' }) || '';
            if(cur.includes(date)) return;
            if(cur.split('\n').length > process.env.CACHE_THRESHOLD) {
                let cur2 = cur.split('\n');
                cur2.shift();
                cur2 = cur2.join('\n');
                cur = cur2;
            }
            fs.writeFileSync(fp, `${cur}\n${date} | ${points}`, { encoding: 'utf-8' });
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
}

main();