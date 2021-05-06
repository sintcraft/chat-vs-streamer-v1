var id=[]
module.exports = async (TwitchClient, channel, context, msg, self) => {
    return
    if(msg=="load"){
        console.log(id)
        console.table(id)
        return
    }
    if(!context['custom-reward-id'])return
    else{
        id.push({
            id: context['custom-reward-id'],
            name: msg,
        })
    }
}