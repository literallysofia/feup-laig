/**
 * Player
 * @constructor
 */
function Player(scene, playerID) {
  CGFobject.call(this, scene);
  this.playerID = playerID;
  this.setInformation();
  this.score = 0;

  this.seconds = "00";
  this.minutes = "00";
}

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
      break;
  }
};

Player.prototype.incrementScore = function() {
  this.score++;
};

Player.prototype.startCounter = function() {
  this.totalSeconds = 0;
  this.cicle = setInterval(function(){this.totalSeconds++; this.setTime();}.bind(this), 1000);
};

Player.prototype.startDecCounter = function() {
  this.totalSeconds = 11;
  this.cicle = setInterval(function(){this.totalSeconds--; this.setTime();}.bind(this), 1000);
};


Player.prototype.stopCounter = function() {
  clearInterval(this.cicle);
};


Player.prototype.setTime = function() {
  this.seconds = this.convert(this.totalSeconds % 60);
  this.minutes = this.convert(parseInt(this.totalSeconds / 60));
};

Player.prototype.convert = function(num) {
  var valString = num + "";
  if (valString.length < 2) return "0" + valString;
  else return valString;
};

Player.prototype.clearTime = function() {
  this.seconds = "00";
  this.minutes = "00";
};