
var players = [];

function Player(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

setInterval(heartbeat, 10);

function heartbeat() {
    io.sockets.emit('heartbeat', players);

}

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("socket ;) id: " + socket.id);

    socket.emit('getId', socket.id);

    socket.on('start',
    function(data){
        console.log(socket.id + " " + data.x + " " + data.y +  " " + data.r)
        var player = new Player(socket.id, data.x, data.y, data.r);
        players.push(player);
    });


    socket.on('update',
    function(data){
        
        var currentPlayer;
        for (let i = 0; i < players.length; i++){
            if (socket.id == players[i].id) {
                currentPlayer = players[i];
            }
        }
        //console.log(socket.id + " " + data.x + " " + data.y +  " " + data.r)

        currentPlayer.x = data.x;
        currentPlayer.y = data.y;
        currentPlayer.r = data.r;

    });
    
}

console.log("running")
