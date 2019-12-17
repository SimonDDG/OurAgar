
//Objekt och lista för att kunna hålla spelare och ev. blobs
var players = [];
function Player(id, x, y, r, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
}

var express = require('express');

var app = express();
var server = app.listen(8080);

app.use(express.static('public'));


var socket = require('socket.io');

var io = socket(server);

var killSwitch = true;


//uppdatering mellan klienterna
setInterval(heartbeat, 10);
function heartbeat() {
    io.sockets.emit('heartbeat', players);
    //lägga till blobs uppdatering
}

//När det sker en ny connection så körs funktionen "newConnection"
io.sockets.on('connection', newConnection);

function newConnection(socket){
    //console.log("socket ;) id: " + socket.id);

    //skickar specifik ID
    socket.emit('getId', socket.id);

    //Får info från unik klient, lägger till i lista med alla spelare
    socket.on('start',
    function(data){
        console.log(socket.id + " " + data.x + " " + data.y +  " " + data.r + " "+ data.color)
        var player = new Player(socket.id, data.x, data.y, data.r, data.color);
        players.push(player);
    });

    

    //får info från specefik client om uppdatering av position
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

        if (killSwitch){
            currentPlayer.r = data.r;
        } else {
            currentPlayer.r = data.r + 500;
            killSwitch = true;
        }

        currentPlayer.color = data.color

    });

    socket.on('fucked', 
    function(isFucked){
        for (let i = 0; i < players.length; i++){
            if (isFucked.id != players[i].id) {

                var isnewFucked = {
                    is: true
                  }
                  socket.emit('fucked', isnewFucked); 

            }
        }
    })

    socket.on('kill',
    function(killData){
        for (let i = 0; i < players.length; i++){

            if (killData.otherId == players[i].id) {
                //players[i].r += killData.size;
                //players[i].r = players[i].r + 500;
                //console.log(killData.otherId);
                //console.log(killData.size);

                //killSwitch = false;
                var killDataSiza = {
                    size:killData.size 
                }
                socket.emit('killIncrease', killDataSiza )
                
            }

            if (killData.playerId == players[i].id) {
                players.splice(i, 1);
            }

        }
    });
    
}

console.log("running")
