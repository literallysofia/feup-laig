/**
 * Player
 * @constructor
 */
function Player(scene, playerID) {
  CGFobject.call(this, scene);
  this.playerID = playerID;
  this.setInformation();
  this.score = 0;
}

Player.prototype = Object.create(CGFobject.prototype);
Player.prototype.constructor = Player;

Player.prototype.setInformation = function() {
  switch (this.playerID) {
    case 1:
      this.color = "black";
      this.position = vec3.fromValues(3, 15, 8);
      break;
    case 2:
      this.color = "white";
      this.position = vec3.fromValues(3, 15, -2);
      break;
    default:
      this.color = null;
      break;
  }
};
