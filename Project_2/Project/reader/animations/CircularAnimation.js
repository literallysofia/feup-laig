/**
 * CircularAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function CircularAnimation(scene, id, speed, centerx, centery, centerz, radius, startang, rotang) {
    Animation.call();
  
    this.id = id;
    this.speed = speed;
    this.centerx = centerx;
    this.centery = centery;
    this.centerz = centerz;
    this.radius = radius;
    this.startang = startang * DEGREE_TO_RAD;
    this.rotang = rotang * DEGREE_TO_RAD;

    this.angSpeed = speed/radius;
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
    
    this.currAng = this.startang + (this.angSpeed*deltaTime);

    console.log("Antes currAng < this.rotang ")

    console.log("STARTANG: " + this.startang);
    console.log("ANGSPEED: " + this.angSpeed);
    console.log("DELTATIME: " + deltaTime);

    var maxAng = this.startang + this.rotang

    console.log("CURRANG: " + this.currAng);
    console.log("MAXANG: " + maxAng);

    if(this.currAng < maxAng){
      
      console.log("Depois currAng < this.rotang ")


      console.log("GET MATRIX ID: " + this.id);

      var matrix = mat4.create();
      mat4.identity(matrix);
    
      mat4.translate(matrix, matrix, [this.centerx, this.centery, this.centerz]);
      mat4.rotate(matrix, matrix, this.currAng, [0,1,0]);
      mat4.translate(matrix, matrix, [this.radius,0,0]);
  
      return matrix;

    }
    else return -1;

  };