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
  group.open();

  // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
  // e.g. this.option1=true; this.option2=false;

  for (var key in lights) {
    if (lights.hasOwnProperty(key)) {
      this.scene.lightValues[key] = lights[key][0];
      group.add(this.scene.lightValues, key);
    }
  }
};

//PROJECT2
MyInterface.prototype.addSelectablesGroup = function(selectables) {
  var group = this.gui.addFolder("Shaders");
  group.open();
    
  group.add(this.scene.graph, 'nodeIDSelected', selectables).name('Node Selected');

  group.add(this.scene, 'scaleFactor',0,10);

  group.add(this.scene, 'redFactor',0,1);

  group.add(this.scene, 'greenFactor',0,1);

  group.add(this.scene, 'blueFactor',0,1);
};


//PROJECT2
