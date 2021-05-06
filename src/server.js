const express = require('express')
const app = express()
const tmi = require('tmi.js')
const config = require('./util').getConfig()
const bot = new tmi.Client({
    identity: {
        username: process.env.clientUser,
        password: process.env.clientToken,
      },
      channels: [
        config.streamer
      ]
})

const rewards = require('./events/rewards')
const ready = require('./events/ready')

// variables
var port = process.env.PORT || 3000


// Eventos
bot.on('chat', rewards.bind(null, bot))
bot.on('connected', ready.bind(null, bot))



// Logins
bot.connect()

app.listen(port, function(err) {
    if(err)throw err
    console.log('Escuchando en el puerto', port)
})