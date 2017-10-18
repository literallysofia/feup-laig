function MyCylinder(scene, radiusTop, radiusBottom, height, stacks, slices, openEnded) {
    CGFobject.call(this, scene);
    radiusTop = radiusTop !== undefined ? radiusTop : 1;
    radiusBottom = radiusBottom !== undefined ? radiusBottom : 1;
    height = height || 1;

    stacks = Math.floor( stacks ) || 8;
    slices = Math.floor( slices ) || 1;

    openEnded = openEnded !== undefined ? openEnded : false;

    this.openEnded = openEnded;
    this.radiusTop = radiusTop;
    this.radiusBottom = radiusBottom;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.originalTexCoords = [];

    var r = this.radiusBottom;
    var delta_r = (this.radiusTop - this.radiusBottom) / this.stacks;
    var delta_rad = 2 * Math.PI / this.slices;
    var delta_z = this.height / this.stacks;
    var m = this.height / (this.radiusBottom - this.radiusTop);
    var maxheight;
    if (this.radiusBottom > this.radiusTop)
        maxheight = this.radiusTop * m + this.height;
    else maxheight = this.radiusBottom * m + this.height;
    var indice = 0;

    var acc = 0;
    for (var i = 0; i <= this.stacks; i++) {
        for (var j = 0; j <= this.slices; j++) {
            this.vertices.push(
                r * Math.cos(j * delta_rad),
                r * Math.sin(j * delta_rad),
                i * delta_z
            );
            if (Math.abs(this.radiusBottom - this.radiusTop) < 0.0001) {
                this.normals.push(
                    Math.cos(j * delta_rad),
                    Math.sin(j * delta_rad),
                    0);
            } else if (this.radiusBottom > this.radiusTop) {
                this.normals.push(
                    maxheight * Math.cos(j * delta_rad) / Math.sqrt(Math.pow(this.radiusBottom, 2) + Math.pow(maxheight, 2)),
                    maxheight * Math.sin(j * delta_rad) / Math.sqrt(Math.pow(this.radiusBottom, 2) + Math.pow(maxheight, 2)),
                    this.radiusBottom / Math.sqrt(Math.pow(this.radiusBottom, 2) + Math.pow(maxheight, 2))
                );
            } else {
                this.normals.push(
                    maxheight * Math.cos(j * delta_rad) / Math.sqrt(Math.pow(this.radiusTop, 2) + Math.pow(maxheight, 2)),
                    maxheight * Math.sin(j * delta_rad) / Math.sqrt(Math.pow(this.radiusTop, 2) + Math.pow(maxheight, 2)),
                    this.radiusTop / Math.sqrt(Math.pow(this.radiusTop, 2) + Math.pow(maxheight, 2))
                );
            }
            this.originalTexCoords.push(j / this.slices, i / this.stacks);

        }
        r = (i + 1) * delta_r + this.radiusBottom;
    }

    for (var i = 0; i < this.stacks; i++) {
        acc = 0;
        for (var j = 0; j < this.slices; j++) {
            this.indices.push(
                i * (this.slices + 1) + j,
                i * (this.slices + 1) + (j + 1),
                (i + 1) * (this.slices + 1) + (j + 1)
            );
            this.indices.push(
                (i + 1) * (this.slices + 1) + (j + 1),
                (i + 1) * (this.slices + 1) + j,
                i * (this.slices + 1) + j
            );

        }
    }

    this.texCoords = this.originalTexCoords.slice();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


MyCylinder.prototype.scaleTexCoords = function(ampS, ampT) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / ampS;
        this.texCoords[i + 1] = this.originalTexCoords[i + 1] / ampT;
    }
    this.updateTexCoordsGLBuffers();
}

MyCylinder.prototype.updateTexCoords = function(s, t) {};
