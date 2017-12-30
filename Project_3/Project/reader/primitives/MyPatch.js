/**
 * MyPatch
 * @constructor
 */
function MyPatch(scene, divisionsU, divisionsV, cpoints) {
  CGFobject.call(this, scene);

  this.divisionsU = divisionsU;
  this.divisionsV = divisionsV;

  var degree1 = cpoints.length - 1;
  var degree2 = cpoints[0].length - 1;

  this.makeSurface(degree1, degree2, cpoints);
}

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.getKnotsVector = function(degree) {
  // TODO (CGF 0.19.3): add to CGFnurbsSurface

  var v = new Array();
  for (var i = 0; i <= degree; i++) {
    v.push(0);
  }
  for (var i = 0; i <= degree; i++) {
    v.push(1);
  }
  return v;
};

MyPatch.prototype.makeSurface = function(degree1, degree2, cpoints) {
  var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
  var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions

  var nurbsSurface = new CGFnurbsSurface(
    degree1,
    degree2,
    knots1,
    knots2,
    cpoints
  ); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
  getSurfacePoint = function(u, v) {
    return nurbsSurface.getPoint(u, v);
  };
  this.nurbsObject = new CGFnurbsObject(
    this.scene,
    getSurfacePoint,
    this.divisionsU,
    this.divisionsV
  );
};

MyPatch.prototype.display = function() {
  this.nurbsObject.display();
};

MyPatch.prototype.updateTexCoords = function(afS, afT) {};
