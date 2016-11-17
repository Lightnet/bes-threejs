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

	init(){
		super.init();
		console.log("init babylonjs_game...");
		this.create_hud();
		this.appendscene_extbabylon();
		//this.loadscene_extbabylon();
		//this.loadmesh_extbabylon();

		//init oimo.js physics
		//this.init_phsics();

		//this.createscene_objects();
		//this.createscene_physics();
	}
}
