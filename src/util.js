const { json } = require('express')
const fs = require('fs')
const config = require('../config.json')
const sockets = require('./sockets')
var data = require('./actions.json')
var EnabledSystem = false

module.exports = {
    getConfig(){return config},
    saveAction(action){
        data.push(action)
        fs.writeFileSync(__dirname + '/actions.json', JSON.stringify(data), 'utf8')
    },
    clearActions(){
        fs.writeFileSync(__dirname + '/actions.json', JSON.stringify([]), 'utf8')
        data = []
    },
    getEnabledSystem(){
        return EnabledSystem
    },
    EnabledSystem(BotMc, status){
        EnabledSystem = status
        if(EnabledSystem){
            BotMc.chat('/say Activado!')
        }else{
            BotMc.chat('/say Apgado..')
        }
    },
    makeCommand(msg){
        msg = msg
                .replace('${streamer}', config.streamer)
                .replace('${streamer}', config.streamer)
                .replace('${cords5}', this.getRandomInt(-5, 5))
                .replace('${cords10}', this.getRandomInt(-10, 10))
                .replace('${cords20}', this.getRandomInt(-20, 20))
        return msg
    },
    async runList(io, BotMc){
        for(let action of data){
            BotMc.chat('/execute positioned as @a run playsound minecraft:entity.player.levelup ambient @a')
            BotMc.chat(this.makeCommand(action.action))
            BotMc.chat(this.makeMessage(action.user, action.name, action.status, action.cant))
            this.emitSocketsMsg(io, action.msg)
        }
        this.clearActions()
    },
    getRandomInt(min, max){
        let x = Math.floor(Math.random() * (max - min)) + min
        let z = Math.floor(Math.random() * (max - min)) + min
        return '~' + x + ' ~ ~' + z
    },
    async emitSocketsMsg(oi, msg){
        await sockets.tts(oi, msg)
    },
    makeMessage(user, rewardName, status, cant){
        if(status=='reward'){
            let msg = config.messageRewardType
            msg = msg
                    .replace('${user}', user)
                    .replace('${rewardName}', rewardName)
            return msg
        }else if(status=='bits'){
            let msg = config.messageBitsType
            console.log('as')
            msg = msg
                    .replace('${user}', user)
                    .replace('${cant}', cant)
                    .replace('${mobName}', rewardName)
            return msg
        }else{
            return config.messageError.replace('${error}', 'status no encontrado')
        }
    }
}