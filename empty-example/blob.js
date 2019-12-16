function Blob (x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.update = function() {
      var velocity = createVector(mouseX-width/2, mouseY-height/2);
      velocity.setMag(3);
      this.pos.add(velocity);
    }
  
this.eats = function (smallerBlob) {
    let distance = p5.Vector.dist(this.pos, smallerBlob.pos);
    if(distance < this.r + smallerBlob.r) {
        this.r += smallerBlob.r*0.1;
        return true;
    } else {
        return false;
    }
}

    this.show = function () {
        fill(255);
  
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
  }