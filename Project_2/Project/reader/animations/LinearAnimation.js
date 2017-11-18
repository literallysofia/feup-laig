/**
 * LinearAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function LinearAnimation(scene, id, speed, cpoints) {
  Animation.call();

  this.id = id;
  this.speed = speed;
  this.cpoints = cpoints;

  this.initialX = this.cpoints[0][0];
  this.initialY = this.cpoints[0][1];
  this.initialZ = this.cpoints[0][2];
  this.finalX = this.cpoints[1][0];
  this.finalY = this.cpoints[1][1];
  this.finalZ = this.cpoints[1][2];

  this.distance = Math.sqrt(Math.pow(this.finalX - this.initialX, 2) + Math.pow(this.finalY - this.initialY, 2) + Math.pow(this.finalZ - this.initialZ, 2));
  this.angle = Math.atan2(this.finalZ - this.initialZ, this.finalX - this.initialX);
  console.log("ANGLE:\n" + this.angle);
  
  this.vx = this.speed * ((this.finalX - this.initialX) / Math.abs(this.distance));
  this.vy = this.speed * ((this.finalY - this.initialY) / Math.abs(this.distance));
  this.vz = this.speed * ((this.finalZ - this.initialZ) / Math.abs(this.distance));
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.getMatrix = function(deltaTime){

  this.deltaX = deltaTime * this.vx;
  this.deltaY = deltaTime * this.vy;
  this.deltaZ = deltaTime * this.vz;

  this.currentX = this.initialX + this.deltaX;
  this.currentY = this.initialY + this.deltaY;
  this.currentZ = this.initialZ + this.deltaZ;

  if(this.currentX < this.finalX || this.currentY < this.finalY || this.currentZ < this.finalZ){

    var matrix = mat4.create();
    mat4.identity(matrix);

    //mat4.rotate(matrix, matrix, this.angle, [0,1,0]);
    mat4.translate(matrix, matrix, [this.initialX, this.initialY, this.initialZ]);
    mat4.translate(matrix, matrix, [this.deltaX, this.deltaY, this.deltaZ]);

    return matrix;

  }
  else return -1; //it means this animation ended
};

//TODO: delete, é so para testes
LinearAnimation.prototype.printValues = function() {
  console.log("ID: " + this.id + " SPEED: " + this.speed + "\n");
  console.log("CPOINTS:\n");
  for (var i = 0; i < this.cpoints.length; i++) {
    console.log("X: " + this.cpoints[i][0] + " Y: " + this.cpoints[i][1] + " Z: " + this.cpoints[i][2] + "\n");
  }
};
  