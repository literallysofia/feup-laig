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
  this.distancePerVector = [];
  this.totalDistance = 0;
  this.currentDistance = 0;
  this.Index = 0;
  this.maxIndex = this.cpoints.length - 1;

  this.updateVariables();
  this.updateAngle();

  for (var i = 0; i < this.cpoints.length - 1; i++) {
    var distance = Math.sqrt(Math.pow(this.cpoints[i+1][0] - this.cpoints[i][0], 2) + Math.pow(this.cpoints[i+1][1] - this.cpoints[i][1], 2) + Math.pow(this.cpoints[i+1][2] - this.cpoints[i][2], 2));  
    this.distancePerVector.push(distance);
    this.totalDistance += distance;
    console.log("VETOR: " + i);
    console.log("X1: " + this.cpoints[i][0] + " Y1: " + this.cpoints[i][1] + " Z1: " + this.cpoints[i][2]);
    console.log("X2: " + this.cpoints[i+1][0] + " Y2: " + this.cpoints[i+1][1] + " Z2: " + this.cpoints[i+1][2]);
  }

  for (var i = 0; i < this.distancePerVector.length; i++) {
    console.log("DISTANCE PER VECTOR: " + this.distancePerVector[i]);
  }

  console.log("TOTAL DISTANCE: " + this.totalDistance);
  
  this.updateVelocity();
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.getMatrix = function(deltaTime){

  var deltaX = deltaTime * this.vx;
  var deltaY = deltaTime * this.vy;
  var deltaZ = deltaTime * this.vz;

  console.log("DELTAX: " + deltaX + " DELTAY: " + deltaY + " DELTAZ: " + deltaZ);

  this.currentDistance = Math.sqrt(Math.pow(deltaX - this.initialX, 2) + Math.pow(deltaY - this.initialY, 2) + Math.pow(deltaZ - this.initialZ, 2));  
  console.log("DISTANCIA ATUAL: " + this.currentDistance);
  this.checkVectors();

  if(this.currentDistance < this.totalDistance) {

    console.log('ESTOU AQUI');

    var matrix = mat4.create();
    mat4.identity(matrix);

    /*mat4.rotate(matrix, matrix, this.angle, [0,1,0]);
    mat4.translate(matrix, matrix, [this.initialX, this.initialY, this.initialZ]);
    mat4.translate(matrix, matrix, [this.deltaX, this.deltaY, this.deltaZ]);
    */

    mat4.translate(matrix, matrix, [deltaX, deltaY, deltaZ]);
    mat4.translate(matrix, matrix, [this.initialX, this.initialY, this.initialZ]);
    mat4.rotate(matrix, matrix, -this.angle, [0,1,0]);

    return matrix;

  }
  else return -1; //it means this animation ended
};

LinearAnimation.prototype.updateVariables = function() {
  this.initialX = this.cpoints[this.Index][0];
  this.initialY = this.cpoints[this.Index][1];
  this.initialZ = this.cpoints[this.Index][2];
  this.finalX = this.cpoints[this.Index + 1][0];
  this.finalY = this.cpoints[this.Index + 1][1];
  this.finalZ = this.cpoints[this.Index + 1][2];
};

LinearAnimation.prototype.updateAngle = function() {
  this.angle = Math.atan2(this.finalZ - this.initialZ, this.finalX - this.initialX);
  console.log("ANGLE: " + this.angle);
};

LinearAnimation.prototype.updateVelocity = function() {
  for (var i = 0; i < this.distancePerVector.length; i++) {
    this.vx = this.speed * ((this.finalX - this.initialX) / Math.abs(this.distancePerVector[this.Index]));
    this.vy = this.speed * ((this.finalY - this.initialY) / Math.abs(this.distancePerVector[this.Index]));
    this.vz = this.speed * ((this.finalZ - this.initialZ) / Math.abs(this.distancePerVector[this.Index]));
    console.log("VX: " + this.vx + " VY: " + this.vy + " VZ: " + this.vz);
  }
};

LinearAnimation.prototype.checkVectors = function() {
  if(this.currentDistance > this.distancePerVector[this.Index] && this.currentDistance < this.totalDistance && this.Index < this.maxIndex-1) {
    this.Index++;
    console.log("QUASE A MERDAR: " + this.Index);
    this.updateVariables();
    this.updateAngle();
    this.updateVelocity();
  }
};

//TODO: delete, é so para testes
LinearAnimation.prototype.printValues = function() {
  console.log("ID: " + this.id + " SPEED: " + this.speed + "\n");
  console.log("CPOINTS:\n");
  for (var i = 0; i < this.cpoints.length; i++) {
    console.log("X: " + this.cpoints[i][0] + " Y: " + this.cpoints[i][1] + " Z: " + this.cpoints[i][2] + "\n");
  }
};
  