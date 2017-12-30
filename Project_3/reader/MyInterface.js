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

MyInterface.prototype.addSettingsGroup = function(game) {
  var group = this.gui.addFolder("Settings");
  group.open();

  group.add(this.scene, "gameMode", [ "Player vs Player", "Player vs Bot", "Bot vs Bot" ] ).name("Game Mode");
  group.add(this.scene, "gameLevel", [ "Easy", "Hard"] ).name("Game Level");
  var controller = group.add(this.scene, "rotationCamera").name("Camera Rotation");

  controller.onChange(function() {
    game.setCamera();
  });
};

MyInterface.prototype.addOptionsGroup = function() {
  var group = this.gui.addFolder("Options");
  group.open();

  group.add(this.scene, "startGame").name("Start Game");
  group.add(this.scene, "undo").name("Undo");
  group.add(this.scene, "quitGame").name("Quit Game");
  group.add(this.scene, "movie").name("Movie");
};
