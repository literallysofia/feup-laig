/**
 * ComboRef
 * @constructor
 **/

function ComboRef(combo) {
  this.animation = combo;

  this.matrix = mat4.create();
  mat4.identity(this.matrix);

  this.enable = null;
  this.timeCounter = 0;

  this.animationRefs = this.animation.getAnimationsRefs(); //animation refs das animação no vetor da animação combo
  this.animationRefs[0].enable = true; //primeira animation ref é ativa
  this.currentRefIndex = 0; //index da animation ref atual

  this.duration = this.getDuration(); //duração total de combo
}

/**
 * Retorna a matriz da animation ref atual e ativa
 */
ComboRef.prototype.getMatrix = function() {

  for (let i = 0; i < this.animationRefs.length; i++) {
    if (i == this.currentRefIndex) { //se é a animation ref atual
      if (this.animationRefs[i].enable == false) { //se ela já nao estiver ativa

        if (this.currentRefIndex != this.animationRefs.length - 1) { //se ela não é a ultima do vetor
          this.currentRefIndex = this.currentRefIndex + 1; //passa para a próxima animationref
          this.animationRefs[this.currentRefIndex].enable = true; //coloca o enable da proxima animationref a true para poder ser atualizada
        }
      } else { //se estiver ativa
        this.matrix = this.animationRefs[i].getMatrix(); //vai buscar a sua matriz
      }
    }
  }

  return this.matrix; //retorna a matriz
};

ComboRef.prototype.updateMatrix = function(deltaTime) {

  if (this.enable == true) {//se estiver ativa
    this.timeCounter = this.timeCounter + deltaTime; //atualiza o time counter
    if (this.timeCounter < this.duration + 0.1) { //verifica se nao acabou
      for (let i = 0; i < this.animationRefs.length; i++) {
        this.animationRefs[i].updateMatrix(deltaTime); //atualiza as matrizes das animations refs
      }
    } else {
      this.enable = false; //animationRef acabou
    }
  }
};

/*
* Soma as durações de todas as animações associadas
*/
ComboRef.prototype.getDuration = function() {
  var counter = 0;

  for (let i = 0; i < this.animationRefs.length; i++) {
    counter = counter + this.animationRefs[i].duration;
  }

  return counter;
};
