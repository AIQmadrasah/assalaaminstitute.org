const axios = require('axios').default;

module.exports.send = (msg) => {
    axios({
        method: "POST",
        url: process.env.WEBHOOK,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            username: 'AIQ leaderboard',
            content: msg
        })
    })
}