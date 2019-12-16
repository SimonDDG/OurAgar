

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

  var data = {
    x: player.pos.x,
    y: player.pos.y,
    r: player.r
  }
  socket.emit('start', data);

  socket.on('getId', function(data) {
    thisId = data
  }); 
  

  createBlobs();

  socket.on('heartbeat', function(data){
    otherPlayers = data;
  })

}


function createBlobs() {
  for (let i = 0; i < 200; i++) {
    let x = random(-width*2, width * 4)
    let y = random(-height*2, height * 4)
    blobs.push(new Blob(x, y, 16));
  }
}


function draw() {
  background(200);
  translate(width/2, height/2);
 

  var newScale = 64 / player.r;
  zoom = lerp(zoom, newScale, 0.1);
  scale(zoom);

  translate(-player.pos.x, -player.pos.y);
  for (let i = blobs.length-1; i >= 0; i--) {
    blobs[i].show();
    if(player.eats(blobs[i])){
      blobs.splice(i,1);
      if(blobs.length < 195) {
          createBlobs();
      }
    }
    //blobs[i].show();
  }

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
  player.constrain(-300, 300, -300, 300);

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
