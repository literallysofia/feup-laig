/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
 **/

function MyGraphNode(graph, nodeID) {
  this.graph = graph;

  this.nodeID = nodeID;

  // IDs of child nodes.
  this.children = [];

  // IDs of child nodes.
  this.leaves = [];

  // The material ID.
  this.materialID = null;

  // The texture ID.
  this.textureID = null;

  //PROJECT2
  // Animation Refs
  this.animationRefs = []; 
  this.currentRefIndex = 0; //animation ref atual

  this.finalMatrix = mat4.create(); //matriz das animações
  mat4.identity(this.finalMatrix);
  //PROJECT2

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);
}

//PROJECT2
/**
 * Adiciona uma animation ref ao vetor de animation refs e ativa a primeira animation ref
 */
MyGraphNode.prototype.addAnimationRef = function(animationRef) {
  this.animationRefs.push(animationRef);

  if (this.animationRefs.length == 1) {
    this.animationRefs[0].enable = true;
  }
};

/**
 * Retorna a matriz da animation ref atual e ativa
 */
MyGraphNode.prototype.getFinalAnimMatrix = function() {

  for (let i = 0; i < this.animationRefs.length; i++) {

    if (i == this.currentRefIndex) { //se é a animation ref atual
      if (this.animationRefs[i].enable == false) { //se ela nao estiver ativa
        if (this.currentRefIndex != this.animationRefs.length-1) { //se não é a ultima
          this.currentRefIndex = this.currentRefIndex + 1; //passa para a próxima animationref
          this.animationRefs[this.currentRefIndex].enable = true; //coloca o enable da proxima animationref a true para poder ser atualizada
        }
      }
      else{//se estiver ativa
        this.finalMatrix = this.animationRefs[i].getMatrix(); //vai buscar a sua matriz
      }
    }
  }

  return this.finalMatrix;
};
//PROJECT2


/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
  this.children.push(nodeID);
};

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
  this.leaves.push(leaf);
};
