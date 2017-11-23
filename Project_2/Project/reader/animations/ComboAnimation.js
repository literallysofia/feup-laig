/**
 * ComboAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function ComboAnimation(id, animations) {
  Animation.call();

  this.id = id;
  this.type = "combo";

  this.animations = animations;
}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.getAnimationsRefs = function (){

  var animationRefs = [];

  for(let i = 0; i < this.animations.length; i++){
    var newRefAnimation = new AnimationRef(this.animations[i]);
    animationRefs.push(newRefAnimation);
  }

  return animationRefs;

}


