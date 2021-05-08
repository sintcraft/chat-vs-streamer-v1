const util = require("../../util")
const config = util.getConfig()

module.exports = async (TwitchClient, BotMc, channel, context, msg) => {
    let cantidad = parseInt(context.bits)
    for(let reward of config.prices.bits){
        if(cantidad == reward.price){
            if(util.getEnabledSystem()){
                BotMc.chat(reward.action)
                BotMc.chat('/execute positioned as @a run playsound minecraft:entity.player.levelup ambient @a')
            }else{
                util.saveAction({
                    msg,
                    action: reward.action,
                    user: context.username,
                    name: reward.name,
                    status: 'bits',
                    cant: 0
                })
            }
        }
    }
}