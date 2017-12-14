/**
 * MyQuad
 * @constructor
 */
function MyQuad(scene, minX, maxY, maxX, minY) {
  CGFobject.call(this, scene);

  this.minX = minX; //left top
  this.maxY = maxY;
  this.maxX = maxX; //right bottom
  this.minY = minY;

  this.initBuffers();
}

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function() {
  this.vertices = [
    this.minX,
    this.minY,
    0,
    this.maxX,
    this.minY,
    0,
    this.minX,
    this.maxY,
    0,
    this.maxX,
    this.maxY,
    0
  ];

  this.indices = [0, 1, 2, 3, 2, 1];

  this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

  this.texCoords = [
    0,
    1, //this.minS, this.maxT,
    1,
    1, //this.maxS, this.maxT,
    0,
    0, //this.minS, this.minT,
    1,
    0 //this.maxS, this.minT
  ];

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

MyQuad.prototype.updateTexCoords = function(afS, afT) {
  var minS = 0;
  var minT = 0;
  var maxS = (this.maxX - this.minX) / afS;
  var maxT = (this.maxY - this.minY) / afT;

  this.texCoords = [minS, maxT, maxS, maxT, minS, minT, maxS, minT];

  this.updateTexCoordsGLBuffers();
};
