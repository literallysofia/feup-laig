/**
 * ComboAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function ComboAnimation(id, animations) {
    Animation.call();
  
    this.id = id;
    this.animations = animations
  }
  
  ComboAnimation.prototype = Object.create(Animation.prototype);
  ComboAnimation.prototype.constructor = ComboAnimation;