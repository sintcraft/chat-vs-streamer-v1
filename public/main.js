var socket = io.connect('http://localhost:3000', { forceNew: true })

socket.on('tts', function(data){
    axd(data.text)
})
function axd(text){
    var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[5]; 
msg.volume = 1; // From 0 to 1
msg.rate = 1; // From 0.1 to 10
msg.pitch = 0; // From 0 to 2
msg.text = text;
msg.lang = 'es';
speechSynthesis.speak(msg);
}