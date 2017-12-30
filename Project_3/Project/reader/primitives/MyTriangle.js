/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
  CGFobject.call(this, scene);

  //vec3 https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec3.js
  this.v1 = vec3.fromValues(x1, y1, z1);
  this.v2 = vec3.fromValues(x2, y2, z2);
  this.v3 = vec3.fromValues(x3, y3, z3);

  this.initBuffers();
}

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function() {
  this.vertices = [
    this.v1[0], this.v1[1], this.v1[2],
    this.v2[0], this.v2[1], this.v2[2],
    this.v3[0], this.v3[1], this.v3[2]
  ];

  this.indices = [0, 1, 2];

  var V21 = vec3.create(); //vetor do ponto 1 ao ponto 2
  var V21 = [
    this.v2[0] - this.v1[0],
    this.v2[1] - this.v1[1],
    this.v2[2] - this.v1[2]
  ];

  var V32 = vec3.create(); //vetor do ponto 2 ao ponto 3
  var V32 = [
    this.v3[0] - this.v2[0],
    this.v3[1] - this.v2[1],
    this.v3[2] - this.v3[2]
  ];

  var N = vec3.create(); //n - normal ao triangulo
  vec3.cross(N, V21, V32);
  vec3.normalize(N, N);

  this.normals = [N[0], N[1], N[2], N[0], N[1], N[2], N[0], N[1], N[2]];

  this.texCoords = [
    0, 1, //this.minS, this.maxT,
    1, 1, //this.maxS, this.maxT,
    0, 0, //this.minS, this.minT,
    1, 0 //this.maxS, this.minT
  ];

  //distA: 2-3
  //distB: 3-1
  //distC: 1-2

  this.distA = Math.sqrt(
    Math.pow(this.v2[0] - this.v3[0], 2) +
      Math.pow(this.v2[1] - this.v3[1], 2) +
      Math.pow(this.v2[2] - this.v3[2], 2)
  );
  this.distB = Math.sqrt(
    Math.pow(this.v1[0] - this.v3[0], 2) +
      Math.pow(this.v1[1] - this.v3[1], 2) +
      Math.pow(this.v1[2] - this.v3[2], 2)
  );
  this.distC = Math.sqrt(
    Math.pow(this.v2[0] - this.v1[0], 2) +
      Math.pow(this.v2[1] - this.v1[1], 2) +
      Math.pow(this.v2[2] - this.v1[2], 2)
  );

  this.angBeta = Math.acos(
    (Math.pow(this.distA, 2) -
      Math.pow(this.distB, 2) +
      Math.pow(this.distC, 2)) /
      (2 * this.distA * this.distC)
  );

  this.distD = this.distA * Math.sin(this.angBeta);

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

MyTriangle.prototype.updateTexCoords = function(afS, afT) {
  this.texCoords = [
    0,
    this.distD / afT,
    this.distC / afS,
    this.distD / afT,
    (this.distC - this.distA * Math.cos(this.angBeta)) / afS,
    (this.distD - this.distA * Math.sin(this.angBeta)) / afT
  ];

  this.updateTexCoordsGLBuffers();
};
