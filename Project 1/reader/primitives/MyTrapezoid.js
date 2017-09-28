/**
 * MyTrapezoid
 * @constructor
 */
function MyTrapezoid(scene, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;


    this.initBuffers();
};

MyTrapezoid.prototype = Object.create(CGFobject.prototype);
MyTrapezoid.prototype.constructor = MyTrapezoid;

MyTrapezoid.prototype.initBuffers = function() {
    this.vertices = [
      -3, -0.5, 0,
      3, -0.5, 0,
        2, 0.5, 0,
        -2, 0.5, 0

    ];

    this.indices = [
      1,2,3,
        0, 1, 3
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [
        0,1,
        1,1,
        5/6,0,
        1/6,0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
