

var socket;

var started = false;

var player;
var zoom = 1;

var blobs = [];
var otherPlayers = [];

var thisId;


function setup() {
socket = io.connect('http://localhost:3000/')

  createCanvas(windowWidth, windowHeight);
  background(255, 10, 200);
  noLoop();

  player = new Blob(random(width / 2), random(height / 2), random(24, 64));

  //Skickar den unika kientens data till server vid start.
  var data = {
    x: player.pos.x,
    y: player.pos.y,
    r: player.r
  }
  socket.emit('start', data);

  //får den unika klientens ID från servern
  socket.on('getId', function(data) {
    thisId = data
  }); 
  
  //skapar första vändan av blobs, osäker om denna ska vara kvar..., så att ny inte skapas vid varje inlogg
  createBlobs();

  //Hämtar de andra spelarna (heartbeat skickar varje 0,01sek ish)
  socket.on('heartbeat', function(data){
    otherPlayers = data;
  })

  //hämta blobs från server till array

}


function createBlobs() {
  for (let i = 0; i < 200; i++) {
    let x = random(-width*2, width * 4)
    let y = random(-height*2, height * 4)
    //ha en tillfällig array för att inte fucka med gemensamma blobs, så att man kan skicka rena opåverkade såna.
    blobs.push(new Blob(x, y, 16)); 
  }

  //skicka blobs till server (för att senare skicka dessa tillbaka till alla)
}


function draw() {
  background(200);
  translate(width/2, height/2);
 

  var newScale = 64 / player.r;
  zoom = lerp(zoom, newScale, 0.1);
  scale(zoom);

  translate(-player.pos.x, -player.pos.y);

  //hämta blobs från server
  for (let i = blobs.length-1; i >= 0; i--) {

    blobs[i].show();

    if(player.eats(blobs[i])){

      blobs.splice(i,1);
      //skicka uppdaterade listan till server efter "ätandet"

      //if satsen bör vara på servernivå och trigga påfyllning av blobs
      if(blobs.length < 195) {
          createBlobs();
      }
    }
  }


  //lägga till "player krock" --> constrain funktionen i blob filen
  for (let i = 0; i < otherPlayers.length; i++){

    if (otherPlayers[i].id != thisId){
    fill (0, 255, 0);
    ellipse(otherPlayers[i].x, otherPlayers[i].y, otherPlayers[i].r*2, otherPlayers[i].r*2);
  
    fill (255);
    textAlign(CENTER);
    //textSize(2);
    text(otherPlayers[i].id, otherPlayers[i].x, otherPlayers[i].y + otherPlayers[i].r);
  }
}

  player.show();
  player.update();

  //THE CLAMP O_o
  player.constrain(-300, 300, -300, 300);

  //skickar clientens data till servers och alla andra
  var data = {
    x: player.pos.x,
    y: player.pos.y,
    r: player.r
  }
  socket.emit('update', data);

}


function start() {
  started = true;
  loop();
}
