/**
 * MyQuad
 * @constructor
 */
function MyQuad(scene, x1, y1, x2, y2) {
    CGFobject.call(this, scene);


    this.x1=x1; //left top
    this.y1=y1;
    this.x2=x2; //right bottom
    this.y2=y2;

    this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function() {
    this.vertices =
    [this.x1, this.y1,0,
      this.x2, this.y1, 0,
      this.x2, this.y2, 0,
      this.x1, this.y2,0];

    this.indices = [
        2, 1, 0,
        3, 2, 0
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [
        0,1,//this.minS, this.maxT,
        1,1,//this.maxS, this.maxT,
        0,0,//this.minS, this.minT,
        1,0,//this.maxS, this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyQuad.prototype.updateTexCoords = function(afS,afT) {
  var minS = 0;
  var minT = 0;
  var maxS=(this.y1-this.y2)/afS;
  var maxT=(this.x2-this.x1)/afT;

  this.texCoords = [
      minS, maxT,
      maxS, maxT,
      minS, minT,
      maxS, minT
  ];

  this.updateTexCoordsGLBuffers();

};
