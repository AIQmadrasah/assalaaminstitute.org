const axios = require('axios').default;

module.exports.send = (msg) => {
    axios({
        method: "POST",
        url: 'https://discord.com/api/webhooks/972928466888564856/7eMGqQdeh955qQpLbAUmglFjjsX1U97plS5_MSgunLGvqdCn6AhosLubCE7b097BDaQj',
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            username: 'AIQ leaderboard',
            content: msg
        })
    })
}