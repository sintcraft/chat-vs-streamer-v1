async function tts(io, msg){
    io.emit('tts', {
        text: msg,
    })
}
module.exports = {
    tts
}