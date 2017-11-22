/**
 * AnimationRef
 * @constructor
 **/

function AnimationRef(animation) {

    this.animation = animation;
    this.matrix;
    this.enable = true;
    this.duration = this.calculateDuration();
}

AnimationRef.prototype.updateMatrix = function(deltaTime){

    if(this.enable == true){
        if (deltaTime < this.duration){
            this.matrix= this.animation.getMatrix(deltaTime);
        }
        else this.enable=false;
    }
    
};

AnimationRef.prototype.getMatrix = function(){

    return this.matrix;
}

AnimationRef.prototype.calculateDuration = function(){

    return this.animation.getDuration();    
  
};



