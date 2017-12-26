/**
 * MyPiece
 * @constructor
 */
function MyPiece(scene, x, z, type) {
  CGFobject.call(this, scene);
  this.x = x;
  this.z = z;
  this.type = type; //0 empty, 1 black, 2 white, 3 red
  this.setNodeID();
  this.setTransformMatrix();
  this.setAnimationMatrix();
}

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor = MyPiece;

MyPiece.prototype.setNodeID = function() {
  switch (this.type) {
    case '1':
      this.nodeID = "blackPiece";
      break;
    case '2':
      this.nodeID = "whitePiece";
      break;
    case '3':
      this.nodeID = "redPiece";
      break;
    default:
      this.nodeID = null;
  }
};

MyPiece.prototype.setTransformMatrix = function() {
  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);
  mat4.translate(this.transformMatrix, this.transformMatrix, [10 + this.x, 0.5, 10 + this.z]);
  mat4.rotate(this.transformMatrix, this.transformMatrix, Math.PI * -90 / 180, [1, 0, 0]);
};

MyPiece.prototype.setAnimationMatrix = function() {
  this.animationMatrix;
};
