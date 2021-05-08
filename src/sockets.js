module.exports = {
    tts = async (io, msg) => {
        io.emit('tts', {
            text: msg,
        })
    }
}