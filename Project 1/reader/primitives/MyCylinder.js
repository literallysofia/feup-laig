/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks, twoSides) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.twoSides = twoSides || false;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    /////CILINDRO COM VERTICES DUPLICADOS/////
    /*
       var ang=2*Math.PI/this.slices;

       for(let j =0; j <= this.stacks; j++){
         for(let i=0; i < this.slices; i++){

          this.vertices.push(Math.cos(ang *i),Math.sin(ang*i),j*1/this.stacks);
          this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),j*1/this.stacks);

          this.normals.push(Math.cos(i*ang),Math.sin(i*ang),0);
          this.normals.push(Math.cos(i*ang+ang),Math.sin(i*ang+ang),0);
        }
      }

      var numPontos= 2*this.stacks*this.slices;

      for (let i =0; i < numPontos; i+=2 ){
        this.indices.push(i, i+1, i+1+this.slices*2);
        this.indices.push(i, i+1+this.slices*2, i+this.slices*2);
      }*/

    var ang = 2 * Math.PI / this.slices;

    for (let j = 0; j <= this.stacks; j++) {
        for (let i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(ang * i), Math.sin(ang * i), j * 1 / this.stacks);
            this.normals.push(Math.cos(i * ang), Math.sin(i * ang), 0);
            this.texCoords.push(i * 1 / this.slices, j * 1 / this.stacks);
        }
    }


    for (let i = 0; i < this.stacks; i++) {
        for (let j = 0; j < this.slices; j++) {

            this.indices.push(i * (this.slices + 1) + j, i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);
            this.indices.push(i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);
        }
    }

    if (this.twoSides == true) {

        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                this.indices.push((i + 1) * (this.slices + 1) + j, i * (this.slices + 1) + 1 + j, i * (this.slices + 1) + j);
                this.indices.push((i + 1) * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + 1 + j, i * (this.slices + 1) + 1 + j);
            }
        }


    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
