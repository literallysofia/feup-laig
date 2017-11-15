/**
 * CircularAnimation
 * @constructor
 */
function CircularAnimation(scene, id, speed, centerx, centery, centerz, radius, startang, rotang) {
    Animation.call();
  
    this.id = id;
    this.speed = speed;
    this.centerx = centerx;
    this.centery = centery;
    this.centerz = centerz;
    this.radius = radius;
    this.startang = startang;
    this.rotang = rotang;
  }
  
  CircularAnimation.prototype = Object.create(Animation.prototype);
  CircularAnimation.prototype.constructor = CircularAnimation;
  
  //TODO: delete, é so para testes
  CircularAnimation.prototype.printValues = function() {
    console.log("ID: " + this.id + " SPEED: " + this.speed + "\n");
    console.log("CENTERX: " + this.centerx + " CENTERY: " + this.centery + " CENTERZ: " + this.centerz + "\n");
    console.log("RADIUS: " + this.radius + " STARTANG: " + this.startang + " ROTANG: " + this.rotang + "\n");
  };