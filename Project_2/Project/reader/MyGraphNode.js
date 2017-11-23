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
  this.currentRefIndex = 0;

  this.finalMatrix = mat4.create();
  mat4.identity(this.finalMatrix);

  //PROJECT2

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);
}

//PROJECT2
/**
 * Adds a animation ref to this node's animation refs array.
 */
MyGraphNode.prototype.addAnimationRef = function(animationRefsID) {
  this.animationRefs.push(animationRefsID);

  if (this.animationRefs.length == 1) {
    this.animationRefs[0].enable = true;
  }
};

/**
 * Multiplies every matrix of the animations related to this node and returns the final matrix
 */
MyGraphNode.prototype.getFinalAnimMatrix = function() {

  for (let i = 0; i < this.animationRefs.length; i++) {
    if (i == this.currentRefIndex) {

      if (this.animationRefs[i].enable == false) { //se a animationref atual acabou
        if (this.currentRefIndex != this.animationRefs.length-1) { //se não é a ultima
          this.currentRefIndex = this.currentRefIndex + 1; //passa para a próxima animationref
          this.animationRefs[this.currentRefIndex].enable = true; //coloca o enable da proxima animationref a true para poder ser atualizada
        }
      }
      else{
        this.finalMatrix = this.animationRefs[i].getMatrix();  //faz a animação
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
