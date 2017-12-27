/**
 * Player
 * @constructor
 */
function Player(scene, playerID) {
  CGFobject.call(this, scene);
  this.playerID = playerID;
  this.setInformation();
  this.camera = new CGFcamera(0.4, 0.1, 500, this.position, this.target);
  this.score = 0;
}

Player.prototype = Object.create(CGFobject.prototype);
Player.prototype.constructor = Player;

Player.prototype.setInformation = function() {
  switch (this.playerID) {
    case "1":
      this.color = "black";
      this.position = vec3.fromValues(5.8, 34, -30);
      this.target = vec3.fromValues(7.4, -3, 3.5);
      break;
    case "2":
      this.color = "white";
      this.position = vec3.fromValues(5.8, 34, 41);
      this.target = vec3.fromValues(5.7, -4.2, 6.1);
      break;
    default:
      this.color = null;
  }
};
