/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(scene, id, speed, cpoints) {
  Animation.call();

  this.id = id;
  this.speed = speed;
  this.cpoints = cpoints;
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

//TODO: delete, é so para testes
LinearAnimation.prototype.printValues = function() {
  console.log("ID: " + this.id + " SPEED: " + this.speed + "\n");
  console.log("CPOINTS:\n");
  for (var i = 0; i < this.cpoints.length; i++) {
    console.log("X: " + this.cpoints[i][0] + " Y: " + this.cpoints[i][1] + " Z: " + this.cpoints[i][2] + "\n");
  }
};
