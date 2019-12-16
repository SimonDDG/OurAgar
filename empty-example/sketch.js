
var started = false;

var player;
var zoom = 1;

var blobs = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
background(255, 10, 200);
  noLoop();

  player = new Blob(width / 2, height / 2, 64);
  createBlobs();

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
  player.show();
  player.update();

}
}

function start() {
  started = true;
  loop();
}
