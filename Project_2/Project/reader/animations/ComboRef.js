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
  this.animationRefs[0].enable = true;
  this.currentRefIndex = 0;

  this.duration = this.getDuration();
}

ComboRef.prototype.getMatrix = function() {
  for (let i = 0; i < this.animationRefs.length; i++) {
    if (i == this.currentRefIndex) {
      if (this.animationRefs[i].enable == false) {
        //se a animationref atual acabou

        if (this.currentRefIndex != this.animationRefs.length - 1) {
          //se não é a ultima
          this.currentRefIndex = this.currentRefIndex + 1; //passa para a próxima animationref
          this.animationRefs[this.currentRefIndex].enable = true; //coloca o enable da proxima animationref a true para poder ser atualizada
        }
      } else {
        this.matrix = this.animationRefs[i].getMatrix(); //faz a animação
      }
    }
  }

  return this.matrix;
};

ComboRef.prototype.updateMatrix = function(deltaTime) {
  if (this.enable == true) {
    //se estiver ativa
    this.counter = this.counter + deltaTime;
    if (this.counter < this.duration + 0.1) {
      //verifica se nao acabou
      for (let i = 0; i < this.animationRefs.length; i++) {
        this.animationRefs[i].updateMatrix(deltaTime); //atualiza as matrizes
      }
    } else {
      this.enable = false; //animationRef acabou
    }
  }
};

ComboRef.prototype.getDuration = function() {
  var counter = 0;

  for (let i = 0; i < this.animationRefs.length; i++) {
    counter = counter + this.animationRefs[i].duration;
  }

  return counter;
};
