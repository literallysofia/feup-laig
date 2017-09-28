/**
 * MyCircle
 * @constructor
 */
function MyCircle(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    var ang = (2 * Math.PI) / this.slices;

    this.vertices.push(0, 0, 0);
    this.texCoords.push(0.5, 0.5);
    this.normals.push(0, 0, 1);

    for (var i = 0; i < this.slices; i++) {
        this.vertices.push(Math.cos(ang * i), Math.sin(ang * i), 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5 + Math.cos(ang * i) / 2, 0.5 - Math.sin(ang * i) / 2);
    }

    for (var i = 0; i < this.slices - 1; i++) {
        this.indices.push(i + 1, i + 2, 0);
    }

    this.indices.push(this.slices, 1, 0);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
