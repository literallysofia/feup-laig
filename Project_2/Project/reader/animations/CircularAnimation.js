/**
 * CircularAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function CircularAnimation(id, speed, centerx, centery, centerz, radius, startang, rotang) {
  Animation.call();
  
  this.id = id;
  this.type = "circular";
  this.speed = speed;
  this.centerx = centerx;
  this.centery = centery;
  this.centerz = centerz;
  this.radius = radius;
  this.startang = startang * DEGREE_TO_RAD;
  this.rotang = rotang * DEGREE_TO_RAD;

  this.angularSpeed = speed/radius;
}
  
CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.getMatrix = function(deltaTime) {
  currAng = this.startang + this.angularSpeed * deltaTime;
  var maxAng = this.startang + this.rotang;

  var matrix = mat4.create();
  mat4.identity(matrix);

  mat4.translate(matrix, matrix, [this.centerx, this.centery, this.centerz]);
  mat4.rotate(matrix, matrix, currAng, [0, 1, 0]);
  mat4.translate(matrix, matrix, [this.radius, 0, 0]);

  return matrix;
};

CircularAnimation.prototype.getDuration = function() {
  return this.rotang / this.angularSpeed;
};