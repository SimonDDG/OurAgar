function Blob (x, y, r, color) {
    this.pos = createVector(x, y);
    this.r = r;
    this.velocity = createVector(0,0);
    this.color=color;

    this.shrink = function() {
        this.r = this.r * 0.5;
    }

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
        fill(this.color);  
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

  }

/*

  function Killer (x,y,r, color) {
  
    this.pos = createVector(x, y);
    this.r = r;
    this.velocity = createVector(0,0);
    this.color=color;


    this.show = function () {
        fill(this.color);  
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
          }


          this.updateKiller = function() {
            killer.x += random(-5, 5);
            killer.y -= 1;
            console.log(killer.y)
            /*
            var killerX = 20;
            var killerY = random(-600, 600);
            var newVelocity = createVector(killerX, killerY);
            //newVelocity.setMag(3);
            //this.velocity.lerp(newVelocity, 1);
            this.pos.add(this.newVelocity);
            
          }
        
    }



/*
this.eatsKiller = function(killer) {
    let distance = p5.Vector.dist(this.pos, killer.pos);
    if(distance < this.r + killer.r) {
        var sum = PI * this.r * this.r + PI * killer.r * killer.r;
        this.r = sqrt(sum/PI * 10);
        return true;
    } else {
        return false;
    }
}*/