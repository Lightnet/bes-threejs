//RFC Type 4 (random) schema
var uuid = function() {
    var buf = new Uint32Array(4);
    window.crypto.getRandomValues(buf);
    var idx = -1;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        idx++;
        var r = (buf[idx>>3] >> ((idx%8)*4))&15;
        var v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

console.log(uuid());

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

class Babylonjs_game extends Babylonjsbes6 {

	constructor(args){

		super(args);

		this.materials = [];
		this.textures = [];
		this.meshes = [];
		this.models = [];

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

		this.sceneassets;
		this.assetsManager;
		this.config_assets;
	}

	createscene_assets(){
		var self = this;
		/*
		this.assetsManager = new BABYLON.AssetsManager(this.scene);

		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
		meshTask.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].position = new BABYLON.Vector3(0,2,3);
			//console.log(task.loadedMeshes[0].position);
			//task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
		}

		filepath = "arm_cube.babylon";
		objectname = "Cube";

		var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
		meshTask2.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
		}

		this.assetsManager.onFinish = function(tasks) {
			console.log('assets loaded!');
			self.setup_game();
			self.engine.hideLoadingUI();
		};
		this.assetsManager.load();
		*/

		//self.setup_game();

		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		//var filepath = "arm_cube.babylon";
		//var objectname = "Cube";

		BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, function (newMeshes, particleSystems, skeletons) {
			console.log(newMeshes[0]);
			newMeshes[0].isVisible = false;
			//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5); //works
			//self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5); //works
			self.meshes.push(newMeshes[0]);
			self.models.push({mesh:newMeshes[0],skeleton:skeletons[0]});
			self.setup_game();
		});

	}

	getmesh(_name){
		var model = null;
		for(var i = 0 ; i < this.models.length;i++){
			if(this.models[i].mesh.name == _name){
				var mid = uuid();//random id generator
				//model = this.meshes[i].clone(mid,null,true);
				model = this.models[i].mesh.clone("mesh"+mid);
				var mid = uuid();//random id generator
				model.position = new BABYLON.Vector3(0, 0, 3);
				model.skeleton = this.models[i].skeleton.clone("skeleton"+mid);
				//this.scene.beginAnimation(model.skeleton, 40, 60, true, 0.5); //works /// works
				break;
			}
		}
		/*
		for(var i = 0 ; i < this.meshes.length;i++){
			if(this.meshes[i].name == _name){
				var mid = uuid();//random id generator
				//model = this.meshes[i].clone(mid,null,true);
				model = this.meshes[i].clone(mid);
				var mid = uuid();//random id generator
				model.skeleton = this.meshes[i].skeleton.clone(mid);
				this.scene.beginAnimation(model, 40, 60, true, 0.5); //works /// works
				break;
			}
		}
		*/
		return model; //null or object
	}

	createbattle_prototype(){
		var self = this;
		var player = new RPGStatus({name:"player"});
		//console.log(this.assetsManager);

		var model = this.getmesh("CubeBody");
		//console.log(model);
		if(model !=null){
			model.rpgstatus = player;
			player.mesh = model;
			player.mesh.isVisible = true;
			player.mesh.position.x = 3;
			player.mesh.position.z = 0;
			player.mesh.position.y = 0;
			player.mesh.rotation.y = Math.PI/2; //90
			this.create_spaceworld_status(self.scene, player.mesh, player);
		}
		this.parties.push(player);

		var enemy = new RPGStatus({name:"enemy"});
		var model2 = this.getmesh("CubeBody");
		if(model2 !=null){
			model2.rpgstatus = enemy;
			enemy.mesh = model2;
			model2.isVisible = true;
			model2.position.x = -3;
			model2.position.z = 0;
			model2.position.y = 0;
			model2.rotation.y = Math.PI/2 * -1; //-90
			this.create_spaceworld_status(this.scene,model2,enemy);
		}
		this.enemies.push(enemy);


		//this.scenename = "sceneassets";
		//this.scenes['sceneassets'];
	}

	create_spaceworld_status(_scene, _model, _status){
		var self = this;

		var healthBarMaterial = new BABYLON.StandardMaterial("hb1mat", _scene);
		healthBarMaterial.diffuseColor = BABYLON.Color3.Green();
		healthBarMaterial.backFaceCulling = false;
		healthBarMaterial.emissiveColor = new BABYLON.Color3(0, 0.5, 0); //brighten light without light object

		var healthBarContainerMaterial = new BABYLON.StandardMaterial("hb2mat", _scene);
		healthBarContainerMaterial.diffuseColor = BABYLON.Color3.Blue();
		healthBarContainerMaterial.backFaceCulling = false;
		healthBarContainerMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.5); //brighten light without light object

		var dynamicTexture = new BABYLON.DynamicTexture("dt1", 512, _scene, true);
		dynamicTexture.hasAlpha = true;

		var healthBarTextMaterial = new BABYLON.StandardMaterial("hb3mat", _scene);
		healthBarTextMaterial.diffuseTexture = dynamicTexture;
		healthBarTextMaterial.backFaceCulling = false;
		healthBarTextMaterial.diffuseColor = BABYLON.Color3.Green();
		healthBarTextMaterial.emissiveColor = new BABYLON.Color3(0, 0.5, 0); //brighten light without light object

		var healthBarContainer = BABYLON.MeshBuilder.CreatePlane("hb2", { width: 2, height: .5, subdivisions: 4 }, _scene);
		var healthBar = BABYLON.MeshBuilder.CreatePlane("hb1", {width:2, height:.5, subdivisions:4}, _scene);

		var healthBarText = BABYLON.MeshBuilder.CreatePlane("hb3", { width: 2, height: 2, subdivisions: 4 }, _scene);
		healthBarText.material = healthBarMaterial;

		healthBarContainer.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

		healthBar.renderingGroupId = 1;
		healthBarText.renderingGroupId = 1;
		healthBarContainer.renderingGroupId = 1;

		healthBar.position = new BABYLON.Vector3(0, 0, -.01);			// Move in front of container slightly.  Without this there is flickering.
		healthBarContainer.position = new BABYLON.Vector3(0, 3, 0);     // Position above player.
		healthBarText.position = new BABYLON.Vector3(1.5, -.4, 0);

		healthBar.parent = healthBarContainer;
		healthBarContainer.parent = _model;
		healthBarText.parent = healthBarContainer;

		healthBar.material = healthBarMaterial;
		healthBarContainer.material = healthBarContainerMaterial;
		healthBarText.material = healthBarTextMaterial;

		//console.log(healthBar.material);
		//console.log(healthBarContainer);
		//console.log(healthBarText);

		var alive = true;
		var alpha = 3;
		var healthPercentage = 100;

		var status = _status;

		self.engine.runRenderLoop(function() {

			if (alive) {
				healthPercentage = (status.health /status.maxhealth) * 100;
				//console.log(healthPercentage);
				healthBar.scaling.x = healthPercentage / 100;
				healthBar.position.x =  (1 - (healthPercentage / 100)) * -1;

				if (healthBar.scaling.x < 0) {
					//alive = false;
					//healthPercentage = 100;
					alpha = 3;
					healthBarTextMaterial.diffuseColor = BABYLON.Color3.Green();
					healthBarMaterial.diffuseColor = BABYLON.Color3.Green();
				}
				else if (healthBar.scaling.x < .5) {
					healthBarMaterial.diffuseColor = BABYLON.Color3.Yellow();
					healthBarTextMaterial.diffuseColor = BABYLON.Color3.Yellow();
				}
				else if (healthBar.scaling.x < .3) {
					healthBarMaterial.diffuseColor = BABYLON.Color3.Red();
					healthBarTextMaterial.diffuseColor = BABYLON.Color3.Red();
				}

				//
				// Display Health Percentage.
				// - Only update display if whole number.
				//
				if (Math.round(healthPercentage) == healthPercentage) {
					var textureContext = dynamicTexture.getContext();
					var size = dynamicTexture.getSize();
					var text = healthPercentage + "%";

					textureContext.clearRect(0, 0, size.width, size.height);

					textureContext.font = "bold 120px Calibri";
					var textSize = textureContext.measureText(text);
					textureContext.fillStyle = "white";
					textureContext.fillText(text,(size.width - textSize.width) / 2,(size.height - 120) / 2);

					dynamicTexture.update();
				}
				//healthPercentage -= .5;
				alpha += 0.01;
			}
		});
	}


	create2DHUD(){
		this.hudcanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
			enableInteraction: true//,
		});
		//console.log(this.hudcanvas);
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
		var self = this;
		console.log("action player attack ...");
		console.log(  this.parties[0].mesh.uniqueId   );
		self.scene.beginAnimation(this.parties[0].mesh.skeleton, 40, 60, true, 0.5); //works /// works
	}

	actionenemyattack(){
		var self = this;
		console.log("action enemy attack ...");
		self.scene.beginAnimation(this.enemies[0].mesh.skeleton, 40, 60, true, 0.5); //works /// works
	}

	actionmove(){
		console.log("action move ...");
		console.log(this.parties[0]);
	}
	actionescape(){
		console.log("action escape ...");
		console.log(this.parties[0]);
	}

	create2D_BattleHUD(){
		var self = this;
		//button
		this.AddButton(this.hudcanvas,'button_escape','Escape',10,(22*0+10), ()=>{self.actionescape();});
		this.AddButton(this.hudcanvas,'button_item','Items',10,(22*1+10), ()=>{self.openitem();});
		this.AddButton(this.hudcanvas,'button_skills','Skills',10,(22*2+10), ()=>{self.openskills();});
		this.AddButton(this.hudcanvas,'button_move','Move',10,(22*3+10), ()=>{self.openitem();});
		this.AddButton(this.hudcanvas,'button_attack','Attack',10,(22*4+10), ()=>{self.actionattack();});

		this.AddButton(this.hudcanvas,'button_attack','Enemy Attack',150,(22*4+10), ()=>{self.actionenemyattack();});

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



	init(){
		super.init();
		console.log("init [babylonjs_game]");
		this.createscene_assets();
	}

	setup_game(){
		var self = this;
		console.log("setup game!");
		console.log(this.engine);
		console.log(BABYLON);

		this.create2DHUD();
		this.create2D_BattleHUD();

		//BABYLON.DebugLayer().show();
		//this.scene.debugLayer.show(false);
		//this.scene.debugLayer.show(true);
		this.createbattle_prototype();

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
