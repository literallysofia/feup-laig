
function LightingScene() {
    CGFscene.call(this);
    this.texture = null;
   	this.appearance = null;
   	this.surfaces = [];
   	this.translations = [];
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

	this.initCameras();

    this.initLights();

    this.gl.clearColor(0,0,0, 1.0);
    this.gl.clearDepth(10000.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
	this.axis=new CGFaxis(this);
	
	this.appearance = new CGFappearance(this);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	
	this.objects= [
		new CGFplane(this),
		new CGFplane(this),
		new CGFplane(this),
		new CGFplane(this)
	];

	this.setPickEnabled(true);

};

LightingScene.prototype.initLights = function () {
	this.lights[0].setPosition(1,1,1,1);
	this.lights[0].setAmbient(0.1,0.1,0.1,1);
	this.lights[0].setDiffuse(0.9,0.9,0.9,1);
	this.lights[0].setSpecular(0,0,0,1);
	this.lights[0].enable();		
	this.lights[0].update();
};


LightingScene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 14, 13), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}


LightingScene.prototype.display = function () 
{
	this.logPicking();
	this.clearPickRegistration();

	// Clear image and depth buffer every time we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	//this.scale(5,5,5);
	
	// Update all lights used
	this.lights[0].update();

	// Draw axis
	this.axis.display();	
	
	this.appearance.apply();

	this.rotate(Math.PI/2.0,1,0,0);

	// draw objects
	for (i =0; i<this.objects.length; i++) {
		this.pushMatrix();
	
		this.translate(i*2, 0, 0);
		this.registerForPick(i+1, this.objects[i]);
		
		this.objects[i].display();
		this.popMatrix();
	}
	
}
