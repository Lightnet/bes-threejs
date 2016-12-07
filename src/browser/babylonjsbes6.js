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
	//pass args params
	constructor(args){
		var _this = this;
		this.onload = true;
		this.binit = true;
		this.reload = false;//web browser editor reload url

		this.scenename = "default"; //default name
		this.scenes = []; //manage scene

		if(args != null){
			//this need to be last else it variable are not assign
			if (args['onload'] != null) {
				this.onload = args['onload'];
				//console.log(args);
			}
		}

		if (this.onload) {
			this.addListener("load", window, function () {
				console.log('init window listen Babylonjs setup... ');
				_this.init();
			});
		}
		/* does not work here since variable assign gets nulls
		else {
			if(this.binit){
				console.log('init Babylonjs setup...');
				this.init();
			}
		}
		*/
	}

	setup_network(){
		var self = this;
		this.socket = io();
		this.socket.on('connect', function () {
		    console.log('server connected');
			if(this.reload){
				location.reload();
			}
		});

		this.socket.on('disconnect', function () {
		    console.log('server disconnected');
			this.reload = true;
		});
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
		//console.log(camera);
	    // target the camera to scene origin
	    camera.setTarget(BABYLON.Vector3.Zero());
	    // attach the camera to the canvas
	    camera.attachControl(this.canvas, false);
		this.camera = camera;
	    // return the created scene
	    return scene;
	}


	//create example scene
	createscene_objects(){
		// create a basic light, aiming 0,1,0 - meaning, to the sky
	    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
		// create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
		var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
	    // move the sphere upward 1/2 of its height
	    sphere.position.y = 1;
		this.sphere = sphere;
	    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
	    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
		this.ground = ground;
	}

	createscene_physics(){
		this.sphere.position.y = 5;
		this.sphere.physicsImpostor = new BABYLON.PhysicsImpostor(this.sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
		this.sphere.material = new BABYLON.StandardMaterial("Mat", this.scene);

		this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);

		//this.sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
		//impostor.setAngularVelocity(new BABYLON.Quaternion(0,1,0,0));
		//console.log(this.sphere.physicsImpostor);
		//this.sphere.physicsImpostor.setDeltaPosition(new BABYLON.Vector3(0,5,0));

		this.sphere.physicsImpostor.registerOnPhysicsCollide(this.ground.physicsImpostor, function(main, collided) {
    		//main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
			//console.log("hit");
		});
	}

	enableMeshesCollision(meshes) {
  		meshes.forEach(function(mesh) {
    		mesh.checkCollisions = true;
  		});
	}

	create_hud(){
		//http://doc.babylonjs.com/tutorials/Using_the_Canvas2D
		//http://doc.babylonjs.com/overviews/Canvas2D_Home
		console.log("init hud");
		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
		    size: new BABYLON.Size(300, 100),
		    backgroundFill: "#4040408F",
		    //backgroundRoundRadius: 50,
		    children: [
		        new BABYLON.Text2D("Hello World!", {
		            id: "text",
		            marginAlignment: "h: center, v:center",
		            fontName: "20pt Arial",
		        })
		    ]
		});
	}

	//init oimo.js physics
	init_phsics(){
		this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
	}

	//start render scene set array
	start_scenerender(){
		var self = this;
		this.engine.runRenderLoop(function() {
			if(self.scenes[self.scenename] !=null){
				if(typeof self.scenes[self.scenename].renderloop === 'function'){
					self.scenes[self.scenename].renderloop(); //custom function call
				}else{
					self.scenes[self.scenename].render();
				}
			}
		});
	}

	//http://doc.babylonjs.com/classes/2.4/Mesh
    parse_object(args){
        var _obj;
        if(args !=null){
            if(args['freecamera'] != null){
                _obj = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this.scene);
            }

            if(args['scene'] != null){
                _obj = new BABYLON.Scene(this.engine);
            }

            if(args['hemisphericlight'] != null){
                _obj = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
            }


			if(args['geometrytype'] !=null){
				if(args['geometrytype'] == 'cube'){
					_obj = this.parse_createbox(args);
	            }

				if(args['geometrytype'] == 'sphere'){
	                _obj = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
	            }

	            if(args['geometrytype'] == 'ground'){
	                _obj = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
	            }

				if(args['geometrytype'] == 'plane'){
	                _obj = BABYLON.Mesh.CreatePlane("plane", 10.0, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'disc'){
	                _obj = BABYLON.Mesh.CreateDisc("disc", 5, 30, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'cylinder'){
	                _obj = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'torus'){
	                _obj = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'knot'){
	                _obj = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }
	            if(args['geometrytype'] == 'lines'){
	                /*
	                _obj = BABYLON.Mesh.CreateLines("lines", [
	                    new BABYLON.Vector3(-10, 0, 0),
	                    new BABYLON.Vector3(10, 0, 0),
	                    new BABYLON.Vector3(0, 0, -10),
	                    new BABYLON.Vector3(0, 0, 10)
	                ], scene);
	                */
	            }

	            if(args['dashedLines'] != null){
	                //_obj = BABYLON.Mesh.CreateDashedLines("dashedLines", [v1, v2, ... vn], dashSize, gapSize, dashNb, scene);
	            }

	            if(args['ribbon'] != null){
	                //_obj = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['tube'] != null){
	                //_obj = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['tiledhround'] != null){
	                //_obj = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -3, -3, 3, 3, subdivisions, precision, scene, false);
	            }
			}





        }else{


        }

        return _obj;
    }

	parse_createbox(args){
		console.log("found");
		console.log(args);
		var _obj = null;
		var params = {};
		//if(args['box'] != null){
			//var _obj = BABYLON.MeshBuilder.CreateBox("ground", {height:1,width:20,depth:20}, this.scene);
			//args = args['box'];
			params.height = (typeof args['parameters']['height'] === 'number') ? args['parameters']['height'] : 1;
			params.width = (typeof args['parameters']['width'] === 'number') ? args['parameters']['width'] : 1;
			params.depth = (typeof args['parameters']['depth'] === 'number') ? args['parameters']['depth'] : 1;
			var _obj = BABYLON.MeshBuilder.CreateBox("ground",params, this.scene);
			_obj.position.x = (typeof args['position']['x'] === 'number') ? args['position']['x'] : 0;
			_obj.position.y = (typeof args['position']['y'] === 'number') ? args['position']['y'] : 0;
			_obj.position.z = (typeof args['position']['z'] === 'number') ? args['position']['z'] : 0;

			_obj.rotation.x = (typeof args['rotation']['x'] === 'number') ? args['rotation']['x'] : 0;
			_obj.rotation.y = (typeof args['rotation']['y'] === 'number') ? args['rotation']['y'] : 0;
			_obj.rotation.z = (typeof args['rotation']['z'] === 'number') ? args['rotation']['z'] : 0;

			_obj.scaling.x = (typeof args['scaling']['x'] === 'number') ? args['scaling']['x'] : 1;
			_obj.scaling.y = (typeof args['scaling']['y'] === 'number') ? args['scaling']['y'] : 1;
			_obj.scaling.z = (typeof args['scaling']['z'] === 'number') ? args['scaling']['z'] : 1;

			console.log(_obj);

		//}
		return _obj;
	}

	parse_physcis(){

	}

	init(){
		//console.log("init babylonjsbes6");
		var self = this;
		this.canvas = document.getElementById('renderCanvas');
		this.engine = new BABYLON.Engine(this.canvas, true);
		//disable  manifest cache
		this.engine.enableOfflineSupport = false;
		//console.log(this.engine);
		//https://doc.babylonjs.com/tutorials/how_to_use_assetsmanager
		this.engine.loadingUIText = "loading...";
		//this.engine.displayLoadingUI();
		this.scene = this.createScene();
		this.scenes[this.scenename] = this.scene;
		//this.scenes[this.scenename].looprender=function(){
			//this.render();
		//}

		//this.createscene_objects();
		//init oimo.js physics
		//this.init_phsics();
		//this.createphsycis_test();
		//https://doc.babylonjs.com/tutorials/how_to_use_assetsmanager
		//this.create_hud();

		//this.setup_network();
		//render the scene
		this.start_scenerender();

		/*
		this.engine.runRenderLoop(function() {
			var name = "scene";
		    self.scene.render();
		});
		*/
		//add listen event for window to load
		window.addEventListener('resize', function() {
    		self.engine.resize();
		});
		//this.engine.hideLoadingUI();
	}
}
