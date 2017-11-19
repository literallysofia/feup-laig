/**
 * LinearAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function LinearAnimation(id, speed, cpoints) {
  Animation.call();

  this.id = id;
  this.speed = speed;
  this.cpoints = cpoints;
  this.distancePerVector = [];
  this.timePerVector = [];
  this.totalDistance = 0;
  this.Index = 0;
  this.timeCounter;

  this.updateVariables();
  this.updateAngle();

  for (var i = 0; i < this.cpoints.length - 1; i++) {
    var distance = Math.sqrt(Math.pow(this.cpoints[i+1][0] - this.cpoints[i][0], 2) + Math.pow(this.cpoints[i+1][1] - this.cpoints[i][1], 2) + Math.pow(this.cpoints[i+1][2] - this.cpoints[i][2], 2));  
    this.distancePerVector.push(distance);
    this.totalDistance += distance;
    //console.log("VETOR: " + i);
    //console.log("X1: " + this.cpoints[i][0] + " Y1: " + this.cpoints[i][1] + " Z1: " + this.cpoints[i][2]);
    //console.log("X2: " + this.cpoints[i+1][0] + " Y2: " + this.cpoints[i+1][1] + " Z2: " + this.cpoints[i+1][2]);
  }

  //console.log("TOTAL DISTANCE: " + this.totalDistance);

  for (var i = 0; i < this.distancePerVector.length; i++) {
    this.timePerVector.push(this.distancePerVector[i] / this.speed);
    //console.log("DISTANCE PER VECTOR: " + this.distancePerVector[i]);
    //console.log("TIME: "+i+": "+this.timePerVector[i]);
  }
  
  this.updateVelocity();
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.getMatrix = function(deltaTime) {

  var eachTime;
  var percentage;

  //console.log("DELTATIME: " + deltaTime);
  this.getTimeCounter();
  this.checkVectors(deltaTime);

  if (this.Index == 0)
    eachTime = 0;
  else
    eachTime = this.timeCounter - this.timePerVector[this.Index];

  //console.log("MINTIME: " + minTime);
  percentage = deltaTime - eachTime;
  //console.log("PERCENTAGE: " + percentage);

  var deltaX = percentage * this.vx;
  var deltaY = percentage * this.vy;
  var deltaZ = percentage * this.vz;
  //console.log("DELTAX: " + deltaX + " DELTAY: " + deltaY + " DELTAZ: " + deltaZ);

  if(deltaTime < (this.totalDistance/this.speed)) {

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
  //console.log("ANGLE: " + this.angle);
};

LinearAnimation.prototype.updateVelocity = function() {
  for (var i = 0; i < this.distancePerVector.length; i++) {
    this.vx = this.speed * ((this.finalX - this.initialX) / Math.abs(this.distancePerVector[this.Index]));
    this.vy = this.speed * ((this.finalY - this.initialY) / Math.abs(this.distancePerVector[this.Index]));
    this.vz = this.speed * ((this.finalZ - this.initialZ) / Math.abs(this.distancePerVector[this.Index]));
    //console.log("VX: " + this.vx + " VY: " + this.vy + " VZ: " + this.vz);
  }
};

LinearAnimation.prototype.checkVectors = function(deltaTime) {
  if(deltaTime >= this.timeCounter && this.Index != this.timePerVector.length - 1) {
    this.Index++;
    this.updateVariables();
    this.updateAngle();
    this.updateVelocity();
    this.getTimeCounter();
  }
};

LinearAnimation.prototype.getTimeCounter = function() {
  this.timeCounter = 0;
  for (var i = 0; i <= this.Index; i++) {
    this.timeCounter += this.timePerVector[i];
  }
  //console.log("TIME COUNTER: " + this.timeCounter);
};

//TODO: delete, é so para testes
LinearAnimation.prototype.printValues = function() {
  console.log("ID: " + this.id + " SPEED: " + this.speed + "\n");
  console.log("CPOINTS:\n");
  for (var i = 0; i < this.cpoints.length; i++) {
    console.log("X: " + this.cpoints[i][0] + " Y: " + this.cpoints[i][1] + " Z: " + this.cpoints[i][2] + "\n");
  }
};
  