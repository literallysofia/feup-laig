/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {

  this.graph=graph;

  var type=this.graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);

  var args=this.graph.reader.getString(xmlelem, 'args').split(' ').map(Number);

  this.primitive;


  switch (type){
    case 'triangle':
      this.primitive=new MyTriangle(this.graph.scene, args);
      break;
  }
}
