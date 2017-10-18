function MyCylinder(scene, radiusTop, radiusBottom, height, stacks, slices, layerTop, layerBottom) {
  CGFobject.call(this, scene);

  this.radiusTop = radiusTop;
  this.radiusBottom = radiusBottom;
  this.height = height;
  this.slices = slices;
  this.stacks = stacks;
  this.layerTop = layerTop;
  this.layerBottom = layerBottom;

  this.layer = new MyCircle(scene, this.slices);

  this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

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
      this.texCoords.push(j / this.slices, i / this.stacks);

    }
    r = (i + 1) * delta_r + this.radiusBottom;
  }

  for (var i = 0; i < this.stacks; i++) {
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

  this.texCoords = this.texCoords.slice();

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};


MyCylinder.prototype.scaletexCoords = function(ampS, ampT) {
  for (var i = 0; i < this.texCoords.length; i += 2) {
    this.texCoords[i] = this.originaltexCoords[i] / ampS;
    this.texCoords[i + 1] = this.originaltexCoords[i + 1] / ampT;
  }
  this.updatetexCoordsGLBuffers();
}

MyCylinder.prototype.display = function() {
  CGFobject.prototype.display.call(this);

  if (this.layerTop == 1) {
    this.scene.pushMatrix();
    this.scene.scale(this.radiusTop, this.radiusTop, 1);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.layer.display();
    this.scene.popMatrix();
  }

  if (this.layerBottom == 1) {
    this.scene.pushMatrix();
    this.scene.scale(this.radiusBottom, this.radiusBottom, 1);
    this.scene.translate(0, 0, this.height);
    this.layer.display();
    this.scene.popMatrix();
  }
};
