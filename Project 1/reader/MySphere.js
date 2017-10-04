/**
 * MyBubble
 * @constructor
 */

function MySphere(scene, args) {
    CGFobject.call(this, scene);

    this.radius=args[0];

    this.semiSphereFront = new MySemiSphere(this.scene, args[1],args[2]);
    this.semiSphereBack = new MySemiSphere(this.scene, args[2], args[2]);

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
