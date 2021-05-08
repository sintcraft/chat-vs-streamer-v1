require('dotenv').config()
const express = require('express')
const SocketIO = require('socket.io')
const mineflayer = require('mineflayer')
const tmi = require('tmi.js')
const config = require('./util').getConfig()
const app = express()
const bot = new tmi.Client({
    identity: {
        username: process.env.clientUser,
        password: process.env.clientToken,
      },
      channels: [
        config.streamer
      ]
})
const BotMc = mineflayer.createBot({
  username: process.env.BotMcName,
  host: process.env.BotMcHost,
  port: process.env.BotMcPort,
  version: false
})

const Router = require('./router')
const rewards = require('./events/twitch/rewards')
const ready = require('./events/twitch/ready')
const McLogin = require('./events/MC/login')
const util = require('./util')
const { getEnabledSystem } = require('./util')

// variables
var port = process.env.PORT || 3000
var EnabledSystem = false


// app uses
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', Router)


// Logins
bot.connect()

const server = app.listen(port, function(err) {
    if(err)throw err
    console.log('Escuchando en el puerto', port)
})

//sockets
const io = SocketIO(server)

io.on('connection', function(socket){
  //console.log('Nuevo socket', socket.id)
})


// Eventos
bot.on('chat', rewards.bind(null, bot, io, BotMc))
bot.on('connected', ready.bind(null, bot))

BotMc.on('login', McLogin.bind(null, BotMc))
BotMc.on('chat', async(username, msg) => {
  EnabledSystem = util.getEnabledSystem()
  if(!EnabledSystem && msg=='start' && username==config.streamer){
    util.EnabledSystem(BotMc, true)
    util.runList(io, BotMc)
  }
  if(EnabledSystem && msg=='stop' && username==config.streamer){
    util.EnabledSystem(BotMc, false)
  }
})