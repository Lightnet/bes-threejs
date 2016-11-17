/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
/*
	Javascript compile: babeljs ES6
	Simple example to extends threejs game API to run simple test game.
	That run on higher javascript to low javascript when compile with extra features
	from the web browser.
*/

class Babylonjsbes6 {
	constructor(settings){
		var _this = this;
		if(settings != null){
			//this need to be last else it variable are not assign
			if (settings['onload'] == true) {
				this.addListener("load", window, function () {
					console.log('init window listen Babylonjs setup... ');
					_this.init();
				});
			} else {
				console.log('init Babylonjs setup...');
				this.init();
			}
		}
	}

	//window load listen event
	addListener(event, obj, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(event, fn, false); // modern browsers
        }
        else {
            obj.attachEvent("on" + event, fn); // older versions of IE
        }
    }

	//create simple scene
	createScene() {
	    // create a basic BJS Scene object
	    var scene = new BABYLON.Scene(this.engine);
	    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
	    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
	    // target the camera to scene origin
	    camera.setTarget(BABYLON.Vector3.Zero());
	    // attach the camera to the canvas
	    camera.attachControl(this.canvas, false);
		this.camera = camera;
	    // create a basic light, aiming 0,1,0 - meaning, to the sky
	    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
	    // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
	    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
	    // move the sphere upward 1/2 of its height
	    sphere.position.y = 1;
		this.sphere = sphere;
	    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
	    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
		this.ground = ground;
	    // return the created scene
	    return scene;
	}

	enableMeshesCollision(meshes) {
  		meshes.forEach(function(mesh) {
    		mesh.checkCollisions = true;
  		});
	}

	init(){
		console.log("init babylonjsbes6");
		var self = this;
		this.canvas = document.getElementById('renderCanvas');
		this.engine = new BABYLON.Engine(this.canvas, true);

		this.scene = this.createScene();

		//init oimo.js physics
		this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
		console.log(this.sphere.position);
		this.sphere.position.y = 5;

		this.sphere.physicsImpostor = new BABYLON.PhysicsImpostor(this.sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
		this.sphere.material = new BABYLON.StandardMaterial("Mat", this.scene);

		this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);

		//this.sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
		//impostor.setAngularVelocity(new BABYLON.Quaternion(0,1,0,0));
		//console.log(this.sphere.physicsImpostor);
		//this.sphere.physicsImpostor.setDeltaPosition(new BABYLON.Vector3(0,5,0));

		this.sphere.physicsImpostor.registerOnPhysicsCollide(this.ground.physicsImpostor, function(main, collided) {
    		main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
			//console.log(main.object.material);
			//console.log(self.sphere);
			//console.log("hit");
		});

		//render the scene
		this.engine.runRenderLoop(function() {
		    self.scene.render();
		});
		//add listen event for window to load
		window.addEventListener('resize', function() {
    		self.engine.resize();
		});
	}
}
