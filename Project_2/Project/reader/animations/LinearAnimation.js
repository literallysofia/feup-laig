/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(scene, id, speed, cpoints) {
  
  Animation.call(this, scene, id, speed);

  this.cpoints = cpoints;
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;