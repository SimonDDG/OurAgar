
var blob;

var blobs = [];

function setup() {
  createCanvas(600, 600);

  blob = new Blob(width/2, height/2, 64);
  for (let i = 0; i < 10; i++) {
    blobs[i] = new Blob(random(width), random(height), 16);
  }

}

function draw() {
  background(0);
  blob.show();
  blob.update();
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].show();
  }

 
}


//Ha det separat vid behov.
function Blob (x, y, r){
  this.pos = createVector(x, y);
  this.r = r;
  this.update = function() {
    var velocity = createVector(mouseX, mouseY);
    velocity.sub(this.pos);
    velocity.setMag(3);
    this.pos.add(velocity);
  }

  this.show = function (){
      fill(255);

      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
}

