const util = require('../../util')

var config = require('../../util').getConfig()
module.exports = async (TwitchClient, io, BotMc, channel, context, msg, self) => {
    if(!context['custom-reward-id'])return
    for(let i = 0; i<config.prices.channelPoints.length; i++){
        if(config.prices.channelPoints[i].id == context['custom-reward-id']){
            let reward = config.prices.channelPoints[i]
            if(reward.action){
                if(util.getEnabledSystem()){
                    BotMc.chat(util.makeCommand(reward.action))
                    BotMc.chat(util.makeMessage(context.username, reward.name, 'reward'))
                    BotMc.chat('/execute positioned as @a run playsound minecraft:entity.player.levelup ambient @a')
                }else{
                    util.saveAction({
                        msg,
                        action: reward.action
                    })
                }
            }else{if(util.getEnabledSystem()){
                    BotMc.chat(util.makeMessage(context.username, reward.name, 'reward'))
                    BotMc.chat('/execute positioned as @a run playsound minecraft:entity.player.levelup ambient @a')    
                }
                for(let i=0; i<reward.actions.length; i++){
                    if(util.getEnabledSystem()){
                        BotMc.chat(util.makeCommand(reward.actions[i]))
                    }else{
                        util.saveAction({
                            msg,
                            action: reward.actions[i]
                        })
                    }
                }
            }
        }
    }
}