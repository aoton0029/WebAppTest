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

// https://note.com/shimakaze_soft/n/n99b47eccd915
//https://bloom-t.co.jp/blog/article_9233/
//https://blanktar.jp/blog/2014/05/python-gevent-websocket
//https://qiita.com/shiro-kuma/items/0607e01a19e093fdb631