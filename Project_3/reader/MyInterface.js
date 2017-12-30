/**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
  //call CGFinterface constructor
  CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
  // call CGFinterface init
  CGFinterface.prototype.init.call(this, application);

  // init GUI. For more information on the methods, check:
  //  http://workshop.chromeexperiments.com/examples/gui

  this.gui = new dat.GUI();

  return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {
  var group = this.gui.addFolder("Lights");

  // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
  // e.g. this.option1=true; this.option2=false;

  var i = 0;
  for (var key in lights) {
    if (lights.hasOwnProperty(key)) {
      this.scene.lightValues[key] = lights[key][0];
      group.add(this.scene.lightValues, key).name("Light " + i++);
    }
  }
};

MyInterface.prototype.addScenePicker = function() {
  this.gui.add(this.scene.graph, "currentScene", [ "Japan", "New York"] ).name("Scene");
};

MyInterface.prototype.addCameraOption = function(game) {
  var controller = this.gui.add(this.scene, "rotationCamera").name("Camera Rotation");

  controller.onChange(function() {
    game.setCamera();
  });
};

MyInterface.prototype.addGameModePicker = function() {
  this.gui.add(this.scene, "gameMode", [ "Player vs Player", "Player vs Bot", "Bot vs Bot" ] ).name("Game Mode");
};

MyInterface.prototype.addOptionsGroup = function() {
  var group = this.gui.addFolder("Options");
  group.open();

  group.add(this.scene, "startGame").name("Start Game");
  group.add(this.scene, "undo").name("Undo");
  group.add(this.scene, "quitGame").name("Quit Game");
};
