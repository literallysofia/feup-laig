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

/**
 * Multiplies every matrix of the animations related to this node and returns the final matrix
 */
MyGraphNode.prototype.getFinalAnimMatrix = function(){

    var finalMatrix = mat4.create();
    mat4.identity(finalMatrix);
    if(this.animationRefs.length > 0){
        //TODO: not sure se é esta a orderm
        for(let i = 0; i<this.animationRefs.length; i++){
            ///if this.animationRefs[i].enable = true
                console.log(this.animationRefs[i].animation.id + "");
                mat4.multiply(finalMatrix, finalMatrix, this.animationRefs[i].matrix);
                ///break
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
