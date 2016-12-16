'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//RFC Type 4 (random) schema
var uuid = function uuid() {
	var buf = new Uint32Array(4);
	window.crypto.getRandomValues(buf);
	var idx = -1;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (function (c) {
		idx++;
		var r = buf[idx >> 3] >> idx % 8 * 4 & 15;
		var v = c == 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	}));
};

console.log(uuid());

var ObjectRPGID = function ObjectRPGID(args) {
	_classCallCheck(this, ObjectRPGID);

	this.hashid = "";
	this.id = "";
	this.name = "none";
	this.description = "none";
	if (args != null) {
		if (args['name'] != null) {
			this.name = args['name'];
		}
		if (args['id'] != null) {
			this.name = args['id'];
		}
		if (args['hashid'] != null) {
			this.name = args['hashid'];
		}
	}
};

var RPGStats = function RPGStats(args) {
	_classCallCheck(this, RPGStats);

	this.str = 0;
	this.vit = 0;
	this.dex = 0;
	this.agi = 0;
	this.int = 0;

	this.wisdom = 0;
	this.charisma = 0;
	this.luck = 0;

	this.perception = 0;
};

var RPGCondition = (function (_ObjectRPGID) {
	_inherits(RPGCondition, _ObjectRPGID);

	function RPGCondition(args) {
		_classCallCheck(this, RPGCondition);

		var _this = _possibleConstructorReturn(this, (RPGCondition.__proto__ || Object.getPrototypeOf(RPGCondition)).call(this));

		_this.params = [];
		return _this;
	}

	return RPGCondition;
})(ObjectRPGID);

var RPGSkill = (function (_ObjectRPGID2) {
	_inherits(RPGSkill, _ObjectRPGID2);

	function RPGSkill(args) {
		_classCallCheck(this, RPGSkill);

		return _possibleConstructorReturn(this, (RPGSkill.__proto__ || Object.getPrototypeOf(RPGSkill)).call(this));
	}

	return RPGSkill;
})(ObjectRPGID);

var RPGItem = (function (_ObjectRPGID3) {
	_inherits(RPGItem, _ObjectRPGID3);

	function RPGItem(args) {
		_classCallCheck(this, RPGItem);

		return _possibleConstructorReturn(this, (RPGItem.__proto__ || Object.getPrototypeOf(RPGItem)).call(this));
	}

	return RPGItem;
})(ObjectRPGID);

var RPGEquip = (function (_RPGItem) {
	_inherits(RPGEquip, _RPGItem);

	function RPGEquip(args) {
		_classCallCheck(this, RPGEquip);

		var _this4 = _possibleConstructorReturn(this, (RPGEquip.__proto__ || Object.getPrototypeOf(RPGEquip)).call(this));

		_this4.stats = new Stats();
		_this4.params = [];
		return _this4;
	}

	return RPGEquip;
})(RPGItem);

var RPGWeapon = (function (_RPGEquip) {
	_inherits(RPGWeapon, _RPGEquip);

	function RPGWeapon(args) {
		_classCallCheck(this, RPGWeapon);

		var _this5 = _possibleConstructorReturn(this, (RPGWeapon.__proto__ || Object.getPrototypeOf(RPGWeapon)).call(this));

		_this5.stats = new RPGStats();
		_this5.params = [];
		return _this5;
	}

	return RPGWeapon;
})(RPGEquip);

var RPGStatus = (function (_ObjectRPGID4) {
	_inherits(RPGStatus, _ObjectRPGID4);

	function RPGStatus(args) {
		_classCallCheck(this, RPGStatus);

		var _this6 = _possibleConstructorReturn(this, (RPGStatus.__proto__ || Object.getPrototypeOf(RPGStatus)).call(this, args));

		_this6.stats = new RPGStats();

		_this6.health = 5;
		_this6.maxhealth = 5;

		_this6.magic = 0;
		_this6.magicmax = 0;

		_this6.stamina = 100;
		_this6.maxstamina = 100;

		_this6.psyche = 100;
		_this6.maxpsyche = 100;

		_this6.conditions = [];
		_this6.skills = [];
		_this6.inventory = [];
		_this6.equipments = [];

		_this6.speed = 1;
		_this6.criticalhit = 1;

		_this6.attack = 1;
		_this6.defense = 0;

		_this6.magicattack = 0;
		_this6.magicdefense = 0;

		_this6.totalattack = 1;
		_this6.totaldefense = 0;

		_this6.totalmagicattack = 0;
		_this6.totalmagicdefense = 0;

		_this6.queryaction = ""; //attack, skill
		_this6.target = null;
		_this6.targets = null;
		_this6.targettype = "single"; //single, multiples, selected, area
		_this6.readyaction = false;
		_this6.finishaction = false;

		_this6.mesh = null;
		_this6.isdead = false;

		if (args != null) {
			if (args['attack'] != null) {
				_this6.attack = args['attack'];
			}
			if (args['defense'] != null) {
				_this6.defense = args['defense'];
			}
		}
		return _this6;
	}

	return RPGStatus;
})(ObjectRPGID);

//===============================================
//
//===============================================

var Babylonjs_game = (function (_Babylonjsbes) {
	_inherits(Babylonjs_game, _Babylonjsbes);

	function Babylonjs_game(args) {
		_classCallCheck(this, Babylonjs_game);

		var _this7 = _possibleConstructorReturn(this, (Babylonjs_game.__proto__ || Object.getPrototypeOf(Babylonjs_game)).call(this, args));

		_this7.materials = [];
		_this7.textures = [];
		_this7.meshes = [];

		_this7.characters = [];
		_this7.dimensionstorage = [];

		_this7.companions = []; //those who join in your party that travel together
		_this7.squads = [];

		_this7.friends = []; //battle mode?
		_this7.foes = []; //battle mode?

		_this7.parties = []; //who in the party //battle mode?
		_this7.enemies = []; //threat if player attack or in battle actions //battle mode?
		_this7.npcs = []; //local villagers

		_this7.scene_battle;
		_this7.scene_dimension_homebase;
		_this7.scene_global_map;
		_this7.scene_world_map;
		_this7.scene_local_map;

		//this.scenename = "default";
		//this.scenes = [];
		//this.currentscene;

		_this7.sceneassets;
		_this7.assetsManager;
		_this7.config_assets;
		//console.log(this.parties);
		//console.log("init babylon game");
		return _this7;
	}

	_createClass(Babylonjs_game, [{
		key: 'create_hud2d3d',
		value: function create_hud2d3d() {
			//super.create_hud();
			var canvas = new BABYLON.WorldSpaceCanvas2D(this.scene, new BABYLON.Size(100, 100), {
				id: "WorldSpaceCanvas",
				worldPosition: new BABYLON.Vector3(0, 0, 0),
				worldRotation: BABYLON.Quaternion.RotationYawPitchRoll(Math.PI / 4, Math.PI / 4, 0),
				renderScaleFactor: 8,
				enableInteraction: true,
				backgroundFill: "#C0C0C040",
				//backgroundRoundRadius: 80,
				children: [new BABYLON.Text2D("World Space Canvas", { fontName: "30pt Arial", marginAlignment: "h: center, v: bottom" })]
			});

			// Create the "click me!" button
			var buttonRect = new BABYLON.Rectangle2D({ parent: canvas, id: "button", x: 100, y: 100, width: 200, height: 80, fill: "#40C040FF",
				//roundRadius: 10,
				children: [new BABYLON.Text2D("Click Me!", { fontName: "30pt Arial", marginAlignment: "h: center, v: center" })] });

			// Create the "Awesome!" button
			var button2Rect = new BABYLON.Rectangle2D({ parent: canvas, id: "button2", x: 420, y: 100, width: 200, height: 80, fill: "#4040C0FF",
				//roundRadius: 10,
				//isVisible: false,
				children: [new BABYLON.Text2D("Awesome!", { fontName: "30pt Arial", marginAlignment: "h: center, v: center" })] });
			// Add an observable to the "Click me!" button, watch for click the display/hide the second button
			buttonRect.pointerEventObservable.add((function (d, s) {
				//button2Rect.levelVisible = !button2Rect.levelVisible;
				console.log("click");
				this.scene.render();
			}), BABYLON.PrimitivePointerInfo.PointerUp);

			button2Rect.pointerEventObservable.add((function (d, s) {
				//button2Rect.levelVisible = !button2Rect.levelVisible;
				console.log("click2");
				this.scene2.render();
			}), BABYLON.PrimitivePointerInfo.PointerUp);
		}
	}, {
		key: 'create_hud2d',
		value: function create_hud2d() {
			var _scene = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var self = this;
			if (_scene == null) {
				_scene = this.scene;
			}

			console.log(_scene);

			this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(_scene, {
				id: "ScreenCanvas",
				size: new BABYLON.Size(300, 100),
				backgroundFill: "#4040408F",
				enableInteraction: true,
				//backgroundRoundRadius: 50,
				children: [new BABYLON.Text2D("Hello World!", {
					id: "text",
					marginAlignment: "h: center, v:center",
					fontName: "20pt Arial"
				})]
			});

			// Create the "click me!" button
			var buttonRect = new BABYLON.Rectangle2D({ parent: this.screencanvas, id: "button", x: 0, y: 0, width: 100, height: 20, fill: "#40C040FF",
				//roundRadius: 10,
				children: [new BABYLON.Text2D("Scene 1!", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })] });
			var button2Rect = new BABYLON.Rectangle2D({ parent: this.screencanvas, id: "button2", x: 100, y: 10, width: 100, height: 20, fill: "#4040C0FF",
				//roundRadius: 10,
				//isVisible: false,
				children: [new BABYLON.Text2D("Scene 2!", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })] });

			buttonRect.pointerEventObservable.add((function (d, s) {
				//button2Rect.levelVisible = !button2Rect.levelVisible;
				console.log("click");
				//remove function call from loop scene?
				//self.engine.runRenderLoop(function() {
				//self.scene.render();
				//});
			}), BABYLON.PrimitivePointerInfo.PointerUp);

			button2Rect.pointerEventObservable.add((function (d, s) {
				console.log("click");
				//remove function call from loop scene?
				//self.engine.runRenderLoop(function() {
				//newScene.render();
				//self.scene2.render();
				//});
			}), BABYLON.PrimitivePointerInfo.PointerUp);
		}
	}, {
		key: 'loadscene_extbabylon',
		value: function loadscene_extbabylon() {
			var self = this;

			BABYLON.SceneLoader.Load("/assets/", "cube.babylon", this.engine, (function (newScene) {
				// Wait for textures and shaders to be ready
				newScene.executeWhenReady((function () {
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
				}));
			}), (function (progress) {
				// To do: give progress feedback to user
				console.log("progress");
				//console.log(progress);
			}));
		}
	}, {
		key: 'appendscene_extbabylon',
		value: function appendscene_extbabylon() {
			//http://doc.babylonjs.com/classes/2.4
			//http://doc.babylonjs.com/classes/2.4/SceneLoader
			//append
			var self = this;
			BABYLON.SceneLoader.Append("/assets/", "cube.babylon", this.scene, (function (newScene) {
				// Wait for textures and shaders to be ready
				newScene.executeWhenReady((function () {
					console.log("scene ready!");
					console.log(self.scene);
				}));
			}), (function (progress) {
				// To do: give progress feedback to user
				console.log("progress");
				//console.log(progress);
			}));
		}
	}, {
		key: 'appendsceneanim_extbabylon',
		value: function appendsceneanim_extbabylon() {
			//http://doc.babylonjs.com/classes/2.4
			//http://doc.babylonjs.com/classes/2.4/SceneLoader
			//append
			var self = this;
			//block_character.babylon
			//BABYLON.SceneLoader.Append("/assets/", "cube.babylon", this.scene, function (newScene) {
			//BABYLON.SceneLoader.Append("/assets/", "arm_cube.babylon", this.scene, function (newScene) {
			BABYLON.SceneLoader.Append("/assets/", "block_character.babylon", this.scene, (function (newScene) {

				// Wait for textures and shaders to be ready
				newScene.executeWhenReady((function () {
					console.log("scene ready!");
					console.log(self.scene);
					//blender export all animation to single frame to babylon file.
					//BABYLON.PlayAnimationAction(newScene.meshes[0], target, 0, 4, loop, condition)
					var anims = newScene.beginAnimation(newScene.meshes[0], 0, 60, true, 0.5); //works
					//console.log(anims);

					//console.log(newScene.Animatables );//activete animations in the scene
					//var anims = newScene.beginDirectAnimation(newScene.meshes[0], newScene.Animatables[0], 0, 5, true, 1);
					//console.log(newScene.meshes[0].getAnimatables());
					//var anims = newScene.getAnimatableByTarget(newScene.meshes[0]);//works when animation is playing
					//console.log(anims);
					//newScene.beginDirectAnimation(newScene.meshes[0], animations, from, to, loop, speedRatio, onAnimationEnd)

					//BABYLON.PlayAnimationAction("", newScene.meshes[0], 0, 10, true, 0.5);
				}));
			}), (function (progress) {
				// To do: give progress feedback to user
				console.log("progress");
				//console.log(progress);
			}));
		}
	}, {
		key: 'loadmesh_extbabylon',
		value: function loadmesh_extbabylon() {
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

			BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, (function (newMeshes, particleSystems) {

				console.log(newMeshes[0]);
				self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5); //works
			}));

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
	}, {
		key: 'loadmesh_extglTF',
		value: function loadmesh_extglTF() {
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

			var self = this; //cube.babylon
			BABYLON.SceneLoader.Load("/assets/", "cube.babylon", this.engine, (function (newScene) {
				//BABYLON.SceneLoader.Load("/assets/", "Duck.gltf", this.engine, function (newScene) {

				// Wait for textures and shaders to be ready
				newScene.executeWhenReady((function () {
					// Attach camera to canvas inputs
					var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, 10), newScene);

					camera.position.x = 0;
					camera.position.y = 10;
					camera.position.z = 20;
					camera.setTarget(BABYLON.Vector3.Zero());

					//var box = BABYLON.Mesh.CreateBox("box", 2, newScene);
					//box.position.y = 3;
					newScene.activeCamera.attachControl(self.canvas, false);
					self.scene2 = newScene;
					//self.create_hud2d(newScene);
					console.log(newScene);
					// Once the scene is loaded, just register a render loop to render it
					console.log("init render?");
					self.engine.runRenderLoop((function () {
						self.scene2.render();
						//console.log("render?");
					}));
				}));
			}), (function (progress) {
				console.log("progress");
			}));
		}
	}, {
		key: 'createscene_simple',
		value: function createscene_simple() {
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

	}, {
		key: 'loadmesh_blockcharacter',
		value: function loadmesh_blockcharacter() {
			//var filepath = "block_character02.babylon";
			//var objectname = "Cube";
			var filepath = "block_character03.babylon";
			var objectname = "CubeBody";

			//var filepath = "arm_cube.babylon";
			//var objectname = "Cube";
			var self = this;
			BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, (function (newMeshes, particleSystems) {
				console.log(newMeshes[0]);
				//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5);//works
				self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5); //works
			}));
		}
	}, {
		key: 'create2dhud',
		value: function create2dhud() {
			this.hudcanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
				id: "ScreenCanvas",
				//size: new BABYLON.Size(300, 100),
				//backgroundFill: "#4040408F",
				enableInteraction: true //,
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
			var buttonRect = new BABYLON.Rectangle2D({ parent: this.hudcanvas, id: "button", x: 10, y: 10, width: 100, height: 20, fill: "#40C040FF",
				//roundRadius: 10,
				children: [new BABYLON.Text2D("Action", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })] });
			buttonRect.pointerEventObservable.add((function (d, s) {
				console.log("click1");
			}), BABYLON.PrimitivePointerInfo.PointerUp);
			var buttonRect2 = new BABYLON.Rectangle2D({ parent: this.hudcanvas, id: "button", x: 120, y: 10, width: 100, height: 20, fill: "#40C040FF",
				//roundRadius: 10,
				children: [new BABYLON.Text2D("Action2", { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })] });
			buttonRect2.pointerEventObservable.add((function (d, s) {
				console.log("click2");
			}), BABYLON.PrimitivePointerInfo.PointerUp);
		}
		//===============================================
		// HUD UI
		//===============================================

	}, {
		key: 'create2DHUD',
		value: function create2DHUD() {
			this.hudcanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
				id: "ScreenCanvas",
				enableInteraction: true //,
			});
			//console.log(this.hudcanvas);
		}
	}, {
		key: 'create2D_BattleHUD',
		value: function create2D_BattleHUD() {
			var self = this;
			//button
			this.AddButton(this.hudcanvas, 'button_escape', 'Escape', 10, 22 * 0 + 10, (function () {
				self.actionescape();
			}));
			this.AddButton(this.hudcanvas, 'button_item', 'Items', 10, 22 * 1 + 10, (function () {
				self.openitem();
			}));
			this.AddButton(this.hudcanvas, 'button_skills', 'Skills', 10, 22 * 2 + 10, (function () {
				self.openskills();
			}));
			this.AddButton(this.hudcanvas, 'button_move', 'Move', 10, 22 * 3 + 10, (function () {
				self.openitem();
			}));
			this.AddButton(this.hudcanvas, 'button_attack', 'Attack', 10, 22 * 4 + 10, (function () {
				self.actionattack();
			}));

			this.AddButton(this.hudcanvas, 'button_attack', 'Enemy Attack', 150, 22 * 4 + 10, (function () {
				self.actionenemyattack();
			}));

			this.AddButton(this.hudcanvas, 'button_battle', 'Battle', 10, 22 * 5 + 10, (function () {
				self.actionbattle();
			}));
		}
	}, {
		key: 'AddButton',
		value: function AddButton(_scenecanvas, _id, _name, _x, _y, _callback, options) {
			var buttonRect = new BABYLON.Rectangle2D({ parent: _scenecanvas, id: _id, x: _x, y: _y, width: 100, height: 20, fill: "#40C040FF",
				children: [new BABYLON.Text2D(_name, { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })] });
			buttonRect.pointerEventObservable.add((function (d, s) {
				//console.log("click2");
				_callback();
			}), BABYLON.PrimitivePointerInfo.PointerUp);
			return buttonRect;
		}

		//===============================================
		// BATTLE // MODELS
		//===============================================

	}, {
		key: 'getmesh',
		value: function getmesh(_name) {
			var model = null;
			for (var i = 0; i < this.meshes.length; i++) {
				if (this.meshes[i].name == _name) {
					var mid = uuid(); //random id generator
					//model = this.meshes[i].clone(mid,null,true);
					model = this.meshes[i].clone(mid);
					var mid = uuid(); //random id generator
					model.skeleton = this.meshes[i].skeleton.clone(mid);
					this.scene.beginAnimation(model, 40, 60, true, 0.5); //works /// works
					break;
				}
			}

			/*
   for(var i = 0; i < this.assetsManager._scene.meshes.length;i++){
   	if(this.assetsManager._scene.meshes[i] !=null){
   		//console.log(this.assetsManager._scene.meshes[i].uniqueId);
   		if(this.assetsManager._scene.meshes[i].name == _name){
   			console.log(this.assetsManager._scene.meshes[i]);
   			//model = this.assetsManager._scene.meshes[i].clone(_name + "1",null,true);
   					model = this.assetsManager._scene.meshes[i].createInstance(uuid());
   					console.log(model);
   					//console.log(this.assetsManager._scene.meshes[i].skeleton);
   			//console.log(model);
   			//console.log(this.assetsManager._scene.meshes[i]);
   			//model.skeleton = this.assetsManager._scene.meshes[i].skeleton.clone("metarig", uuid());
   			//console.log(model);
   			//remove assets since it been clone
   			//this.assetsManager._scene.removeMesh(model);
   			//model = this.assetsManager._scene.meshes[i].clone();
   			//model = this.assetsManager._scene.meshes[i].createInstance("i" + _name);
   			break;
   		}
   	}
   }
   */
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
	}, {
		key: 'createbattle_prototype',
		value: function createbattle_prototype() {
			var self = this;
			var player = new RPGStatus({ name: "player" });
			//console.log(this.assetsManager);
			var model = this.getmesh("CubeBody");
			//console.log(model);
			if (model != null) {
				model.rpgstatus = player;
				player.mesh = model;

				//console.log("create model");
				//console.log(model);
				//console.log(model.skeleton);
				//set scene to be update...
				//model._scene = this.scenes[this.scenename];
				//model.skeleton._scene = this.scenes[this.scenename];
				//console.log(model.skeleton);
				//model.skeleton._scene = this.scenes[this.scenename];
				player.mesh.isVisible = true;
				//this.scenes[this.scenename].addMesh(model);
				player.mesh.position.x = 3;
				model.position.z = 0;
				model.position.y = 0;
				player.mesh.rotation.y = Math.PI / 2; //90
				this.create_spaceworld_status(self.scene, player.mesh, player);
			}
			this.parties.push(player);

			var enemy = new RPGStatus({ name: "enemy" });
			var model2 = this.getmesh("CubeBody");
			if (model2 != null) {
				model2.rpgstatus = enemy;
				enemy.mesh = model2;
				//model2._scene = this.scenes[this.scenename];
				model2.isVisible = true;
				//this.scenes[this.scenename].addMesh(model2);
				model2.position.x = -3;
				model2.position.z = 0;
				model2.position.y = 0;
				model2.rotation.y = Math.PI / 2 * -1; //-90
				this.create_spaceworld_status(this.scene, model2, enemy);
			}
			this.enemies.push(enemy);

			//this.scenename = "sceneassets";
			//this.scenes['sceneassets'];
		}
	}, {
		key: 'create_spaceworld_status',
		value: function create_spaceworld_status(_scene, _model, _status) {
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
			var healthBar = BABYLON.MeshBuilder.CreatePlane("hb1", { width: 2, height: .5, subdivisions: 4 }, _scene);

			var healthBarText = BABYLON.MeshBuilder.CreatePlane("hb3", { width: 2, height: 2, subdivisions: 4 }, _scene);
			healthBarText.material = healthBarMaterial;

			healthBarContainer.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

			healthBar.renderingGroupId = 1;
			healthBarText.renderingGroupId = 1;
			healthBarContainer.renderingGroupId = 1;

			healthBar.position = new BABYLON.Vector3(0, 0, -.01); // Move in front of container slightly.  Without this there is flickering.
			healthBarContainer.position = new BABYLON.Vector3(0, 3, 0); // Position above player.
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

			self.engine.runRenderLoop((function () {

				if (alive) {
					healthPercentage = status.health / status.maxhealth * 100;
					//console.log(healthPercentage);
					healthBar.scaling.x = healthPercentage / 100;
					healthBar.position.x = (1 - healthPercentage / 100) * -1;

					if (healthBar.scaling.x < 0) {
						//alive = false;
						//healthPercentage = 100;
						alpha = 3;
						healthBarTextMaterial.diffuseColor = BABYLON.Color3.Green();
						healthBarMaterial.diffuseColor = BABYLON.Color3.Green();
					} else if (healthBar.scaling.x < .5) {
						healthBarMaterial.diffuseColor = BABYLON.Color3.Yellow();
						healthBarTextMaterial.diffuseColor = BABYLON.Color3.Yellow();
					} else if (healthBar.scaling.x < .3) {
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
						textureContext.fillText(text, (size.width - textSize.width) / 2, (size.height - 120) / 2);

						dynamicTexture.update();
					}
					//healthPercentage -= .5;
					alpha += 0.01;
				}
			}));
		}
	}, {
		key: 'drawstatusbars_0',
		value: function drawstatusbars_0(_2DCanvas, _model, _status) {
			//console.log(_model.uniqueId);
			new BABYLON.Group2D({
				parent: _2DCanvas, id: "GroupTag #" + _model.uniqueId, width: 80, height: 40, trackNode: _model, origin: BABYLON.Vector2(0, 0),
				children: [new BABYLON.Rectangle2D({ id: "firstRect", width: 80, height: 26, x: 0, y: 0, origin: BABYLON.Vector2.Zero(), border: "#FFFFFFFF", fill: "#808080FF", children: [new BABYLON.Text2D(_status.name, { marginAlignment: "h: center, v:center", fontName: "bold 12px Arial" })]
				})]
			});
		}
	}, {
		key: 'actionbattle',
		value: function actionbattle() {
			console.log("action battle ...");
			console.log(this.parties[0]);
			//check if party health is not zero for attack
			if (this.parties[0].health > 0) {
				this.enemies[0].health = this.enemies[0].health - this.parties[0].attack;
			}
			if (this.enemies[0].health <= 0) {
				this.enemies[0].health = 0;
			}
			console.log("ENEMY HEALTH:" + this.enemies[0].health + "/" + this.enemies[0].maxhealth);
			//check if enemy health is not zero to attack if dead
			if (this.enemies[0].health > 0) {
				this.parties[0].health = this.parties[0].health - this.parties[0].attack;
			}
			if (this.parties[0].health <= 0) {
				this.parties[0].health = 0;
			}
			console.log("PARTY HEALTH:" + this.parties[0].health + "/" + this.parties[0].maxhealth);
			console.log(this.enemies[0]);
		}
	}, {
		key: 'opponentAttack',
		value: function opponentAttack() {
			console.log("opponentAttack ...");
		}
	}, {
		key: 'setupbattle',
		value: function setupbattle() {}
	}, {
		key: 'createbattle',
		value: function createbattle() {}
	}, {
		key: 'openitem',
		value: function openitem() {
			console.log("open item ...");
			console.log(this.parties[0]);
		}
	}, {
		key: 'openskills',
		value: function openskills() {
			console.log("open skills ...");
			console.log(this.parties[0]);
		}
	}, {
		key: 'actionattack',
		value: function actionattack() {
			var self = this;
			console.log("action attack ...");
			//console.log(this.parties[0]);
			//console.log(this.parties[0].mesh.uniqueId);

			console.log(this.parties[0].mesh.uniqueId);
			//console.log(  this.parties[0].mesh   );
			//console.log(this.scene.meshes);
			//self.scene.beginAnimation(this.scene.meshes[0], 40, 60, true, 0.5); //not work
			self.scene.beginAnimation(this.parties[0].mesh, 40, 60, true, 0.5); //works /// works


			//console.log(this.parties[0].mesh.position);
		}
	}, {
		key: 'actionenemyattack',
		value: function actionenemyattack() {
			var self = this;
			console.log("action attack ...");
			//console.log(this.parties[0]);
			console.log(this.enemies[0].mesh.uniqueId);
			//console.log(this.scene.meshes);
			//self.scene.beginAnimation(this.scene.meshes[0], 40, 60, true, 0.5); //not work
			self.scene.beginAnimation(this.enemies[0].mesh, 40, 60, true, 0.5); //works /// works
			console.log(this.enemies[0].mesh.position);
			//this.enemies[0].mesh.position.x = -3;
			//this.enemies[0].mesh.skeleton.postion.x = 2;
		}
	}, {
		key: 'actionmove',
		value: function actionmove() {
			console.log("action move ...");
			console.log(this.parties[0]);
		}
	}, {
		key: 'actionescape',
		value: function actionescape() {
			console.log("action escape ...");
			console.log(this.parties[0]);
		}
		//===============================================
		//===============================================

	}, {
		key: 'loadbabylon_json',
		value: function loadbabylon_json() {
			//var filepath = "block_character02.babylon";
			//var objectname = "Cube";
			var filepath = "block_character03.babylon";
			var objectname = "CubeBody";

			//var filepath = "arm_cube.babylon";
			//var objectname = "Cube";
			var self = this;
			BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, (function (newMeshes, particleSystems) {
				console.log(newMeshes[0]);
				//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5); //works
				self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5); //works
			}));
		}

		//===============================================
		//
		//===============================================

		//create scene assets for run background

	}, {
		key: 'createscene_assets',
		value: function createscene_assets() {
			var self = this;
			this.sceneassets = new BABYLON.Scene(this.engine);
			var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.sceneassets);
			camera.attachControl(this.canvas, false);

			var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.sceneassets);

			this.scenes['sceneassets'] = this.sceneassets;

			//this.sceneassets.activeCamera.attachControl(self.canvas);
			//self.engine.runRenderLoop(function() {
			//self.sceneassets.render();
			//});
			//this.engine.displayLoadingUI();
			this.assetsManager = new BABYLON.AssetsManager(this.scene);
			//this.assetsManager = new BABYLON.AssetsManager(this.scenes[this.scenename]);

			var filepath = "block_character03.babylon";
			var objectname = "CubeBody";

			var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
			meshTask.onSuccess = function (task) {
				//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
				task.loadedMeshes[0].position = new BABYLON.Vector3(0, 2, 3);
				//console.log(task.loadedMeshes[0].position);
				task.loadedMeshes[0].isVisible = false;
				self.meshes.push(task.loadedMeshes[0]);

				//console.log(task.loadedMeshes[0]);
			};

			filepath = "arm_cube.babylon";
			objectname = "Cube";

			var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
			meshTask2.onSuccess = function (task) {
				//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
				task.loadedMeshes[0].isVisible = false;
				self.meshes.push(task.loadedMeshes[0]);
			};

			this.assetsManager.onFinish = function (tasks) {
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

	}, {
		key: 'render_scene',
		value: function render_scene(_scene) {
			var self = this;
			console.log(_scene);
			console.log(self.engine);
			//note it will keep adding more array in engine loop
			self.engine.runRenderLoop((function () {
				_scene.render();
				//console.log(_scene._renderId);
			}));
		}
	}, {
		key: 'stop_render',
		value: function stop_render() {
			//clear out all function call loops array
			this.engine.stopRenderLoop();
		}
	}, {
		key: 'input_simple',
		value: function input_simple() {
			var self = this;
			var keys = { letft: 0, right: 0, forward: 0, back: 0 };
			window.addEventListener("keydown", handleKeyDown, false);
			window.addEventListener("keyup", handleKeyUp, false);
			function handleKeyDown(evt) {
				if (evt.keyCode == 65) {
					//A
					keys.left = 1;
					console.log("left");
					//self.render_scene(self.scene);
					self.scenename = "default";
				}
				if (evt.keyCode == 68) {
					//D
					keys.right = 1;
					//self.render_scene(self.sceneassets);
					self.scenename = "sceneassets";
				}
				if (evt.keyCode == 87) {
					//W
					keys.forward = 1;
					//self.stop_render();
					//self.engine.hideLoadingUI();
				}
				if (evt.keyCode == 83) {
					//S
					keys.back = 1;
					//self.engine.displayLoadingUI();
				}
			}
			function handleKeyUp(evt) {
				if (evt.keyCode == 65) {
					keys.left = 0;
				}
				if (evt.keyCode == 68) {
					keys.right = 0;
				}
				if (evt.keyCode == 87) {
					keys.forward = 0;
				}
				if (evt.keyCode == 83) {
					keys.back = 0;
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
	}, {
		key: 'init',
		value: function init() {
			_get(Babylonjs_game.prototype.__proto__ || Object.getPrototypeOf(Babylonjs_game.prototype), 'init', this).call(this);
			//console.log(this.engine);
			//BABYLON.Tools.Log("blah");
			//this.engine.displayLoadingUI();
			//var self = this;
			console.log("init [babylonjs_game]");
			//setup files load?
			//init 2D Canvas setup HUD and UIs?
			//this.create2DHUD();
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
	}, {
		key: 'setup_game',
		value: function setup_game() {
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
			//this.scene.debugLayer.show();
			this.scene.debugLayer.show(false);
			//this.scene.debugLayer.hide();

			//this.create2D_BattleHUD();
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
	}]);

	return Babylonjs_game;
})(Babylonjsbes6);