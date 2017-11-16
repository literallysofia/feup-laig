/**
 * AnimationRef
 * @constructor
 **/

function AnimationRef(animation) {

    this.animation = animation;
    this.matrix;    
}

AnimationRef.prototype.updateMatrix = function(deltaTime){

    this.matrix= this.animation.getMatrix(deltaTime);
    console.log("UPDATE MATRIX");

}
