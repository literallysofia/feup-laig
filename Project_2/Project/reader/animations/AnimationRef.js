/**
 * AnimationRef
 * @constructor
 **/

function AnimationRef(animation) {
  this.animation = animation;
  this.matrix = mat4.create();
  mat4.identity(this.matrix);
  this.enable = null;
  this.duration = this.animation.getDuration();
  this.counter = 0;
}

AnimationRef.prototype.updateMatrix = function(deltaTime) {
  if (this.enable == true) {
    this.counter = this.counter + deltaTime;
    if (this.counter < this.duration) {
      this.matrix = this.animation.getMatrix(this.counter);
    } else {
      this.enable = false;
      this.reset();
    }
  }
};

AnimationRef.prototype.reset = function() {
  if (this.animation.type == "linear") this.animation.reset();
};

AnimationRef.prototype.getMatrix = function() {
  return this.matrix;
};
