
//bonusvaribel
let x, y;

var blob;

var blobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 10, 200);

//bonusblob
  x = width / 2;
  y = height;

  player = new Blob(width / 2, height / 2, 64);
  createBlobs();

  blob = new Blob(width / 2, height / 2, 64);
  for (let i = 0; i < 60; i++) {
    let x = random(-width, width * 2)
    let y = random(-height, height * 2)
    blobs[i] = new Blob(x, y, 16);
  }

}

function draw() {
  background(200);

  //bonusblob movement
  fill(0);
  ellipse(x, y, 24, 24);
  x = x + random(-75, 75);
  y = y - 4;
  if (y < 0) {
    y = height;
  }
  translate(width/2, height/2);
 

  var newScale = 64 / player.r;
  zoom = lerp(zoom, newScale, 0.1);
  scale(zoom);

  translate(-player.pos.x, -player.pos.y);
  for (let i = blobs.length-1; i >= 0; i--) {
    blob.show();
    if(blob.eats(blobs[i])){
      blobs.splice(i,1);
    }
    blobs[i].show();
  }
  blob.update();

}


