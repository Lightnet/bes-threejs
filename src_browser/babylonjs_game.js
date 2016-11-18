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

	create_hud2d3d(){
		//super.create_hud();
		var canvas = new BABYLON.WorldSpaceCanvas2D(this.scene, new BABYLON.Size(100, 100), {
		    id: "WorldSpaceCanvas",
		    worldPosition: new BABYLON.Vector3(0, 0, 0),
		    worldRotation: BABYLON.Quaternion.RotationYawPitchRoll(Math.PI / 4, Math.PI / 4, 0),
		    renderScaleFactor: 8,
		    enableInteraction: true,
		    backgroundFill: "#C0C0C040",
		    //backgroundRoundRadius: 80,
		    children: [
		        new BABYLON.Text2D("World Space Canvas", { fontName: "30pt Arial", marginAlignment: "h: center, v: bottom" })
		    ]
		});

		// Create the "click me!" button
		var buttonRect = new BABYLON.Rectangle2D(
		    { parent: canvas, id: "button", x: 100, y: 100, width: 200, height: 80, fill: "#40C040FF",
		        //roundRadius: 10,
		        children:
		        [
		            new BABYLON.Text2D("Click Me!", { fontName: "30pt Arial", marginAlignment: "h: center, v: center" })
		        ]});

		// Create the "Awesome!" button
		var button2Rect = new BABYLON.Rectangle2D(
		    { parent: canvas, id: "button2", x: 420, y: 100, width: 200, height: 80, fill: "#4040C0FF",
		        //roundRadius: 10,
				//isVisible: false,
		        children:
		        [
		            new BABYLON.Text2D("Awesome!", { fontName: "30pt Arial", marginAlignment: "h: center, v: center" })
		        ]});
				// Add an observable to the "Click me!" button, watch for click the display/hide the second button
		buttonRect.pointerEventObservable.add(function (d, s) {
		    //button2Rect.levelVisible = !button2Rect.levelVisible;
			console.log("click");
			this.scene.render();
		}, BABYLON.PrimitivePointerInfo.PointerUp);


		button2Rect.pointerEventObservable.add(function (d, s) {
		    //button2Rect.levelVisible = !button2Rect.levelVisible;
			console.log("click2");
			this.scene2.render();
		}, BABYLON.PrimitivePointerInfo.PointerUp);

	}

	create_hud2d(_scene =null){
		var self = this;
		if(_scene == null){
			_scene = this.scene;
		}

		console.log(_scene);

		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(_scene, {
		    id: "ScreenCanvas",
		    size: new BABYLON.Size(300, 100),
		    backgroundFill: "#4040408F",
			enableInteraction: true,
		    //backgroundRoundRadius: 50,
		    children: [
		        new BABYLON.Text2D("Hello World!", {
		            id: "text",
		            marginAlignment: "h: center, v:center",
		            fontName: "20pt Arial",
		        })
		    ]
		});

		// Create the "click me!" button
		var buttonRect = new BABYLON.Rectangle2D(
		    { parent: this.screencanvas, id: "button", x: 0, y: 0, width: 100, height: 20, fill: "#40C040FF",
		        //roundRadius: 10,
		        children:
		        [
		            new BABYLON.Text2D("Scene 1!", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })
		        ]});
		var button2Rect = new BABYLON.Rectangle2D(
		    { parent: this.screencanvas, id: "button2", x: 100, y: 10, width: 100, height: 20, fill: "#4040C0FF",
		        //roundRadius: 10,
				//isVisible: false,
		        children:
		        [
		            new BABYLON.Text2D("Scene 2!", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })
		        ]});

		buttonRect.pointerEventObservable.add(function (d, s) {
		    //button2Rect.levelVisible = !button2Rect.levelVisible;
			console.log("click");
			//remove function call from loop scene?
			self.engine.runRenderLoop(function() {
				self.scene.render();
			});
		}, BABYLON.PrimitivePointerInfo.PointerUp);

		button2Rect.pointerEventObservable.add(function (d, s) {
			console.log("click");
			//remove function call from loop scene?
			self.engine.runRenderLoop(function() {
				//newScene.render();
				self.scene2.render();
			});
		}, BABYLON.PrimitivePointerInfo.PointerUp);
	}

	loadscene_extbabylon(){
		var self = this;

		BABYLON.SceneLoader.Load("/assets/", "cube.babylon", this.engine, function (newScene) {
            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
                // Attach camera to canvas inputs
                newScene.activeCamera.attachControl(self.canvas);
				self.scene2 = newScene;
				self.create_hud2d(newScene);
				//self.scene.add(newScene);
				//console.log(newScene);
                // Once the scene is loaded, just register a render loop to render it
                self.engine.runRenderLoop(function() {
                    newScene.render();
					console.log("render");
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

	appendsceneanim_extbabylon(){
		//http://doc.babylonjs.com/classes/2.4
		//http://doc.babylonjs.com/classes/2.4/SceneLoader
		//append
		var self = this;
		//BABYLON.SceneLoader.Append("/assets/", "cube.babylon", this.scene, function (newScene) {
		BABYLON.SceneLoader.Append("/assets/", "arm_cube.babylon", this.scene, function (newScene) {
            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
				console.log("scene ready!");
				console.log(self.scene);
				//blender export all animation to single frame to babylon file.
				//BABYLON.PlayAnimationAction(newScene.meshes[0], target, 0, 4, loop, condition)
				var anims = newScene.beginAnimation(newScene.meshes[0], 0, 15, true, 0.5);//works
				//console.log(anims);

				//console.log(newScene.Animatables );//activete animations in the scene
				//var anims = newScene.beginDirectAnimation(newScene.meshes[0], newScene.Animatables[0], 0, 5, true, 1);
				//console.log(newScene.meshes[0].getAnimatables());
				//var anims = newScene.getAnimatableByTarget(newScene.meshes[0]);//works when animation is playing
				//console.log(anims);
				//newScene.beginDirectAnimation(newScene.meshes[0], animations, from, to, loop, speedRatio, onAnimationEnd)

				//BABYLON.PlayAnimationAction("", newScene.meshes[0], 0, 10, true, 0.5);
            });
        }, function (progress) {
            // To do: give progress feedback to user
			console.log("progress");
			//console.log(progress);
        });
	}

	loadmesh_extbabylon(){
		console.log("mesh loading...");
		//http://doc.babylonjs.com/classes/2.4/SceneLoader
		//blender default when export
		BABYLON.SceneLoader.ImportMesh("Cube", "/assets/", "cube.babylon", this.scene, function (newMeshes, particleSystems) {
		});

		/*
		BABYLON.SceneLoader.ImportMesh("", "/assets/", ".babylon", this.scene, function (newMeshes, particleSystems) {
			console.log("mesh loaded...");
			console.log(newMeshes[0]);
		},function (progress) {
            // To do: give progress feedback to user
			//console.log("progress");
			console.log(progress);

			var percent = (progress.loaded / progress.total) * 100;
			console.log(percent + "%");


			//console.log(progress);
        },function (error) {
            // To do: give progress feedback to user
			console.log(error);
			//console.log(progress);
        });
		*/
	}

	loadmesh_extglTF(){
		//http://doc.babylonjs.com/classes/2.4/SceneLoader
		//blender default when export

		//BABYLON.SceneLoader.ImportMesh("Cube", "/assets/", "cube.gltf", this.scene, function (newMeshes, particleSystems) {
			//console.log("loading...");
			//console.log(newMeshes);
		//});

		//BABYLON.SceneLoader.Append("/assets/", "cube.gltf", this.scene, function (newScene) {
            // Wait for textures and shaders to be ready
            //newScene.executeWhenReady(function () {
				//console.log("scene ready!");
				//console.log(self.scene);
            //});
        //}, function (progress) {
            // To do: give progress feedback to user
			//console.log("progress");
			//console.log(progress);
        //});


		console.log("mesh loading...");

		var self = this;//cube.babylon
		//BABYLON.SceneLoader.Load("/assets/", "cube.babylon", this.engine, function (newScene) {
		BABYLON.SceneLoader.Load("/assets/", "Duck.gltf", this.engine, function (newScene) {

            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
                // Attach camera to canvas inputs
				var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,10), newScene);

				camera.position.x = 0;
				camera.position.y = 10;
				camera.position.z = 20;
				camera.setTarget(BABYLON.Vector3.Zero());

				//var box = BABYLON.Mesh.CreateBox("box", 2, newScene);
				//box.position.y = 3;
                newScene.activeCamera.attachControl(self.canvas,false);
				self.scene2 = newScene;
				//self.create_hud2d(newScene);
				console.log(newScene);
                // Once the scene is loaded, just register a render loop to render it
				console.log("init render?");
                self.engine.runRenderLoop(function() {
                    self.scene2.render();
					//console.log("render?");
                });
            });
        }, function (progress) {
			console.log("progress");
        });

	}

	createscene_simple(){
		//https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_Babylon.js?utm_content=buffer38bb7&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
		var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scene);

		var box = BABYLON.Mesh.CreateBox("box", 2, this.scene);
		box.position.y = 5;

		var boxMaterial = new BABYLON.StandardMaterial("material", this.scene);
		boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
		box.material = boxMaterial;

		//var box = BABYLON.Mesh.CreateBox("box", 2, this.scene);
		/*
		var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2, 2, 2, 12, 1, this.scene);
		cylinder.position.x = 5;
		cylinder.rotation.x = -0.2;
		var cylinderMaterial = new BABYLON.StandardMaterial("material", this.scene);
		cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0);
		cylinder.material = cylinderMaterial;
		*/
		var t = 0;
		var renderLoop = function () {
		    //scene.render();
		    t -= 0.01;
		    // animation code goes here
			box.rotation.y = t*2;
		};
		this.engine.runRenderLoop(renderLoop);
	}

	//load mesh animation
	//http://www.html5gamedevs.com/topic/10758-stop-the-mesh-animation-autoanimate/
	// scene.stopAnimation(newMeshes[0])
	//
	//

	init(){
		super.init();
		console.log("init babylonjs_game...");
		//this.create_hud2d3d();
		//this.create_hud2d();
		//this.appendscene_extbabylon();
		//this.loadscene_extbabylon();
		//var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scene);
		//this.loadmesh_extbabylon();

		BABYLON.GLTFFileLoader.MakeYUP = true; // false by default
		BABYLON.GLTFFileLoader.HomogeneousCoordinates = true; // false by default


		//this.camera.position.y = 10;
		//this.camera.position.z = -200;
		//this.camera.position.x = 0;
		//this.camera.position.y = 10;
		//this.camera.position.z = 20;
		//this.camera.position.z = -5;
		//this.camera.setTarget(BABYLON.Vector3.Zero());

		//var box = BABYLON.Mesh.CreateBox("box", 2, this.scene);
		//box.position.y = 0;

		this.appendsceneanim_extbabylon();
		//this.loadmesh_extglTF();

		//init oimo.js physics
		//this.init_phsics();

		//this.createscene_objects();
		//this.createscene_physics();
		//this.createscene_simple();
	}
}
