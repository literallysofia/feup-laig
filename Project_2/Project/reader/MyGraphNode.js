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
}


//TODO: delete, função só para teste
MyGraphNode.prototype.printAnimationRef = function(){
    if(this.animationRefs.length>0){
        console.log("NODE ID: " + this.nodeID)
        for(let i=0; i < this.animationRefs.length; i++){
            console.log("ANIMATION REF ID: " + this.animationRefs[i].animation.id);
        }
    }
}

MyGraphNode.prototype.getFinalAnimMatrix = function(){

    var finalMatrix = mat4.create();
    mat4.identity(finalMatrix);

    if(this.animationRefs.length > 0){
        console.log("MULT MATRIX ID NODE: "+ this.nodeID)

        for(let i = 0; i<this.animationRefs.length; i++){

            console.log(".NODE REF: " + this.animationRefs[i].animation.id);
            mat4.multiply(finalMatrix, finalMatrix, this.animationRefs[i].matrix);
           
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
