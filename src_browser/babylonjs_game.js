

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};


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

//console.log(uuid());

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
		this.targets = [];

		//this.isfinishanimation = false;
		//this.isactionfinish = false;
		this.isturnfinish = false;
		this.bskipturn = false;

		if(args !=null){
			if(args['attack'] !=null ){
				this.attack = args['attack'];
			}
			if(args['defense'] !=null ){
				this.defense = args['defense'];
			}

			if(args['health'] !=null){
				this.health = args['health'];
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

		this.turns = [];
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
		//controls
		this.controllerid = 0;
		this.keys={letft:0,right:0,forward:0,back:0};
		this.moveVector = new BABYLON.Vector3(0, 0, 0);

        this.leftstickmove = false;
        this.joyleftdir = new BABYLON.Vector3(0,0,0);
        this.joylefttrigger = 0;
        this.joyrightdir = new BABYLON.Vector3(0,0,0);
        this.joyrighttrigger = 0;

	}

	createscene_assets(){
		var self = this;

		this.assetsManager = new BABYLON.AssetsManager(this.scene);

		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
		meshTask.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].position = new BABYLON.Vector3(0,2,3);
			//console.log(task.loadedMeshes[0].position);
			task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
			self.models.push({mesh:task.loadedMeshes[0],skeleton:null});
		}

		filepath = "arm_cube.babylon";
		objectname = "Cube";

		var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
		meshTask2.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
			self.models.push({mesh:task.loadedMeshes[0],skeleton:null});
		}

		this.assetsManager.onFinish = function(tasks) {
			console.log('assets loaded!');
			self.setup_game();
			self.engine.hideLoadingUI();
		};
		this.assetsManager.load();


		/*
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
		*/

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
				model.skeleton = this.models[i].mesh.skeleton.clone("skeleton"+mid);
				//model.skeleton = this.models[i].skeleton.clone("skeleton"+mid);
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
		var player = new RPGStatus({name:"player",health:10});
		//console.log(this.assetsManager);

		var model = this.getmesh("CubeBody");
		//console.log(model);
		if(model !=null){
			model.rpgstatus = player;
			console.log(player);
			player.mesh = model;
			player.mesh.isVisible = true;
			player.mesh.position.x = 3;
			player.mesh.position.z = 0;
			player.mesh.position.y = 0;
			player.mesh.rotation.y = Math.PI/2; //90
			this.create_spaceworld_status(self.scene, player.mesh, player);
		}
		this.parties.push(player);

		var enemy = new RPGStatus({name:"enemy",health:1});
		console.log(enemy);
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

		player.targets.push(enemy);
		enemy.targets.push(player);

		this.turns.push(player);
		this.turns.push(enemy);

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

    createspacecavnas2D(){
        //screenCanvas
		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
			enableInteraction: true//,
		});
	}

	create2DHUD(){
        var screencanvas_group2d = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d",
            marginAlignment: "h: left, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DHealth", x: 10, y: -32, width: 64, height: 28, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Health:", {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DMagic", x: 10, y: -64, width: 64, height: 28, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Magic:", {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 10, y: -96, width: 64, height: 28, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Stamina:", {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        //background bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 90, y: -32, width: 128, height: 28, fill: "#263238FF"
        });
        //background bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 90, y: -64, width: 128, height: 28, fill: "#263238FF"
        });
        //background bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 90, y: -96, width: 128, height: 28, fill: "#263238FF"
        });
        //foreground bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 92, y: -32, width: 124, height: 20, fill: "#64DD17FF"
        });
        //foreground bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 92, y: -64, width: 124, height: 20, fill: "#03A9F4FF"
        });
        //foreground bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 92, y: -96, width: 124, height: 20, fill: "#FF9800FF"
        });

        // RIGHT TOP
        var screencanvas_group2d_RT = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d_RT",
            marginAlignment: "h: right, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RT, id: "R2DStamina", x: -36, y: -42, width: 32, height: 32, fill: "#263238FF"
        });

        // LEFT BOTTOM
        var screencanvas_group2d_LB = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d_LB",
            marginAlignment: "h: left, v: bottom"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_LB, id: "R2DStamina", x: 8, y: 8, width: 48, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Chat:", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        // RIGHT BOTTOM
        var screencanvas_group2d_RB = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d_RB",
            marginAlignment: "h: right, v: bottom"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        var R2DEditor = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DEditor", x: -36+(64*1)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Editor", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DEditor.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DEditor clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DSettings = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DSettings", x: -36+(64*2)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Settings", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DSettings.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DSettings clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DMap = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DMap", x: -36+(64*3)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Map", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DMap.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DMap clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DSkills = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DSkills", x: -36+(64*4)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Skills", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DSkills.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DSkills clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DItems = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DItems", x: -36+(64*5)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Items", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DItems.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DItems clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DHome = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DHome", x: -36+(64*6)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Home", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DHome.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DHome clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);



	}

	actionbattle(){
		console.log("action battle ...");
		console.log(this.parties[0]);
		//check if party health is not zero for attack
		//this.opponentAttack(this.parties[0],this.enemies[0]);
		//this.opponentAttack(this.enemies[0],this.parties[0]);
		this.checkcharacter_turns();
	}

	opponentAttack(_Attack,_defender){
		console.log("opponentAttack ...");
		if(_Attack.health > 0){
			_defender.health = _defender.health - _Attack.attack;
		}
		if(_defender.health <= 0){
		 	_defender.health = 0;
		}
	}

	setupbattle(){
        console.log("set up");
	}

	createbattle(){
        console.log("create battle");
	}

	openitem(){
		console.log("open item ...");
		console.log(this.parties[0]);
	}

	openskills(){
		console.log("open skills ...");
		console.log(this.parties[0]);
	}

	actionattack(){
		//var self = this;
		//console.log("action player attack ...");
		//console.log(  this.parties[0].mesh.uniqueId   );
		//self.scene.beginAnimation(this.parties[0].mesh.skeleton, 0, 10, false, 0.5); //works /// works
		//this.opponentAttack(this.parties[0],this.enemies[0]);
		//this.opponentAttack(this.enemies[0],this.parties[0]);
		//this.checkcharacter_turns();
	}

	actionenemyattack(){
		var self = this;
		console.log("action enemy attack ...");
		self.scene.beginAnimation(this.enemies[0].mesh.skeleton, 0, 10, false, 0.5,()=>{
			console.log("finish attack");
			self.opponentAttack(this.enemies[0],this.parties[0]);
			self.enemies[0].isturnfinish = true;

			self.scene.beginAnimation(this.parties[0].mesh.skeleton, 30, 40, false, 0.5,()=>{
				self.checkcharacters_battle();
			});

		}); //works
		//this.opponentAttack(this.parties[0],this.enemies[0]);

	}

	actionmove(){
		console.log("action move ...");
		//console.log(this.parties[0]);
	}

	actionescape(){
		console.log("action escape ...");
		//console.log(this.parties[0]);
	}

	playattackaction(){
        console.log("player attack action");
	}

	characteraction_turn(currentcharacter){
		var self = this;
		console.log("action enemy attack ...");
		//attack
		if(currentcharacter.health <= 0){
			currentcharacter.isturnfinish = true;
			self.checkcharacters_battle();
		}else{
			if(currentcharacter.targets[0].health <= 0){
				//console.log("DEFENCE FALSE???");
				//make sure the target is skip if health is zero
				currentcharacter.isturnfinish = true;
				currentcharacter.targets[0].isturnfinish = true;
				console.log(currentcharacter.targets[0]);
				//for(var i = 0; i < this.turns.length;i++){
					//if(this.turns[i] == currentcharacter.targets[0]){
						//this.turns[i].isturnfinish = true;
						//break;
					//}
				//}
				self.checkcharacters_battle();
			}else{
				self.scene.beginAnimation(currentcharacter.mesh.skeleton, 0, 10, false, 0.5,()=>{
					console.log("finish attack");
					self.opponentAttack(currentcharacter,currentcharacter.targets[0]);
					currentcharacter.isturnfinish = true;
					//being hit
					self.scene.beginAnimation(currentcharacter.targets[0].mesh.skeleton, 30, 40, false, 0.5,()=>{
						self.checkcharacters_battle();
					});

				}); //works
			}
		}
	}

	checkcharacter_turns(){
		for(var i = 0; i < this.turns.length; i++){
			if( this.turns[i].isturnfinish == false){
				console.log("start current turn character");
				console.log(this.turns[i].name);
				this.characteraction_turn(this.turns[i]);
				break;
			}
		}
	}

	checkcharacters_battle(){
		console.log("checking...");
		var count = 0;
		var bfinishturns = false;

		for(var i = 0; i < this.turns.length; i++){
			console.log(this.turns[i].name + ":" + this.turns[i].isturnfinish);
			if( this.turns[i].isturnfinish == true){
				count += 1;
			}
		}

		if(count == this.turns.length){
			bfinishturns = true;
		}
		//console.log(count + ":" + this.turns.length);

		console.log("bfinishturns:" + bfinishturns);
		if(bfinishturns){
			console.log("done!");
			this.battle_turnreset();
		}else{
			console.log("next action attack for character!");
			this.checkcharacter_turns();
		}
		bfinishturns= null;
		count = null;
	}

	battle_turnreset(){
		for(var pi = 0; pi < this.parties.length; pi++){
			if(this.parties[pi].isturnfinish == true){
				this.parties[pi].isturnfinish = false;
			}
		}

		for(var pi = 0; pi < this.enemies.length; pi++){
			if(this.enemies[pi].isturnfinish == true){
				this.enemies[pi].isturnfinish = false;
			}
		}
	}

	create2D_BattleHUD(){
		var self = this;
		//button
		this.AddButton(this.screencanvas,'button_escape','Escape',10,(22*0+10), ()=>{self.actionescape();});
		this.AddButton(this.screencanvas,'button_item','Items',10,(22*1+10), ()=>{self.openitem();});
		this.AddButton(this.screencanvas,'button_skills','Skills',10,(22*2+10), ()=>{self.openskills();});
		this.AddButton(this.screencanvas,'button_move','Move',10,(22*3+10), ()=>{self.openitem();});
		this.AddButton(this.screencanvas,'button_attack','Attack',10,(22*4+10), ()=>{self.actionattack();});

		this.AddButton(this.screencanvas,'button_attack','Enemy Attack',150,(22*4+10), ()=>{self.actionenemyattack();});

		this.AddButton(this.screencanvas,'button_battle','Battle',10,(22*5+10), ()=>{self.actionbattle();});
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

	create_movement(){
		var self = this;

		var camera = new BABYLON.ArcRotateCamera("arcCamera1",0,0,10,BABYLON.Vector3.Zero(),this.scene);
        camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
        camera.attachControl(this.canvas,false);
        camera.setPosition(new BABYLON.Vector3(0,5,5));
		this.scene.activeCamera.attachControl(self.canvas);
		this.scene.activeCamera = camera;
        //console.log(camera);
        this.thirdcamera = camera;

		//var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
		//var boxMaterial = new BABYLON.StandardMaterial("material", this.scenes[this.scenename]);
		//boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
		//box.material = boxMaterial;
		//console.log(box);
        //var model = this.getmesh("CubeBody");
        var Material = new BABYLON.StandardMaterial("material", this.scene);
        Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        var model = this.getmesh("CubeBody");
        model.isVisible = true;
        var objphysics = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, this.scene);
        objphysics.isVisible = false;
        model.objphysics = objphysics;

		this.controllerid = model.id;
        //var movestep = .05;
        //console.log(model);

        objphysics.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, move:true, restitution: 0, mass:1, friction:10});
        objphysics.position.y =4;
        objphysics.showBoundingBox = true;
        //sphere.position = camera.getFrontPosition(12); //Sphere has 12 unit front the camera.
        camera.setTarget(model);
        this.model = model;

        var keys = self.keys;
        //var leftstickmove = self.leftstickmove;

        //console.log(model.id);
        //console.log(model.uniqueId);

        var hit = BABYLON.Mesh.CreateBox("hit", 0.5, this.scene);
        hit.material = Material;
        model.facedir = 0;
        var currentAngle = 0;
        model.update=function(){
            //console.log(leftstickmove);
            //console.log(this.uniqueId);
            if(self.controllerid == this.id){
                //vector forward direction
                //this breaks
                var forward = camera.getFrontPosition(1).subtract(camera.position).normalize(); //does not work bug
                //this works
                //var target = model.position.clone();
                //var forward = target.subtract(camera.position).normalize();
                var needMove = false;
                forward.y = 0;
                //get rotation dir
                //var diffAngle = Math.atan2(-forward.x,-forward.z);
                var diffAngle = Math.atan2(forward.x,forward.z);
                //var currentAngle = 0;
                if(keys.left){
                    currentAngle = diffAngle + (Math.PI/2);
                    //model.rotation.y = currentAngle;
                    needMove = true;
				}
                if(keys.right){
                    currentAngle = diffAngle - (Math.PI/2);
                    //model.rotation.y = currentAngle;
                    needMove = true;
				}
				if(keys.forward){
                    //console.log(Math.degrees(  diffAngle ));
                    currentAngle = diffAngle + (Math.PI);;
                    //model.rotation.y = currentAngle;
                    needMove = true;
				}
                if(keys.back){
                    currentAngle = diffAngle ;
                    //model.rotation.y = diffAngle;
                    needMove = true;
                }

                //gamepad
                if(self.leftstickmove){
                    var joyangle = Math.atan2(self.joyleftdir.x,-self.joyleftdir.z);
                    currentAngle = diffAngle + joyangle + Math.PI;
                    model.rotation.y = currentAngle;
                    var rot = diffAngle + joyangle;
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 10), BABYLON.Matrix.RotationY(rot));
                    //model.position.addInPlace(v2);
                    model.objphysics.physicsImpostor.setLinearVelocity(v2);
                }

                if (needMove) {
                    //model.rotate(BABYLON.Axis.Y, 1);
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -10), BABYLON.Matrix.RotationY(currentAngle));
                    model.objphysics.physicsImpostor.setLinearVelocity(v2);
                    //console.log(model.physicsImpostor);
                    model.rotation.y = currentAngle;
                    v2 = null;
                    model.facedir = currentAngle;
                }


                var objpos = model.objphysics.position.clone();
                objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                model.position = objpos;

                if (needMove == false) {
                    model.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                }

                diffAngle = null;
                currentAngle = null;
                forward = null;
			}
		}

        model.interact=function(){
            //console.log("???" + model.facedir);
            var fdir = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -2), BABYLON.Matrix.RotationY(model.facedir));
            var rayPick = new BABYLON.Ray(model.objphysics.position, fdir,2);
            var meshFound = self.scene.pickWithRay(rayPick, function (item) {
                //console.log(item.name);
                if (item.name.indexOf("box") == 0)
                    return true;
                else
                    return false;
            });
            //console.log(meshFound);
            if (meshFound != null && meshFound.pickedPoint != null) {
                console.log("found!");
                //console.log(hit);
                hit.position = meshFound.pickedPoint;
                //if (!divAlert) {
                //divAlert = document.createElement("div");
                //document.body.appendChild(divAlert);
                //divAlert.innerText = (meshFound.pickedMesh.name + " hit at " + meshFound.pickedPoint);
              //}
          }else{
              //console.log("not found!");
          }
            rayPick=null;
            fdir=null;
        }
	}

    create_npc(args = {}){
        var self = this;
        var tmpmodel = this.getmesh("CubeBody");
        tmpmodel.isVisible = true;
        var objphysics = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, this.scene);
        //objphysics.isVisible = false;
        tmpmodel.objphysics = objphysics;

        console.log(tmpmodel.id);
        console.log(tmpmodel.uniqueId);

        objphysics.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, move:true, restitution: 0, mass:1, friction:10});
        objphysics.position.y =4;
        objphysics.position.z =4;
        objphysics.showBoundingBox = true;

        var keys = self.keys;
        tmpmodel.facedir = 0;
        var currentAngle = 0;

        tmpmodel.update=function(){
            //console.log(leftstickmove);
            //console.log(this.uniqueId);
            var needMove = false;
            if(self.controllerid == this.id){
                //vector forward direction
                //this breaks
                var forward = self.scene.activeCamera.getFrontPosition(1).subtract(self.scene.activeCamera.position).normalize();
                forward.y = 0;
                //get rotation dir
                //var diffAngle = Math.atan2(-forward.x,-forward.z);
                var diffAngle = Math.atan2(forward.x,forward.z);
                //var currentAngle = 0;
                if(keys.left){
                    currentAngle = diffAngle + (Math.PI/2);
                    needMove = true;
				}
                if(keys.right){
                    currentAngle = diffAngle - (Math.PI/2);
                    needMove = true;
				}
				if(keys.forward){
                    currentAngle = diffAngle + (Math.PI);;
                    needMove = true;
				}
                if(keys.back){
                    currentAngle = diffAngle ;
                    needMove = true;
                }

                //gamepad
                if(self.leftstickmove){
                    var joyangle = Math.atan2(self.joyleftdir.x,-self.joyleftdir.z);
                    currentAngle = diffAngle + joyangle + Math.PI;
                    tmpmodel.rotation.y = currentAngle;
                    var rot = diffAngle + joyangle;
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 10), BABYLON.Matrix.RotationY(rot));
                    tmpmodel.objphysics.physicsImpostor.setLinearVelocity(v2);
                }

                if (needMove) {
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -10), BABYLON.Matrix.RotationY(currentAngle));
                    tmpmodel.objphysics.physicsImpostor.setLinearVelocity(v2);
                    tmpmodel.rotation.y = currentAngle;
                    v2 = null;
                    tmpmodel.facedir = currentAngle;
                }

                var objpos = tmpmodel.objphysics.position.clone();
                objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                tmpmodel.position = objpos;

                if (needMove == false) {
                    tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                }

                diffAngle = null;
                currentAngle = null;
                forward = null;
			}else{
                if (needMove == false) {
                    tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                }

                var objpos = tmpmodel.objphysics.position.clone();
                objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                tmpmodel.position = objpos;
            }
		}

        tmpmodel.interact=function(){
            //console.log("???" + model.facedir);
            var fdir = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -2), BABYLON.Matrix.RotationY(tmpmodel.facedir));
            var rayPick = new BABYLON.Ray(tmpmodel.objphysics.position, fdir,2);
            var meshFound = self.scene.pickWithRay(rayPick, function (item) {
                //console.log(item.name);
                if (item.name.indexOf("box") == 0)
                    return true;
                else
                    return false;
            });
            //console.log(meshFound);
            if (meshFound != null && meshFound.pickedPoint != null) {
                console.log("found!");
                //console.log(hit);
                hit.position = meshFound.pickedPoint;
                //if (!divAlert) {
                //divAlert = document.createElement("div");
                //document.body.appendChild(divAlert);
                //divAlert.innerText = (meshFound.pickedMesh.name + " hit at " + meshFound.pickedPoint);
                //}
          }else{
              //console.log("not found!");
          }
            rayPick=null;
            fdir=null;
        }

        //var name = args['name'] || "none";
        //console.log(name)

        return tmpmodel;
    }

	create_input(){
        var self = this;

		//this.keys={letft:0,right:0,forward:0,back:0};
		window.addEventListener("keydown", handleKeyDown, false);
		window.addEventListener("keyup", handleKeyUp, false);
		function handleKeyDown(evt){
            //console.log(evt.keyCode);
            if (evt.keyCode==69){//E
                if(self.model !=null){
                    if(typeof self.model.interact === 'function'){
                        self.model.interact();
                    }
                }
            }

            if (evt.keyCode==65){//A
				self.keys.left=1;
				//console.log("left");
				//self.render_scene(self.scene);
				//self.scenename = "default";
				//self.moveVector.z = movestep;
				//self.box.moveWithCollisions(self.moveVector);
			}
			if (evt.keyCode==68){//D
                self.keys.right=1;
				//console.log("right");
				//self.moveVector.z = -movestep;
				//self.box.moveWithCollisions(self.moveVector);
				//self.render_scene(self.sceneassets);
				//self.scenename = "sceneassets";
			}
			if (evt.keyCode==87){//W
				self.keys.forward=1;
				//console.log("up");
				//self.stop_render();
				//self.engine.hideLoadingUI();
			}
			if (evt.keyCode==83){//S
				self.keys.back=1;
				//console.log("down");
                //console.log(self.thirdcamera);
				//self.engine.displayLoadingUI();
			}
		}

		function handleKeyUp(evt){
			if (evt.keyCode==65){
				self.keys.left=0;
			}
			if (evt.keyCode==68){
				self.keys.right=0;
			}
			if (evt.keyCode==87){
				self.keys.forward=0;
			}
			if (evt.keyCode==83){
				self.keys.back=0;
			}
		}
	}

    create_gamepadinput(){
        var self = this;
        var gamepadConnected = function (gamepad) {
            console.log(gamepad);
            //console.log(gamepad.gamepad);
            if(typeof gamepad.onlefttriggerchanged === 'function'){
                gamepad.onlefttriggerchanged(function (values) {
                    console.log(values);
                });
            }else{
                console.log("left trigger function doesn't exist");
            }
            if(typeof gamepad.onrighttriggerchanged === 'function'){
                gamepad.onrighttriggerchanged(function (values) {
                    console.log(values);
                });
            }else{
                console.log("right trigger function doesn't exist");
            }


            gamepad.onleftstickchanged(function (values) {
    			if (values.y < 0){//sphere.chooseDirection(0, 1);
                }
    			if (values.y > 0){//sphere.chooseDirection(1, 1);
                }
                if (values.x < 0){//sphere.chooseDirection(2, 1);
                }
    			if (values.x > 0){//sphere.chooseDirection(3, 1);
                }
                self.leftstickmove = false;
    			if (values.y < 0.1 && values.y > -0.1) {
    				//sphere.chooseDirection(0, 0);
    				//sphere.chooseDirection(1, 0);
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                    self.joyleftdir.z = values.y;
                    self.leftstickmove = true;
                }
    			if (values.x < 0.1 && values.x > -0.1) {
    				//sphere.chooseDirection(2, 0);
    				//sphere.chooseDirection(3, 0);
                    //console.log("x: ",values.x, " y: " , values.y );
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                    self.joyleftdir.x = values.x;
                    self.leftstickmove = true;
                }
                //console.log("x: ",values.x, " y: " , values.y );
    		});

            gamepad.onrightstickchanged(function (values) {
    			if (values.y < 0){//sphere.chooseDirection(0, 1);
                }
    			if (values.y > 0){//sphere.chooseDirection(1, 1);
                }
    			if (values.x < 0){//sphere.chooseDirection(2, 1);
                }
    			if (values.x > 0){//sphere.chooseDirection(3, 1);
                }

    			if (values.y < 0.1 && values.y > -0.1) {
    				//sphere.chooseDirection(0, 0);
    				//sphere.chooseDirection(1, 0);
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                    self.joyrightdir.y = values.y;
                }
    			if (values.x < 0.1 && values.x > -0.1) {
    				//sphere.chooseDirection(2, 0);
    				//sphere.chooseDirection(3, 0);
                    //console.log("x: ",values.x, " y: " , values.y );
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                    self.joyrightdir.x = values.x;
                }
                //console.log("x: ",values.x, " y: " , values.y );
    		});

    		gamepad.onbuttondown(function (buttonIndex) {
    			//alert(buttonIndex);
                //console.log(buttonIndex);
    		});

    		gamepad.onbuttonup(function (buttonIndex) {

    		});

    	};

        var gamepads = new BABYLON.Gamepads(gamepadConnected);

    	// for google chrome start the monitoring if navigator.getGamepads() has a gamepad at index 0 for example
    	// this is because chrome doesn't seem to support the gamepadconnected/gamepaddisconnected events perfectly yet,
    	// it only detects the gamepad if you plug it in again but not if it is already connected
    	if(navigator.getGamepads()[0]){
    		gamepads._startMonitoringGamepads();
    	}
    }

	PickObject(){
		//When pointer down event is raised
	    this.scene.onPointerDown = function (evt, pickResult) {
	        // if the click hits the ground object, we change the impact position
	        if (pickResult.hit) {
	            //impact.position.x = pickResult.pickedPoint.x;
	            //impact.position.y = pickResult.pickedPoint.y;
				//console.log("HIT"+pickResult.pickedPoint);
	        }
	    };

	}

	simple_scene(){
        var scene = this.scene;
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

        var box1 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box1.position.x = -5;
        box1.position.y = 1;
        //box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, restitution: 1, mass:0, friction:0.5});
        box1.showBoundingBox = true;
        var box2 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box2.position.x = 5;
        box2.position.y = 1;
        //box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, restitution: 1, mass:0, friction:0.5});
        box2.showBoundingBox = true;
        //https://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter#box
		// Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    	//var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, this.scene);
        var ground = BABYLON.MeshBuilder.CreateBox("ground", {height:1,width:20,depth:20}, scene);
        //ground.scale.x = 100;
        //ground.scale.y = 100;
        ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, restitution: 0,  mass:0, friction:10});
        ground.showBoundingBox = true;
	}

	//override function...
	start_scenerender(){
		var self = this;
		this.engine.runRenderLoop(function() {
			if(self.scenes[self.scenename] !=null){
				self.scenes[self.scenename].render();
				for(var i =0; i < self.scenes[self.scenename].meshes.length;i++){
					if(typeof self.scenes[self.scenename].meshes[i].update === 'function'){
						self.scenes[self.scenename].meshes[i].update();
					}
				}
			}
		});
	}

	init(){
		super.init();
		console.log("init [babylonjs_game]");
        this.createspacecavnas2D();
		this.createscene_assets();
	}

	setup_game(){
		var self = this;
		console.log("setup game!");
		console.log(this.engine);
        console.log(this.scene);
		console.log(BABYLON);

        this.init_phsics();

		this.create2DHUD();
		//this.create2D_BattleHUD();
		//BABYLON.DebugLayer().show();
		//this.scene.debugLayer.show(false);
		//this.scene.debugLayer.show(true);
		//this.createbattle_prototype();
		this.create_input();
        this.create_gamepadinput();
		this.create_movement();
		this.PickObject();

		this.simple_scene();

        this.create_npc();

	}
}
