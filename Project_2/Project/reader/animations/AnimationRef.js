/**
 * AnimationRef
 * @constructor
 **/

function AnimationRef(animation) {

    this.animation = animation;
    this.matrix;
    this.isFinished = false;   
}

AnimationRef.prototype.updateMatrix = function(deltaTime){

    if(this.isFinished == false){
        this.matrix= this.animation.getMatrix(deltaTime);
            if(this.matrix == -1){
                this.isFinished = true;
            }
    }
}
