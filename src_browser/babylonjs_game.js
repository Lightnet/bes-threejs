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

class Babylonjs_game extends Babylonjsbes6 {
	constructor(settings){
		super(settings);
	}

	//need to over this later that just a smaple test.
	create_hud(){
		//super.create_hud();
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

	loadscene_extbabylon(){
		BABYLON.SceneLoader.Load("/assets/", "cube.babylon", this.engine, function (newScene) {
            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
                // Attach camera to canvas inputs
                newScene.activeCamera.attachControl(self.canvas);
				//self.scene.add(newScene);
				//console.log(newScene);
                // Once the scene is loaded, just register a render loop to render it
                self.engine.runRenderLoop(function() {
                    newScene.render();
                });
            });
        }, function (progress) {
            // To do: give progress feedback to user
			console.log("progress");
			//console.log(progress);
        });
	}

	appendscene_extbabylon(){
		//http://doc.babylonjs.com/classes/2.4
		//http://doc.babylonjs.com/classes/2.4/SceneLoader
		//append
		var self = this;
		BABYLON.SceneLoader.Append("/assets/", "cube.babylon", this.scene, function (newScene) {
            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
				console.log("scene ready!");
				console.log(self.scene);
            });
        }, function (progress) {
            // To do: give progress feedback to user
			console.log("progress");
			//console.log(progress);
        });
	}

	loadmesh_extbabylon(){
		//http://doc.babylonjs.com/classes/2.4/SceneLoader
		//blender default when export
		BABYLON.SceneLoader.ImportMesh("Cube", "/assets/", "cube.babylon", this.scene, function (newMeshes, particleSystems) {

		});
		//cube.babylon.manifest
		//{    "version" : 1,    "enableSceneOffline" : true,    "enableTexturesOffline" : true}
	}

	createscene_simple(){
		//https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_Babylon.js?utm_content=buffer38bb7&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
		var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scene);

		var box = BABYLON.Mesh.CreateBox("box", 2, this.scene);

		var boxMaterial = new BABYLON.StandardMaterial("material", this.scene);
		boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
		box.material = boxMaterial;

		var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2, 2, 2, 12, 1, this.scene);
		cylinder.position.x = 5;
		cylinder.rotation.x = -0.2;
		var cylinderMaterial = new BABYLON.StandardMaterial("material", this.scene);
		cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0);
		cylinder.material = cylinderMaterial;

		var t = 0;
		var renderLoop = function () {
		    //scene.render();
		    t -= 0.01;
		    // animation code goes here
			box.rotation.y = t*2;
		};
		this.engine.runRenderLoop(renderLoop);
		
	}

	init(){
		super.init();
		console.log("init babylonjs_game...");
		this.create_hud();
		//this.appendscene_extbabylon();
		//this.loadscene_extbabylon();
		//this.loadmesh_extbabylon();

		//init oimo.js physics
		//this.init_phsics();

		//this.createscene_objects();
		//this.createscene_physics();
		this.createscene_simple();
	}
}
