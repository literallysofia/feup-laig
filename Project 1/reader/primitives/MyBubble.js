/**
 * MyBubble
 * @constructor
 */

function MyBubble(scene, x, y, z) {
    CGFobject.call(this, scene);

    this.semiSphereFront = new MySemiSphere(this.scene, 20, 20);
    this.semiSphereBack = new MySemiSphere(this.scene, 20, 20);

    this.x = x;
    this.y = y;
    this.z = z;
};

MyBubble.prototype = Object.create(CGFobject.prototype);
MyBubble.prototype.constructor = MyBubble;

MyBubble.prototype.display = function() {

    this.scene.pushMatrix();
    this.semiSphereFront.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.semiSphereBack.display();
    this.scene.popMatrix();

};
