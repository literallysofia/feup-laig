/**
 * ComboRef
 * @constructor
 **/

function ComboRef(combo) {
    
    this.combo = combo;
    this.matrix;
    this.enable = null;
    this.duration = this.combo.getDuration();    
    this.counter = 0;

    this.currentRefIndex = 0;
    
    this.animationRefs = this.combo.animationRefs;
    this.animationRefs[0].enable=true;
    this.currentRefIndex = 0;
}
    
ComboRef.prototype.getMatrix = function(){
    
    var matrix = mat4.create();
    mat4.identity(matrix);
    
    for(let i = 0; i< this.animationRefs.length; i++){
    
        if(i==this.currentRefIndex){
            if(this.animationRefs[i].enable==false){ // verifica se a animation ref atual acabou
    
                this.currentRefIndex = this.currentRefIndex + 1; // atualiza o index para o seguinte
    
                if(this.currentRefIndex != this.animationRefs.length){
                    this.animationRefs[this.currentRefIndex].enable = true; //coloca o enable da proxima animation ref a true para poder ser atualizada
                }     
            }
        }
    
        if(this.animationRefs[i].enable !=null){ //multiplica todas as que têm o enable a false (as anteriores) e a true (a atual)
            mat4.multiply(matrix, matrix, this.animationRefs[i].getMatrix());
        }
    
    }
        
    return matrix;
}

ComboRef.prototype.updateMatrix = function(deltaTime){
    
    for(let i = 0; i< this.animationRefs.length; i++){
        this.animationRefs[i].updateMatrix(deltaTime)
    }

};
