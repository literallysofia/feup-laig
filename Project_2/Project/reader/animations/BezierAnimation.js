/**
 * BezierAnimation
 * @constructor
 */
function BezierAnimation(scene, id, speed, cpoints) {
  
  Animation.call();

  this.id = id;
  this.speed = speed;
  this.cpoints = cpoints;
}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

//TODO: delete, é so para testes
BezierAnimation.prototype.printValues = function() {

  console.log("ID: "+ this.id + " SPEED: "+ this.speed + "\n");
  console.log("CPOINTS:\n");
  for (var i = 0; i < this.cpoints.length; i++){
    console.log("X: " + this.cpoints[i][0]+ " Y: " + this.cpoints[i][1] + " Z: " + this.cpoints[i][2] + "\n");
  }

}