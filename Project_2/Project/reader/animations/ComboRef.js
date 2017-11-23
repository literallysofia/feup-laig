/**
 * ComboRef
 * @constructor
 **/

function ComboRef(combo) {
  this.animation = combo;
  this.matrix = mat4.create();
  mat4.identity(this.matrix);
  this.enable = null;
  this.counter = 0;
  this.currentRefIndex = 0;
  this.animationRefs = this.animation.getAnimationsRefs();
  this.duration = this.getDuration();
  this.animationRefs[0].enable = true;
  this.currentRefIndex = 0;
}
    
ComboRef.prototype.getMatrix = function() {

  for (let i = 0; i < this.animationRefs.length; i++) {
    if (i == this.currentRefIndex) {
      if (this.animationRefs[i].enable == false) {

        if (this.currentRefIndex != this.animationRefs.length-1) {
          this.currentRefIndex = this.currentRefIndex + 1;
          this.animationRefs[this.currentRefIndex].enable = true; //coloca o enable da proxima animation ref a true para poder ser atualizada
        }
      }
      else{
        this.matrix=this.animationRefs[i].getMatrix();
      }
    }
  }

  return this.matrix;
};

ComboRef.prototype.updateMatrix = function(deltaTime) {
  
  if (this.enable == true) {
    this.counter = this.counter + deltaTime;
    if (this.counter < (this.duration+0.1)) {
      for (let i = 0; i < this.animationRefs.length; i++) {
        this.animationRefs[i].updateMatrix(deltaTime);
      }
    } else {
      this.enable = false;
    }   
  }

};


ComboRef.prototype.getDuration = function () {
  var counter = 0;

  for (let i = 0; i < this.animationRefs.length; i++) {
    counter = counter + this.animationRefs[i].duration;
  }

  return counter;
};
