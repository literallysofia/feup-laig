function MyCylinder(scene, height, bottomRadius, topRadius, stacks, slices, texture) {
    CGFobject.call(this, scene);
    top = typeof top !== 'undefined' ? top : false;
    bottom = typeof bottom !== 'undefined' ? bottom : false;
    texture = typeof texture !== 'undefined' ? texture : false;
    this.top = top;
    this.bottom = bottom;
    this.texture = texture;
    this.topRad = topRadius;
    this.bottomRad = bottomRadius;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;
    this.type = 'MyCylinder';

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function () {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.originalTexCoords = [];

    var r = this.bottomRad;
    var delta_r = (this.topRad - this.bottomRad) / this.stacks;
    var delta_rad = 2 * Math.PI / this.slices;
    var delta_z = this.height / this.stacks;
    var m = this.height / (this.bottomRad - this.topRad);
    var maxheight;
    if (this.bottomRad > this.topRad)
        maxheight = this.topRad * m + this.height;
    else maxheight = this.bottomRad * m + this.height;
    var indice = 0;

    var acc = 0;
    for (var i = 0; i <= this.stacks; i++) {
        for (var j = 0; j <= this.slices; j++) {
            this.vertices.push(
                r * Math.cos(j * delta_rad),
                r * Math.sin(j * delta_rad),
                i * delta_z
            );
            if (Math.abs(this.bottomRad - this.topRad) < 0.0001) {
                this.normals.push(
                    Math.cos(j * delta_rad),
                    Math.sin(j * delta_rad),
                    0);
            } else if (this.bottomRad > this.topRad) {
                this.normals.push(
                    maxheight * Math.cos(j * delta_rad) / Math.sqrt(Math.pow(this.bottomRad, 2) + Math.pow(maxheight, 2)),
                    maxheight * Math.sin(j * delta_rad) / Math.sqrt(Math.pow(this.bottomRad, 2) + Math.pow(maxheight, 2)),
                    this.bottomRad / Math.sqrt(Math.pow(this.bottomRad, 2) + Math.pow(maxheight, 2))
                );
            } else {
                this.normals.push(
                    maxheight * Math.cos(j * delta_rad) / Math.sqrt(Math.pow(this.topRad, 2) + Math.pow(maxheight, 2)),
                    maxheight * Math.sin(j * delta_rad) / Math.sqrt(Math.pow(this.topRad, 2) + Math.pow(maxheight, 2)),
                    this.topRad / Math.sqrt(Math.pow(this.topRad, 2) + Math.pow(maxheight, 2))
                );
            }
            this.originalTexCoords.push(j / this.slices, i / this.stacks);

        }
        r = (i + 1) * delta_r + this.bottomRad;
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


MyCylinder.prototype.scaleTexCoords = function (ampS, ampT) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / ampS;
        this.texCoords[i + 1] = this.originalTexCoords[i + 1] / ampT;
    }
    this.updateTexCoordsGLBuffers();
}

MyCylinder.prototype.loadTexture = function(){
    
}