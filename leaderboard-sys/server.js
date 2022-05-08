const express = require('express');
const { writeFileSync } = require('fs');
const ngrok = require('ngrok');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello there.');
})

server.listen(process.env.SERVER_PORT, async () => {
    console.log(`Server started on port :${process.env.SERVER_PORT}`);
    const ngrokURL = await ngrok.connect(process.env.SERVER_PORT);
    console.log(`ngrok tunnel started on ${ngrokURL}`);
    writeFileSync('HOST', ngrokURL, { encoding: 'utf-8' });
})