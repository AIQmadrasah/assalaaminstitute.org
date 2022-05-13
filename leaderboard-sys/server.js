const { exec } = require('child_process');
const express = require('express');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const ngrok = require('ngrok');
const cors = require('cors');
const { send } = require('./discord');

const server = express();
const execute = (cmd) => new Promise((res, rej) => exec(cmd).on('close', res).on('error', rej));

server.use(cors())

module.exports = (getMonthlyVals) => {
    server.get('/', (req, res) => res.send('AIQ leaderboard system api'));

    server.get('/profile/:user', (req, res) => {
        if(req.query.pass != process.env.SERVER_PASS) return res.json({ error: 'Wrong password' });
        const user = req.params.user.replaceAll(' ', '_');
        if(!existsSync(`cache/${user}.txt`)) return res.json({ error: 'Invalid User' });
        const data = readFileSync(`cache/${user}.txt`, { encoding: 'utf-8' }).split('\n').map((entry) => JSON.parse(entry));
        res.json(data);
    })
    
    server.get('/leaderboard', async (req, res) => {
        console.log('/leaderboard');
        if(req.query.pass != process.env.SERVER_PASS) return res.json({ error: 'Wrong password' });
        const data = await getMonthlyVals();
        res.json(data);
    })
    
    server.listen(process.env.SERVER_PORT, async () => {
        console.log(`Server started on port :${process.env.SERVER_PORT}`);
        const ngrokURL = await ngrok.connect(process.env.SERVER_PORT);
        console.log(`ngrok tunnel started on ${ngrokURL}`);
        writeFileSync('HOST', ngrokURL, { encoding: 'utf-8' });
        await execute('git add HOST');
        await execute('git commit -m "[leaderboard-sys/server.js]: Update HOST"');
        await execute('git push');
        console.log('Pushed updated HOST file to github');
        send('Pushed updated "HOST" file to github');
    })
}