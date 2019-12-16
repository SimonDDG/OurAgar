function Blob (x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.velocity = createVector(0,0);

    this.update = function() {
      var newVelocity = createVector(mouseX-width/2, mouseY-height/2);
      newVelocity.setMag(3);
      this.velocity.lerp(newVelocity, 0.1);
      this.pos.add(this.velocity);
    }
  

this.eats = function (smallerBlob) {
    let distance = p5.Vector.dist(this.pos, smallerBlob.pos);
    if(distance < this.r + smallerBlob.r) {
        var sum = PI * this.r * this.r + PI * smallerBlob.r * smallerBlob.r;
        this.r = sqrt(sum/PI);
        //this.r += smallerBlob.r*0.1;
        return true;
    } else {
        return false;
    }
}

this.constrain = function(minW, maxW, minH, maxH) {
    player.pos.x = constrain(player.pos.x, minW, maxW)
    player.pos.y = constrain(player.pos.y, minH, maxH)
}


    this.show = function () {
        fill(255);
  
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
  }