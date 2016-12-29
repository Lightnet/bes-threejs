define(['exports', '../babylonjs_framework/babylonjs_framework', './rpg/ObjectRPGID', './rpg/RPGStats', './rpg/RPGStatus', './rpg/RPGItem', './network/Babylonjs_game_network', './physics/Babylonjs_game_physics', './load/Babylonjs_game_load', './scene/Babylonjs_game_scene', './hud/Babylonjs_game_hud', './hud/Babylonjs_game_hud_battle', './hud/Babylonjs_game_hud_inventory', './hud/Babylonjs_game_hud_loot', './hud/Babylonjs_game_hud_skills', './hud/Babylonjs_game_hud_shop', './hud/Babylonjs_game_hud_storage', './hud/Babylonjs_game_hud_trade', './hud/Babylonjs_game_hud_market', './ui/Babylonjs_game_ui', './editor/Babylonjs_game_editor', './system/Babylonjs_game_assets', './character/Babylonjs_game_character', './controller/Babylonjs_game_controller', './system/Babylonjs_game_battle', './system/Babylonjs_game_parse', './system/Babylonjs_game_loadsave', './system/Babylonjs_game_gundb', './terrain/Babylonjs_game_terrain', './jqueryui/Babylonjs_game_jqueryui'], function (exports, _babylonjs_framework, _ObjectRPGID, _RPGStats, _RPGStatus, _RPGItem, _Babylonjs_game_network, _Babylonjs_game_physics, _Babylonjs_game_load, _Babylonjs_game_scene, _Babylonjs_game_hud, _Babylonjs_game_hud_battle, _Babylonjs_game_hud_inventory, _Babylonjs_game_hud_loot, _Babylonjs_game_hud_skills, _Babylonjs_game_hud_shop, _Babylonjs_game_hud_storage, _Babylonjs_game_hud_trade, _Babylonjs_game_hud_market, _Babylonjs_game_ui, _Babylonjs_game_editor, _Babylonjs_game_assets, _Babylonjs_game_character, _Babylonjs_game_controller, _Babylonjs_game_battle, _Babylonjs_game_parse, _Babylonjs_game_loadsave, _Babylonjs_game_gundb, _Babylonjs_game_terrain, _Babylonjs_game_jqueryui) {
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
            _this.bcontroller = true;
            _this.keys = {
                letft: 0,
                right: 0,
                forward: 0,
                back: 0
            };
            _this.moveVector = new BABYLON.Vector3(0, 0, 0);

            _this.npc = null;

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

            _this.display_inventory = [];
            _this.inventory = [];
            _this.scroll_inventory_y = 0;

            new _Babylonjs_game_network.Babylonjs_game_network(_this);
            new _Babylonjs_game_physics.Babylonjs_game_physics(_this);
            new _Babylonjs_game_parse.Babylonjs_game_parse(_this);
            new _Babylonjs_game_load.Babylonjs_game_load(_this);
            new _Babylonjs_game_loadsave.Babylonjs_game_loadsave(_this);
            new _Babylonjs_game_scene.Babylonjs_game_scene(_this);

            new _Babylonjs_game_hud.Babylonjs_game_hud(_this);
            new _Babylonjs_game_hud_battle.Babylonjs_game_hud_battle(_this);
            new _Babylonjs_game_hud_inventory.Babylonjs_game_hud_inventory(_this);
            new _Babylonjs_game_hud_loot.Babylonjs_game_hud_loot(_this);
            new _Babylonjs_game_hud_skills.Babylonjs_game_hud_skills(_this);
            new _Babylonjs_game_hud_shop.Babylonjs_game_hud_shop(_this);
            new _Babylonjs_game_hud_storage.Babylonjs_game_hud_storage(_this);
            new _Babylonjs_game_hud_trade.Babylonjs_game_hud_trade(_this);
            new _Babylonjs_game_hud_market.Babylonjs_game_hud_market(_this);

            new _Babylonjs_game_ui.Babylonjs_game_ui(_this);
            new _Babylonjs_game_editor.Babylonjs_game_editor(_this);
            new _Babylonjs_game_assets.Babylonjs_game_assets(_this);

            new _Babylonjs_game_character.Babylonjs_game_character(_this);

            new _Babylonjs_game_controller.Babylonjs_game_controller(_this);

            new _Babylonjs_game_battle.Babylonjs_game_battle(_this);

            new _Babylonjs_game_terrain.Babylonjs_game_terrain(_this);

            new _Babylonjs_game_jqueryui.Babylonjs_game_jqueryui(_this);

            new _Babylonjs_game_gundb.Babylonjs_game_gundb(_this);

            return _this;
        }

        _createClass(Babylonjs_game, [{
            key: 'ScenePickObject',
            value: function ScenePickObject() {
                console.log("PICK? Setup");
                var self = this;
                //When pointer down event is raised
                this.scene.onPointerDown = function (evt, pickResult) {
                    // if the click hits the ground object, we change the impact position
                    if (pickResult.hit) {
                        //console.log(pickResult);
                        self.selectobject = pickResult.pickedMesh;
                        console.log("PICKED");
                        console.log(self.selectobject);
                        self.updateselectobject();
                        //impact.position.x = pickResult.pickedPoint.x;
                        //impact.position.y = pickResult.pickedPoint.y;
                        //console.log("HIT"+pickResult.pickedPoint);
                    }
                };
            }

            //override function...

        }, {
            key: 'start_scenerender',
            value: function start_scenerender() {
                /*
                var self = this;
                this.engine.runRenderLoop(function() {
                    //console.log("hellow");
                if(self.scenes[self.scenename] !=null){
                self.scenes[self.scenename].render();
                for(var i =0; i < self.scenes[self.scenename].meshes.length;i++){
                            //console.log("hellow");
                if(typeof self.scenes[self.scenename].meshes[i].update === 'function'){
                self.scenes[self.scenename].meshes[i].update();
                }
                }
                        if(self.selectobject !=null){
                        }
                }
                });
                */
            }
        }, {
            key: 'canvasrender',
            value: function canvasrender() {
                //console.log("render?");
                var self = this;
                this.engine.runRenderLoop(function () {
                    //console.log("hellow");
                    if (self.scene != null) {
                        self.scene.render();
                        for (var i = 0; i < self.scene.meshes.length; i++) {
                            //console.log("hellow");
                            if (typeof self.scene.meshes[i].update === 'function') {
                                self.scene.meshes[i].update();
                            }
                        }
                        if (self.selectobject != null) {}
                    }
                });
                /*
                this.engine.runRenderLoop(function() {
                    //console.log("hellow");
                if(self.scenes[self.scenename] !=null){
                self.scenes[self.scenename].render();
                for(var i =0; i < self.scenes[self.scenename].meshes.length;i++){
                            //console.log("hellow");
                if(typeof self.scenes[self.scenename].meshes[i].update === 'function'){
                self.scenes[self.scenename].meshes[i].update();
                }
                }
                        if(self.selectobject !=null){
                        }
                }
                });
                */
            }
        }, {
            key: 'init',
            value: function init() {
                _get(Babylonjs_game.prototype.__proto__ || Object.getPrototypeOf(Babylonjs_game.prototype), 'init', this).call(this);
                console.log("init [babylonjs_game]");
                this.createspacecavnas2D();
                this.createscene_assets();
                this.init_gundb();
            }
        }, {
            key: 'setup_gamedata',
            value: function setup_gamedata() {
                //list inventory
                this.display_inventory[0] = null;
                this.display_inventory[1] = null;
                this.display_inventory[2] = null;
                this.display_inventory[3] = null;
                this.display_inventory[4] = null;
                this.display_inventory[5] = null;
                this.display_inventory[6] = null;
                this.display_inventory[7] = null;
                this.display_inventory[8] = null;
                this.display_inventory[9] = null;

                this.select_index_inventory = 0;

                var item0 = new _RPGItem.RPGItem({ name: "Potion HP" });
                this.inventory.push(item0);

                item0 = new _RPGItem.RPGItem({ name: "Potion MP" });
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                var item0 = new _RPGItem.RPGItem({ name: "Potion HP" });
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                this.inventory.push(item0);
                var item0 = new _RPGItem.RPGItem({ name: "Potion MP" });
                this.inventory.push(item0);
                this.inventory.push(item0);
                var item0 = new _RPGItem.RPGItem({ name: "Potion" });
                this.inventory.push(item0);

                var item0 = new _RPGItem.RPGItem({ name: "Potion MP" });
                this.inventory.push(item0);
            }
        }, {
            key: 'createshopmenu_variable',
            value: function createshopmenu_variable() {
                this.display_shop = [];
                this.select_index_shop = 0;
                this.scroll_shop_y = 0;
            }
        }, {
            key: 'setup_game',
            value: function setup_game() {
                var self = this;
                console.log("setup game!");
                this.canvasrender();

                this.setup_gamedata();
                this.createshopmenu_variable();
                this.scenepick_editor();
                //this.createinventoryHUD();
                //var box1 = BABYLON.Mesh.CreateBox("box", 1.0, this.scene);
                //this.showAxis(3, box1);
                var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), this.scene);

                this.create_window_jqui();
                //this.bo();

                this.init_physics();
                this.create2DHUD();

                this.create_input();
                //this.create_gamepadinput();

                //this.simpleterrain04();
                //this.createterrain();
                //var terrain = this.createterrain({wireframe:true,x:0,y:0,z:0});
                //console.log(terrain);

                //var npc = this.spawn_character({y: 64});
                //console.log(npc);
                //npc.status.bshop = true;
                //var item0 = new RPGItem({name: "Potion MP"});
                //npc.status.shop.push(item0);
                //this.spawn_character({y: 32, bplayer: true});
            }
        }, {
            key: 'setup_game00',
            value: function setup_game00() {
                var self = this;
                console.log("setup game!");
                this.canvasrender();
                this.setup_gamedata();
                this.createshopmenu_variable();
                this.scenepick_editor();
                //this.createinventoryHUD();
                //this.camera.attachControl(this.canvas, false);
                var box1 = BABYLON.Mesh.CreateBox("box", 1.0, this.scene);
                this.showAxis(3, box1);
                //console.log("BABYLON.ActionManager");
                //console.log(BABYLON.ActionManager);
                var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), this.scene);
                this.create_window_jqui();
                //input key
                //this.camera.attachControl(this.scene.getEngine().getRenderingCanvas());
                //working... some what
                //this.scene.actionManager = new BABYLON.ActionManager(this.scene);
                //this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: "r" }, function (evt) {
                //console.log("typing r...");
                //console.log(evt);
                //if (evt.sourceEvent.key == "r") {
                //}
                //}));
                //this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                //console.log(" OnKeyUpTrigger typing...");
                //console.log(evt);
                //if (evt.sourceEvent.key == "r") {
                //}
                //}));
                //this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                //console.log(" OnKeyDownTrigger typing...");
                //console.log(evt);
                //if (evt.sourceEvent.key == "r") {
                //}
                //}));
                //box1.actionManager = new BABYLON.ActionManager(this.scene);
                //console.log(box1);
                //box1.actionManager.registerAction(new BABYLON.ExecuteCodeAction("trigger", function () {
                //alert('player clicked');
                //console.log("trigger!");
                //}));
                //box1.actionManager.processTrigger("trigger",()=>{});
                //setInterval(()=> {
                //code for the drums playing goes here
                //box1.actionManager.processTrigger("trigger",()=>{});
                //},8000);
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
                //this.create_gamepadinput();
                //this.create_movement();
                //this.ScenePickObject();
                //this.simple_scene();
                //this.simpleterrain()
                //this.simpleterrain01();
                this.simpleterrain03();
                //this.simpleterrain04();
                //this.spawn_character({y:32});
                var npc = this.spawn_character({ y: 64 });
                console.log(npc);
                npc.status.bshop = true;
                var item0 = new _RPGItem.RPGItem({ name: "Potion MP" });
                npc.status.shop.push(item0);
                this.spawn_character({ y: 32, bplayer: true });
                //console.log(player);
                //this.create_character();
                //this.loadmap_requestXML();
                /*
                var panel_group2d = new BABYLON.Group2D({
                    parent:this.screencanvas,
                    id:"panel_group2d"+"test",
                    marginAlignment: "h: left, v: top",
                    height:100,
                    width:100
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });
                var panel = this.create_R2D_Drag01(panel_group2d,{text:'DISPLAY',x:0,y:0,width:500});
                */
            }
        }]);

        return Babylonjs_game;
    }(_babylonjs_framework.Babylonjs_framework);
});