/**
 * MyBubble
 * @constructor
 */

function MySphere(scene, radius, stacks, slices) {
    CGFobject.call(this, scene);

    this.radius=radius;

    this.semiSphereFront = new MySemiSphere(this.scene, slices,stacks);
    this.semiSphereBack = new MySemiSphere(this.scene, slices, stacks);

};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.scale(this.radius, this.radius, this.radius);
    this.semiSphereFront.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(this.radius, this.radius, this.radius);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.semiSphereBack.display();
    this.scene.popMatrix();

};

MySphere.prototype.updateTexCoords = function(s,t) {
};
