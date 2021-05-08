const { json } = require('express')
const fs = require('fs')
const config = require('../config.json')
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
    runList(BotMc){
        for(let action of data){
            BotMc.chat(action.cmd)
        }
    }
}