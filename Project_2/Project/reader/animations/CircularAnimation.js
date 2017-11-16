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

    this.totalDistance = rotang*radius;
    this.angSpeed = speed/radius;
    this.currAng = 0;
    this.currDistance=0;
    this.end = false;
  }
  
  CircularAnimation.prototype = Object.create(Animation.prototype);
  CircularAnimation.prototype.constructor = CircularAnimation;
  
  //TODO: delete, é so para testes
  CircularAnimation.prototype.printValues = function() {
    console.log("ID: " + this.id + " SPEED: " + this.speed + "\n");
    console.log("CENTERX: " + this.centerx + " CENTERY: " + this.centery + " CENTERZ: " + this.centerz + "\n");
    console.log("RADIUS: " + this.radius + " STARTANG: " + this.startang + " ROTANG: " + this.rotang + "\n");
  };


  //TODO: fix times in miliseconds, speed in seconds
  CircularAnimation.prototype.getMatrix = function(deltaTime){
    
    /*let time = deltaTime/1000;

    if(this.currAng < this.rotang){
      this.currAng += this.angSpeed * time;
    }    
    
    var matrix = mat4.create();

    mat4.translate(matrix, matrix, [this.centerx, this.centery, this.centerz]);
    mat4.rotate(matrix, matrix, currAng, [0,1,0]);
    mat4.translate(matrix, matrix, [this.radius,0,0]);
    

    return matrix;*/

    var matrix = mat4.create();
    console.log("GET MATRIX ID: " + this.id);
    return matrix;



  };