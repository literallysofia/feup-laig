/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    CGFobject.call(this, scene);

    this.v1 = [x1, y1, z1];
    this.v2 = [x2, y2, z2];
    this.v3 = [x3, y3, z3];

    this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function() {
    this.vertices = [
        this.v1[0], this.v1[1], this.v1[2],
        this.v2[0], this.v2[1], this.v2[2],
        this.v3[0], this.v3[1], this.v3[2],

    ];

    this.indices = [
        0, 1, 2
    ];

    var AB = vec3.create();
  	vec3.sub(AB, this.v2, this.v1);
  	var AC = vec3.create();
  	vec3.sub(AC, this.v3, this.v1);
  	var BC = vec3.create();
  	vec3.sub(BC, this.v3, this.v2);

  	var N = vec3.create();
  	vec3.cross(N, AB, BC);
  	vec3.normalize(N, N);

  	this.normals = [
  		N[0], N[1], N[2],
  		N[0], N[1], N[2],
  		N[0], N[1], N[2],];

    this.texCoords = [
        0, 1, //this.minS, this.maxT,
        1, 1, //this.maxS, this.maxT,
        0, 0, //this.minS, this.minT,
        1, 0 //this.maxS, this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyTriangle.prototype.updateTexCoords = function(afS, afT) {
    //distB: 0-2
    //distA: 2-1
    //distC: 0-1

    var distA = Math.sqrt(Math.pow(this.v2[0] - this.v3[0], 2) + Math.pow(this.v2[1] - this.v3[1], 2) + Math.pow(this.v2[2] - this.v3[2], 2));
    var distB = Math.sqrt(Math.pow(this.v1[0] - this.v3[0], 2) + Math.pow(this.v1[1] - this.v3[1], 2) + Math.pow(this.v1[2] - this.v3[2], 2));
    var distC = Math.sqrt(Math.pow(this.v2[0] - this.v1[0], 2) + Math.pow(this.v2[1] - this.v1[1], 2) + Math.pow(this.v2[2] - this.v1[2], 2));

    var angBeta = Math.acos((Math.pow(distA, 2) - Math.pow(distB, 2) + Math.pow(distC, 2)) / (2 * distA * distC));

    var distD = distA * Math.sin(angBeta);
    var distE = distC - distA * Math.cos(angBeta);

    var minS = 0;
    var minT = 0;
    var maxT = distD / afT;
    var maxS = distC / afS;

    console.log(minS + " " + minT + " " + maxS + " " + maxT);

    this.texCoords = [
        minS, maxT,
        maxS, maxT,
        minS, minT,
        maxS, minT
    ];

    this.updateTexCoordsGLBuffers();
};
