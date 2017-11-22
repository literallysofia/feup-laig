/**
 * ComboAnimation
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

function ComboAnimation(id, animationRefs) {
    Animation.call();
  
    this.id = id;
    this.animationRefs = animationRefs;
    
  }
  
ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.getMatrix = function(deltaTime){
                                                  //comboIndex

  ///this.animationRefs[comboIndex].updateMatrix(deltaTime)
  ///if this.animationRefs[comboIndex].enable=false
      ///comboIndex = comboIndex + 1
  ///return this.animationRefs[comboIndex].matrix
}

ComboAnimation.prototype.getDuration = function(){
 
    return 0;

};
    