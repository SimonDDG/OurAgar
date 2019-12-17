
var blob;

var blobs = [];

function setup() {
  createCanvas(600, 600);
  

  blob = new Blob(width / 2, height / 2, 64);
  for (let i = 0; i < 60; i++) {
    let x = random(-width, width * 2)
    let y = random(-height, height * 2)
    blobs[i] = new Blob(x, y, 16);
  }

}

function draw() {
  background(0);
  translate(width / 2 - blob.pos.x, height / 2 - blob.pos.y);
  for (let i = blobs.length-1; i >= 0; i--) {
    blob.show();
    if(blob.eats(blobs[i])){
      blobs.splice(i,1);
    }
    blobs[i].show();
  }
  blob.update();

}
