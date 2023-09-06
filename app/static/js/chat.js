var host = "ws://localhost:8080/pipe";
var ws = new WebSocket(host);

ws.onmessage = function(message){
    var message_data = JSON.parse(message.data);
    var time = message_data['time'];
    var message = message_data['message'];

    var string_txt = "[" + time + "] - " + message
    let rcv = document.getElementById('rcv');
    let li = document.createElement('li');
    li.textContent = string_txt;
    rcv.appendChild(li)
}

var btn = document.getElementById('sendBtn');
btn.addEventListener('click', function(){
    var msg = document.getElementById('msg');
    ws.send(msg.value);
});