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

MyInterface.prototype.addSceneGroup = function() {
  var group = this.gui.addFolder("Scene");

  /*let menu = {
    startGame: this.scene.startGame.bind(this.scene)
  };

  let continueGame = {
    continueGame: this.scene.continueGame.bind(this.scene)
  };

  let undo = {
    undo: this.scene.undo.bind(this.scene)
  };

  let turnOffPrologServer = {
    turnOffPrologServer: this.scene.turnOffPrologServer.bind(this.scene)
  };*/

  group.add(this.scene.graph, "setScene1").name("Japan");
  //group.add(this.scene, "setScene2").name("New York");
};

MyInterface.prototype.addCameraOption = function() {
  this.gui.add(this.scene, "camRotation").name("Camera Rotation");
};

MyInterface.prototype.addOptionsGroup = function() {
  var group = this.gui.addFolder("Options");
  group.open();

  /*let menu = {
    startGame: this.scene.startGame.bind(this.scene)
  };

  let continueGame = {
    continueGame: this.scene.continueGame.bind(this.scene)
  };

  let undo = {
    undo: this.scene.undo.bind(this.scene)
  };

  let turnOffPrologServer = {
    turnOffPrologServer: this.scene.turnOffPrologServer.bind(this.scene)
  };*/

  /*group.add(this.scene, "startGame").name("Start Game");
  group.add(this.scene, "continueGame").name("Continue Game");
  group.add(this.scene, "undo").name("Undo");
  group.add(this.scene, "turnOffPrologServer").name("Quit Server");*/
};

MyInterface.prototype.addGameModeGroup = function() {
  var group = this.gui.addFolder("Game Mode");
  group.open();

  /*let playerVsPlayer = {
				setPlayerVsPlayer: this.scene.setPlayerVsPlayer.bind(this.scene)
		};

		let playerVsBot = {
				setPlayerVsBot: this.scene.setPlayerVsBot.bind(this.scene)
		};

		let botVsBot = {
				setBotVsBot: this.scene.setBotVsBot.bind(this.scene)
		};

    let setMovie = {
        setMovie: this.scene.setMovie.bind(this.scene)
    };*/

  /*group.add(this.scene, "setPlayerVsPlayer").name("Player vs Player");
  group.add(this.scene, "setPlayerVsBot").name("Player vs Bot");
  group.add(this.scene, "setBotVsBot").name("Bot vs Bot");
  group.add(this.scene, "setMovie").name("Watch Movie");*/
};
