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