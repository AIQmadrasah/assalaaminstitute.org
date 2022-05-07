require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creditials = require('./credentials.json');

const sheet = new GoogleSpreadsheet(process.env.SHEET_ID);

(async () => {
    await sheet.useServiceAccountAuth({
        client_email: creditials.client_email,
        private_key: creditials.private_key
    })
    await sheet.loadInfo();
    console.log(`Gained access to "${sheet.title}" sheet`);

    const daily = sheet.sheetsByIndex.filter((n) => n.title.toLowerCase().includes('daily'))[0];
    const monthly = sheet.sheetsByIndex.filter((n) => n.title.toLowerCase().includes('month'))[0];
})();