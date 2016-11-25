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

//===============================================
//
//===============================================

class ObjectRPGID{
	constructor(args){
		this.hashid = "";
		this.id = "";
		this.name = "none";
		this.description = "none";
		if(args !=null){
			if(args['name'] !=null){
				this.name = args['name'];
			}
			if(args['id'] !=null){
				this.name = args['id'];
			}
			if(args['hashid'] !=null){
				this.name = args['hashid'];
			}
		}
	}
}

class RPGStats{
	constructor(args){
		this.str = 0;
		this.vit = 0;
		this.dex = 0;
		this.agi = 0;
		this.int = 0;

		this.wisdom = 0;
		this.charisma  = 0;
		this.luck = 0;

		this.perception = 0;
	}
}

class RPGCondition extends ObjectRPGID{
	constructor(args){
		super();
		this.params = [];
	}
}

class RPGSkill extends ObjectRPGID{
	constructor(args){
		super();
	}
}

class RPGItem extends ObjectRPGID{
	constructor(args){
		super();
	}
}

class RPGEquip extends RPGItem{
	constructor(args){
		super();
		this.stats = new Stats();
		this.params = [];
	}
}

class RPGWeapon extends RPGEquip{
	constructor(args){
		super();
		this.stats = new RPGStats();
		this.params = [];
	}
}

class RPGStatus extends ObjectRPGID{
	constructor(args){
		super(args);
		this.stats= new RPGStats();

		this.health = 5;
		this.maxhealth = 5;

		this.magic = 0;
		this.magicmax = 0;

		this.stamina = 100;
		this.maxstamina = 100;

		this.psyche = 100;
		this.maxpsyche = 100;

		this.conditions = [];
		this.skills = [];
		this.inventory = [];
		this.equipments = [];

		this.speed = 1;
		this.criticalhit = 1;

		this.attack = 1;
		this.defense = 0;

		this.magicattack = 0;
		this.magicdefense = 0;

		this.totalattack = 1;
		this.totaldefense = 0;

		this.totalmagicattack = 0;
		this.totalmagicdefense = 0;

		this.queryaction = ""; //attack, skill
		this.target = null;
		this.targets = null;
		this.targettype = "single";//single, multiples, selected, area
		this.readyaction = false;
		this.finishaction = false;

		this.mesh = null;
		this.isdead = false;

		if(args !=null){
			if(args['attack'] !=null ){
				this.attack = args['attack'];
			}
			if(args['defense'] !=null ){
				this.defense = args['defense'];
			}
		}
	}
}

//===============================================
//
//===============================================

class Babylonjs_game extends Babylonjsbes6 {

	constructor(args){

		super(args);

		this.materials = [];
		this.textures = [];
		this.meshes = [];


		this.characters = [];
		this.dimensionstorage = [];

		this.companions = [];//those who join in your party that travel together
		this.squads = [];

		this.friends = [];//battle mode?
		this.foes = [];//battle mode?

		this.parties = []; //who in the party //battle mode?
		this.enemies = []; //threat if player attack or in battle actions //battle mode?
		this.npcs = []; //local villagers

		this.scene_battle;
		this.scene_dimension_homebase;
		this.scene_global_map;
		this.scene_world_map;
		this.scene_local_map;

		//this.scenename = "default";
		//this.scenes = [];
		//this.currentscene;

		this.sceneassets;
		this.assetsManager;
		this.config_assets;
		//console.log(this.parties);
		//console.log("init babylon game");
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
			//self.engine.runRenderLoop(function() {
				//self.scene.render();
			//});
		}, BABYLON.PrimitivePointerInfo.PointerUp);

		button2Rect.pointerEventObservable.add(function (d, s) {
			console.log("click");
			//remove function call from loop scene?
			//self.engine.runRenderLoop(function() {
				//newScene.render();
				//self.scene2.render();
			//});
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
                //self.engine.runRenderLoop(function() {
                    //newScene.render();
					//console.log("render");
                //});
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
		//block_character.babylon
		//BABYLON.SceneLoader.Append("/assets/", "cube.babylon", this.scene, function (newScene) {
		//BABYLON.SceneLoader.Append("/assets/", "arm_cube.babylon", this.scene, function (newScene) {
		BABYLON.SceneLoader.Append("/assets/", "block_character.babylon", this.scene, function (newScene) {

            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
				console.log("scene ready!");
				console.log(self.scene);
				//blender export all animation to single frame to babylon file.
				//BABYLON.PlayAnimationAction(newScene.meshes[0], target, 0, 4, loop, condition)
				var anims = newScene.beginAnimation(newScene.meshes[0], 0, 60, true, 0.5);//works
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
		//var filepath = "cube.babylon";
		//var filepath = "block_character.babylon";
		var filepath = "block_character02.babylon";
		var objectname = "Cube";
		//var filepath = "arm_cube.babylon";
		//var objectname = "Cube";
		var self = this;

		BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, function (newMeshes, particleSystems) {

			console.log(newMeshes[0]);
			self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5);//works
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
		BABYLON.SceneLoader.Load("/assets/", "cube.babylon", this.engine, function (newScene) {
		//BABYLON.SceneLoader.Load("/assets/", "Duck.gltf", this.engine, function (newScene) {

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
		/*
		var t = 0;
		var renderLoop = function () {
		    //scene.render();
		    t -= 0.01;
		    // animation code goes here
			box.rotation.y = t*2;
		};
		this.engine.runRenderLoop(renderLoop);
		*/
	}

	//load mesh animation
	//http://www.html5gamedevs.com/topic/10758-stop-the-mesh-animation-autoanimate/
	// scene.stopAnimation(newMeshes[0])
	//
	//

	loadmesh_blockcharacter(){
		//var filepath = "block_character02.babylon";
		//var objectname = "Cube";
		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		//var filepath = "arm_cube.babylon";
		//var objectname = "Cube";
		var self = this;
		BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, function (newMeshes, particleSystems) {
			console.log(newMeshes[0]);
			//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5);//works
			self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5);//works
		});
	}

	create2dhud(){
		this.hudcanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
		    //size: new BABYLON.Size(300, 100),
		    //backgroundFill: "#4040408F",
			enableInteraction: true//,
		    //backgroundRoundRadius: 50,
			//x:10,
			//y:400,
			/*
		    children: [
		        new BABYLON.Text2D("Hello World!", {
		            id: "text",
		            marginAlignment: "h: center, v:center",
		            fontName: "20pt Arial",
		        })
		    ]
			*/
		});

		// Create the "click me!" button
		var buttonRect = new BABYLON.Rectangle2D(
		    { parent: this.hudcanvas, id: "button", x: 10, y: 10, width: 100, height: 20, fill: "#40C040FF",
		        //roundRadius: 10,
		        children:
		        [
		            new BABYLON.Text2D("Action", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })
		        ]});
				buttonRect.pointerEventObservable.add(function (d, s) {
					console.log("click1");
				}, BABYLON.PrimitivePointerInfo.PointerUp);
		var buttonRect2 = new BABYLON.Rectangle2D(
		    { parent: this.hudcanvas, id: "button", x: 120, y: 10, width: 100, height: 20, fill: "#40C040FF",
		        //roundRadius: 10,
		        children:
		        [
		            new BABYLON.Text2D("Action2", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })
		        ]});
				buttonRect2.pointerEventObservable.add(function (d, s) {
					console.log("click2");
				}, BABYLON.PrimitivePointerInfo.PointerUp);
	}
//===============================================
// HUD UI
//===============================================

	create2DHUD(){
		this.hudcanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
			enableInteraction: true//,
		});
		//console.log(this.hudcanvas);
	}

	create2D_BattleHUD(){
		var self = this;
		//button
		this.AddButton(this.hudcanvas,'button_escape','Escape',10,(22*0+10), ()=>{self.actionescape();});
		this.AddButton(this.hudcanvas,'button_item','Items',10,(22*1+10), ()=>{self.openitem();});
		this.AddButton(this.hudcanvas,'button_skills','Skills',10,(22*2+10), ()=>{self.openskills();});
		this.AddButton(this.hudcanvas,'button_move','Move',10,(22*3+10), ()=>{self.openitem();});
		this.AddButton(this.hudcanvas,'button_attack','Attack',10,(22*4+10), ()=>{self.actionattack();});
		this.AddButton(this.hudcanvas,'button_battle','Battle',10,(22*5+10), ()=>{self.actionbattle();});
	}

	AddButton(_scenecanvas, _id, _name, _x, _y, _callback, options){
		var buttonRect = new BABYLON.Rectangle2D(
	    { parent: _scenecanvas, id: _id, x: _x, y: _y, width: 100, height: 20, fill: "#40C040FF",
	        children:
	        [
	            new BABYLON.Text2D(_name, { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })
	        ]});
			buttonRect.pointerEventObservable.add(function (d, s) {
				//console.log("click2");
				_callback();
			}, BABYLON.PrimitivePointerInfo.PointerUp);
		return buttonRect;
	}

//===============================================
// BATTLE // MODELS
//===============================================

	getmesh(_name){
		var model = null;

		for(var i = 0; i < this.assetsManager._scene.meshes.length;i++){
			if(this.assetsManager._scene.meshes[i] !=null){
				//console.log(this.assetsManager._scene.meshes[i].uniqueId);
				if(this.assetsManager._scene.meshes[i].name == _name){
					//console.log(this.assetsManager._scene.meshes[i]);
					model = this.assetsManager._scene.meshes[i].clone(_name,null,true);
					//remove assets since it been clone
					this.assetsManager._scene.removeMesh(model);
					//model = this.assetsManager._scene.meshes[i].clone();
					//model = this.assetsManager._scene.meshes[i].createInstance("i" + _name);
					break;
				}
			}
		}

		/*
		for(var i = 0; i < this.assetsManager._tasks.length;i++){
			if(this.assetsManager._tasks[i].loadedMeshes[0] != null){
				//console.log(this.assetsManager._tasks[i].loadedMeshes[0]);
				if(this.assetsManager._tasks[i].meshesNames == _name){
					model = this.assetsManager._tasks[i].loadedMeshes[0].clone(_name,null,true);
					//console.log("found model!");
					break;
				}
			}
		}
		*/
		return model; //null or object
	}

	createbattle_prototype(){
		var self = this;
		var player = new RPGStatus({name:"player"});
		console.log(this.assetsManager);
		var model = this.getmesh("CubeBody");
		console.log(model);
		if(model !=null){

			model.rpgstatus = player;
			player.mesh = model;

			//console.log("model");
			//console.log(model);
			//set scene to be update...
			model._scene = this.scenes[this.scenename];
			model.isVisible = true;
			this.scenes[this.scenename].addMesh(model);
			model.position.x = 3;
			model.rotation.y = Math.PI/2; //90
			var i = 0;
			var node_ui = new BABYLON.Vector2(0,100);
			new BABYLON.Group2D({
            parent: this.hudcanvas, id: "GroupTag #" + i, width: 80, height: 40, trackNode: model, origin: BABYLON.Vector2(0,10),
	            children: [
	                new BABYLON.Rectangle2D({ id: "firstRect", width: 80, height: 26, x: 0, y: 0, origin: BABYLON.Vector2.Zero(), border: "#FFFFFFFF", fill: "#808080FF", children: [
	                        new BABYLON.Text2D(player.name, { marginAlignment: "h: center, v:center", fontName: "bold 12px Arial" })
	                    ]
	                })
	            ]
        	});
			//console.log(model);
			//console.log(player);
		}
		//console.log(this.scene);
		//console.log(this);
		//console.log(this.parties);
		this.parties.push(player);
		var enemy = new RPGStatus({name:"enemy"});


		var model2 = this.getmesh("CubeBody");

		if(model2 !=null){

			model2.rpgstatus = enemy;
			enemy.mesh = model2;

			console.log("model");
			console.log(model2);
			//set scene to be update...
			model2._scene = this.scenes[this.scenename];
			model2.isVisible = true;
			this.scenes[this.scenename].addMesh(model2);
			model2.position.x = -3;
			model2.rotation.y = Math.PI/2 * -1; //-90
			//var nametext2D = new BABYLON.Text2D(enemy.name, { marginAlignment: "h: center, v:center", fontName: "bold 12px Arial" });
			//console.log(player);
		}

		this.enemies.push(enemy);
		var count = 0;
		self.engine.runRenderLoop(function() {
			count++;
			if(count > 100){
				count = 0;
			}
			//nametext2D.text = "test" + count;

			//console.log("render");
		});
		//this.scenename = "sceneassets";
		//this.scenes['sceneassets'];
	}

	drawstatusbars(_2DCanvas,_model,status){
		var i = 0;
		var node_ui = new BABYLON.Vector2(0,100);
		new BABYLON.Group2D({
		parent: _2DCanvas, id: "GroupTag #" + model.uniqueId, width: 80, height: 40, trackNode: _model, origin: BABYLON.Vector2(0,10),
			children: [
				new BABYLON.Rectangle2D({ id: "firstRect", width: 80, height: 26, x: 0, y: 0, origin: BABYLON.Vector2.Zero(), border: "#FFFFFFFF", fill: "#808080FF", children: [
						new BABYLON.Text2D(_status.name, { marginAlignment: "h: center, v:center", fontName: "bold 12px Arial" })
					]
				})
			]
		});
	}



	actionbattle(){
		console.log("action battle ...");
		console.log(this.parties[0]);
		//check if party health is not zero for attack
		if(this.parties[0].health > 0){
			this.enemies[0].health = this.enemies[0].health - this.parties[0].attack;
		}
		if(this.enemies[0].health <= 0){
		 	this.enemies[0].health = 0;
		}
		console.log("ENEMY HEALTH:" + this.enemies[0].health+ "/" + this.enemies[0].maxhealth);
		//check if enemy health is not zero to attack if dead
		if(this.enemies[0].health > 0){
			this.parties[0].health = this.parties[0].health - this.parties[0].attack;
		}
		if(this.parties[0].health <= 0){
		 	this.parties[0].health = 0;
		}
		console.log("PARTY HEALTH:" + this.parties[0].health + "/" + this.parties[0].maxhealth);
		console.log(this.enemies[0]);
	}
	opponentAttack(){
		console.log("opponentAttack ...");
	}
	setupbattle(){}
	createbattle(){}
	openitem(){
		console.log("open item ...");
		console.log(this.parties[0]);
	}
	openskills(){
		console.log("open skills ...");
		console.log(this.parties[0]);
	}
	actionattack(){
		console.log("action attack ...");
		console.log(this.parties[0]);
	}
	actionmove(){
		console.log("action move ...");
		console.log(this.parties[0]);
	}
	actionescape(){
		console.log("action escape ...");
		console.log(this.parties[0]);
	}
//===============================================
//===============================================

	loadbabylon_json(){
		//var filepath = "block_character02.babylon";
		//var objectname = "Cube";
		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		//var filepath = "arm_cube.babylon";
		//var objectname = "Cube";
		var self = this;
		BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, function (newMeshes, particleSystems) {
			console.log(newMeshes[0]);
			//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5);//works
			self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5);//works
		});
	}


//===============================================
//
//===============================================

	//create scene assets for run background
	createscene_assets(){
		var self = this;
		this.sceneassets = new BABYLON.Scene(this.engine);
		var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this.sceneassets);
		camera.attachControl(this.canvas, false);

		var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.sceneassets);

		this.scenes['sceneassets'] = this.sceneassets;

		//this.sceneassets.activeCamera.attachControl(self.canvas);
		//self.engine.runRenderLoop(function() {
			//self.sceneassets.render();
		//});
		//this.engine.displayLoadingUI();
		this.assetsManager = new BABYLON.AssetsManager(this.sceneassets);
		//this.assetsManager = new BABYLON.AssetsManager(this.scenes[this.scenename]);

		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
		meshTask.onSuccess = function (task) {
    		task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].isVisible = false;

			//console.log(task.loadedMeshes[0]);
		}

		filepath = "arm_cube.babylon";
		objectname = "Cube";

		var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
		meshTask2.onSuccess = function (task) {
    		task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].isVisible = false;
		}

		this.assetsManager.onFinish = function(tasks) {
			console.log('assets loaded!');
			//self.engine.hideLoadingUI();
		    //self.engine.runRenderLoop(function() {
		        //self.sceneassets.render();
		    //});
			self.setup_game();
			this.engine.hideLoadingUI();
		};
		this.assetsManager.load();
	}

	//make scene active render
	render_scene(_scene){
		var self = this;
		console.log(_scene);
		console.log(self.engine);
		//note it will keep adding more array in engine loop
		self.engine.runRenderLoop(function() {
			_scene.render();
			//console.log(_scene._renderId);
		});
	}

	stop_render(){
		//clear out all function call loops array
		this.engine.stopRenderLoop();
	}

	input_simple(){
		var self = this;
		var keys={letft:0,right:0,forward:0,back:0};
		window.addEventListener("keydown", handleKeyDown, false);
		window.addEventListener("keyup", handleKeyUp, false);
		function handleKeyDown(evt){
			if (evt.keyCode==65){//A
				keys.left=1;
				console.log("left");
				//self.render_scene(self.scene);
				self.scenename = "default";
			}
			if (evt.keyCode==68){//D
				keys.right=1;
				//self.render_scene(self.sceneassets);
				self.scenename = "sceneassets";
			}
			if (evt.keyCode==87){//W
				keys.forward=1;
				//self.stop_render();
				//self.engine.hideLoadingUI();
			}
			if (evt.keyCode==83){//S
				keys.back=1;
				//self.engine.displayLoadingUI();
			}
		}
		function handleKeyUp(evt){
			if (evt.keyCode==65){
				keys.left=0;
			}
			if (evt.keyCode==68){
				keys.right=0;
			}
			if (evt.keyCode==87){
				keys.forward=0;
			}
			if (evt.keyCode==83){
				keys.back=0;
			}
		}
		/*
		this.engine.runRenderLoop(function () {
			if (keys.left==1){//move left
				//console.log("left");
			}
			if (keys.right==1){//move right

			}
			if (keys.back==1){//move back

			}
			if (keys.forward==1){//move forward

			}
		});
		*/

	}

	init(){
		super.init();
		//console.log(this.engine);
		//BABYLON.Tools.Log("blah");
		//this.engine.displayLoadingUI();
		//var self = this;
		console.log("init [babylonjs_game]");
		//setup files load?
		//init 2D Canvas setup HUD and UIs?
		this.create2DHUD();
		//load assets
		this.createscene_assets();

		//this.engine.displayLoadingUI();
		//this.create_hud2d3d();
		//this.create_hud2d();
		//this.appendscene_extbabylon();
		//this.loadscene_extbabylon();
		//var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scene);
		//this.loadmesh_extbabylon();
		//BABYLON.GLTFFileLoader.MakeYUP = true; // false by default
		//BABYLON.GLTFFileLoader.HomogeneousCoordinates = true; // false by default
		//this.camera.position.y = 10;
		//this.camera.position.z = -200;
		//this.camera.position.x = 0;
		//this.camera.position.y = 10;
		//this.camera.position.z = 20;
		//this.camera.position.z = -5;
		//this.camera.setTarget(BABYLON.Vector3.Zero());
		//var box = BABYLON.Mesh.CreateBox("box", 2, this.scene);
		//box.position.y = 0;
		//this.appendsceneanim_extbabylon();
		//this.loadmesh_extglTF();
		//init oimo.js physics
		//this.init_phsics();
		//this.createscene_objects();
		//this.createscene_physics();
		//this.createscene_simple();
		//this.loadmesh_blockcharacter();
		//this.loadmesh_blockcharacter();
	}


	setup_game(){
		console.log(this.engine);
		//console.log(this.engine.scenes);
		//for(var i = 0; i < this.engine.scenes.length;i++){
			//console.log(this.engine.scenes[i].getNodeByID('ScreenCanvas'));
			//console.log(this.engine.scenes[i].getNodeByName('ScreenCanvas'));
			//console.log(this.engine.scenes[i].meshes);
		//}
		var self = this;
		console.log("setup game!");

		//var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", this.scene);
		//skyMaterial.backFaceCulling = false;
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.scene);
		//var skybox = BABYLON.Mesh.CreateBox("skyBox", 100, this.scene);
		//skybox.material = skyMaterial;

		this.engine.hideLoadingUI();



		this.create2D_BattleHUD();
		//this.create2dhud();
		this.createbattle_prototype();
		this.input_simple();
//===============================================
// simple scene
//===============================================
		var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scenes[this.scenename]);

		var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
		var boxMaterial = new BABYLON.StandardMaterial("material", this.scenes[this.scenename]);
		boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
		box.material = boxMaterial;
		box.position.y = 10;
		box.position.x = -3;

		this.camera.setTarget(BABYLON.Vector3.Zero());


		//var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
		//box.position.y = 10;
		//box.position.x = -3;

		// Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    	var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, this.scene);
	}
}
