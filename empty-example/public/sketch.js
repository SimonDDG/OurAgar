
var started = false;

var player;
var zoom = 1;

var blobs = [];
var xmaspicture;

var blobColors = ['rgb(0,255,0)', 'rgb(100%,0%,10%)', 'rgb(100%,0%,100%)', 'rgb(30,144,255)', 'rgb(50, 55, 100)'];

function setup() {
  createCanvas(windowWidth, windowHeight);
 // background(xmaspicture);
  noLoop();

  player = new Blob(width / 2, height / 2, 64, 255);
  createBlobs();

}

function createBlobs() {
  for (let i = 0; i < 200; i++) {
    let color = blobColors[i%blobColors.length];
    let x = random(-width*2, width * 4)
    let y = random(-height*2, height * 4)
    blobs.push(new Blob(x, y, 16, color));
  }
}


function draw() {
  background(255, 204, 0);      //background in color
//  background(xmaspicture);
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
/*
function preload() {
  xmaspicture = loadImage('xmaspicture.jpg')
} // close preload*/


function start() {
  started = true;
  loop();
}

