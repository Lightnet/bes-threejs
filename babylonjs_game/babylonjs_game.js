define(['exports', '../babylonjs_framework/babylonjs_framework', './ObjectRPGID', './RPGStats', './RPGStatus', './babylonjs_game_network', './babylonjs_game_physics', './babylonjs_game_load', './babylonjs_game_scene', './babylonjs_game_hud', './babylonjs_game_ui', './babylonjs_game_editor', './babylonjs_game_assets', './babylonjs_game_character', './babylonjs_game_controller', './babylonjs_game_battle', './babylonjs_game_parse', './babylonjs_game_terrain'], function (exports, _babylonjs_framework, _ObjectRPGID, _RPGStats, _RPGStatus, _babylonjs_game_network, _babylonjs_game_physics, _babylonjs_game_load, _babylonjs_game_scene, _babylonjs_game_hud, _babylonjs_game_ui, _babylonjs_game_editor, _babylonjs_game_assets, _babylonjs_game_character, _babylonjs_game_controller, _babylonjs_game_battle, _babylonjs_game_parse, _babylonjs_game_terrain) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.Babylonjs_game = undefined;

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var _createClass = function () {
                function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                        }
                }

                return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                };
        }();

        function _possibleConstructorReturn(self, call) {
                if (!self) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }

                return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);

                if (desc === undefined) {
                        var parent = Object.getPrototypeOf(object);

                        if (parent === null) {
                                return undefined;
                        } else {
                                return get(parent, property, receiver);
                        }
                } else if ("value" in desc) {
                        return desc.value;
                } else {
                        var getter = desc.get;

                        if (getter === undefined) {
                                return undefined;
                        }

                        return getter.call(receiver);
                }
        };

        function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }

                subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                                value: subClass,
                                enumerable: false,
                                writable: true,
                                configurable: true
                        }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        // Converts from degrees to radians.
        Math.radians = function (degrees) {
                return degrees * Math.PI / 180;
        };

        // Converts from radians to degrees.
        Math.degrees = function (radians) {
                return radians * 180 / Math.PI;
        };

        //RFC Type 4 (random) schema
        var uuid = function uuid() {
                var buf = new Uint32Array(4);
                window.crypto.getRandomValues(buf);
                var idx = -1;
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        idx++;
                        var r = buf[idx >> 3] >> idx % 8 * 4 & 15;
                        var v = c == 'x' ? r : r & 0x3 | 0x8;
                        return v.toString(16);
                });
        };

        var Babylonjs_game = exports.Babylonjs_game = function (_Babylonjs_framework) {
                _inherits(Babylonjs_game, _Babylonjs_framework);

                function Babylonjs_game(args) {
                        _classCallCheck(this, Babylonjs_game);

                        var _this = _possibleConstructorReturn(this, (Babylonjs_game.__proto__ || Object.getPrototypeOf(Babylonjs_game)).call(this, args));

                        _this.materials = [];
                        _this.textures = [];
                        _this.meshes = [];
                        _this.models = [];

                        _this.characters = [];
                        _this.dimensionstorage = [];

                        _this.companions = []; //those who join in your party that travel together
                        _this.squads = [];

                        _this.friends = []; //battle mode?
                        _this.foes = []; //battle mode?

                        _this.turns = [];
                        _this.parties = []; //who in the party //battle mode?
                        _this.enemies = []; //threat if player attack or in battle actions //battle mode?
                        _this.npcs = []; //local villagers

                        _this.scene_battle;
                        _this.scene_dimension_homebase;
                        _this.scene_global_map;
                        _this.scene_world_map;
                        _this.scene_local_map;

                        _this.sceneassets;
                        _this.assetsManager;
                        _this.config_assets;
                        //controls
                        _this.controllerid = 0;
                        _this.keys = { letft: 0, right: 0, forward: 0, back: 0 };
                        _this.moveVector = new BABYLON.Vector3(0, 0, 0);

                        _this.leftstickmove = false;
                        _this.joyleftdir = new BABYLON.Vector3(0, 0, 0);
                        _this.joylefttrigger = 0;
                        _this.joyrightdir = new BABYLON.Vector3(0, 0, 0);
                        _this.joyrighttrigger = 0;

                        //EDITOR props
                        //this.text2D;
                        _this.selectobject = null;

                        _this.selectobject_text_id = null;

                        _this.selectobject_text_px = null;
                        _this.selectobject_text_py = null;
                        _this.selectobject_text_pz = null;

                        _this.selectobject_text_rx = null;
                        _this.selectobject_text_ry = null;
                        _this.selectobject_text_rz = null;

                        _this.selectobject_text_sx = null;
                        _this.selectobject_text_sy = null;
                        _this.selectobject_text_sz = null;

                        _this.scriptcount = 0;
                        self.mappdata = {};

                        new _babylonjs_game_network.Babylonjs_game_network(_this);
                        new _babylonjs_game_physics.Babylonjs_game_physics(_this);
                        new _babylonjs_game_parse.Babylonjs_game_parse(_this);
                        new _babylonjs_game_load.Babylonjs_game_load(_this);
                        new _babylonjs_game_scene.Babylonjs_game_scene(_this);
                        new _babylonjs_game_hud.Babylonjs_game_hud(_this);
                        new _babylonjs_game_ui.Babylonjs_game_ui(_this);
                        new _babylonjs_game_editor.Babylonjs_game_editor(_this);
                        new _babylonjs_game_assets.Babylonjs_game_assets(_this);
                        new _babylonjs_game_character.Babylonjs_game_character(_this);
                        new _babylonjs_game_controller.Babylonjs_game_controller(_this);
                        new _babylonjs_game_battle.Babylonjs_game_battle(_this);
                        new _babylonjs_game_terrain.Babylonjs_game_terrain(_this);

                        return _this;
                }

                _createClass(Babylonjs_game, [{
                        key: 'ScenePickObject',
                        value: function ScenePickObject() {
                                var self = this;
                                //When pointer down event is raised
                                this.scene.onPointerDown = function (evt, pickResult) {
                                        // if the click hits the ground object, we change the impact position
                                        if (pickResult.hit) {
                                                //console.log(pickResult);
                                                self.selectobject = pickResult.pickedMesh;
                                                self.updateselectobject();
                                                //impact.position.x = pickResult.pickedPoint.x;
                                                //impact.position.y = pickResult.pickedPoint.y;
                                                //console.log("HIT"+pickResult.pickedPoint);
                                        }
                                };
                        }
                }, {
                        key: 'simple_scene',
                        value: function simple_scene() {
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
                                box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move: false, restitution: 1, mass: 0, friction: 0.5 });
                                box1.showBoundingBox = true;
                                var box2 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
                                box2.position.x = 5;
                                box2.position.y = 1;
                                //box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                                box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move: false, restitution: 1, mass: 0, friction: 0.5 });
                                box2.showBoundingBox = true;
                                //https://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter#box
                                // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
                                //var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, this.scene);
                                var ground = BABYLON.MeshBuilder.CreateBox("ground", { height: 1, width: 20, depth: 20 }, scene);
                                //ground.scale.x = 100;
                                //ground.scale.y = 100;
                                ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move: false, restitution: 0, mass: 0, friction: 10 });
                                ground.showBoundingBox = true;
                        }

                        //override function...

                }, {
                        key: 'start_scenerender',
                        value: function start_scenerender() {
                                var self = this;
                                this.engine.runRenderLoop(function () {
                                        //console.log("hellow");
                                        if (self.scenes[self.scenename] != null) {
                                                self.scenes[self.scenename].render();
                                                for (var i = 0; i < self.scenes[self.scenename].meshes.length; i++) {
                                                        //console.log("hellow");
                                                        if (typeof self.scenes[self.scenename].meshes[i].update === 'function') {
                                                                self.scenes[self.scenename].meshes[i].update();
                                                        }
                                                }
                                                if (self.selectobject != null) {}
                                        }
                                });
                        }
                }, {
                        key: 'init',
                        value: function init() {
                                _get(Babylonjs_game.prototype.__proto__ || Object.getPrototypeOf(Babylonjs_game.prototype), 'init', this).call(this);
                                console.log("init [babylonjs_game]");
                                this.createspacecavnas2D();
                                this.createscene_assets();
                        }
                }, {
                        key: 'setup_game',
                        value: function setup_game() {
                                var self = this;
                                console.log("setup game!");
                                this.camera.attachControl(this.canvas, false);
                                var box1 = BABYLON.Mesh.CreateBox("box", 1.0, this.scene);
                                //console.log("BABYLON.ActionManager");
                                //console.log(BABYLON.ActionManager);

                                var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), this.scene);
                                //input key
                                //this.camera.attachControl(this.scene.getEngine().getRenderingCanvas());
                                //working... some what
                                this.scene.actionManager = new BABYLON.ActionManager(this.scene);
                                this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: "r" }, function (evt) {
                                        //console.log("typing r...");
                                        //console.log(evt);
                                        //if (evt.sourceEvent.key == "r") {
                                        //}
                                }));
                                this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                                        //console.log(" OnKeyUpTrigger typing...");
                                        //console.log(evt);
                                        //if (evt.sourceEvent.key == "r") {
                                        //}
                                }));
                                this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                                        //console.log(" OnKeyDownTrigger typing...");
                                        //console.log(evt);
                                        //if (evt.sourceEvent.key == "r") {
                                        //}
                                }));

                                //box1.actionManager = new BABYLON.ActionManager(this.scene);
                                //box1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                                //alert('player clicked');
                                //}));
                                //box1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                                //console.log(" scene typing...");
                                //if (evt.sourceEvent.key == "r") {
                                //}
                                //}));
                                //box1.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: "r" }, function (evt) {
                                //console.log("typing r...");
                                //if (evt.sourceEvent.key == "r") {
                                //}
                                //}));

                                //console.log(this.engine);
                                //console.log(this.scene);
                                //console.log(BABYLON);
                                this.init_physics();
                                this.create2DHUD();
                                //this.setupeditor();
                                //this.create2D_BattleHUD();
                                //this.createinventoryHUD();

                                //this.createstorageUI();
                                //this.createlootUI();

                                //BABYLON.DebugLayer().show();
                                //this.scene.debugLayer.show(false);
                                //this.scene.debugLayer.show(true);
                                //this.createbattle_prototype();
                                this.create_input();
                                this.create_gamepadinput();
                                //this.create_movement();
                                //this.ScenePickObject();
                                //this.simple_scene();

                                //this.simpleterrain()
                                //this.simpleterrain01();
                                this.simpleterrain03();
                                //this.simpleterrain04();


                                this.spawn_player({ y: 32 });

                                //this.create_character();
                                //this.loadmap_requestXML();
                        }
                }]);

                return Babylonjs_game;
        }(_babylonjs_framework.Babylonjs_framework);
});