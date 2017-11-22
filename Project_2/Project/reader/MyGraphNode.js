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

    if(this.animationRefs.length==1){
        this.animationRefs[0].enable=true;
    }

}

/**
 * Multiplies every matrix of the animations related to this node and returns the final matrix
 */
MyGraphNode.prototype.getFinalAnimMatrix = function(){

    var finalMatrix = mat4.create();
    mat4.identity(finalMatrix);

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
            mat4.multiply(finalMatrix, finalMatrix, this.animationRefs[i].getMatrix());
        }

    }
    
    return finalMatrix;
}
//PROJECT2


/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}
