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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (function (c) {
        idx++;
        var r = buf[idx >> 3] >> idx % 8 * 4 & 15;
        var v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    }));
};

//console.log(uuid());

var ObjectRPGID = function ObjectRPGID(args) {
    _classCallCheck(this, ObjectRPGID);

    this.hashid = "";
    this.id = "";
    this.name = "none";
    this.description = "none";
    this.objtype = "none";
    this.gundbid = "";
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

        var _this = _possibleConstructorReturn(this, (RPGCondition.__proto__ || Object.getPrototypeOf(RPGCondition)).call(this, args));

        _this.params = [];
        return _this;
    }

    return RPGCondition;
})(ObjectRPGID);

var RPGSkill = (function (_ObjectRPGID2) {
    _inherits(RPGSkill, _ObjectRPGID2);

    function RPGSkill(args) {
        _classCallCheck(this, RPGSkill);

        return _possibleConstructorReturn(this, (RPGSkill.__proto__ || Object.getPrototypeOf(RPGSkill)).call(this, args));
    }

    return RPGSkill;
})(ObjectRPGID);

var RPGItem = (function (_ObjectRPGID3) {
    _inherits(RPGItem, _ObjectRPGID3);

    function RPGItem(args) {
        _classCallCheck(this, RPGItem);

        return _possibleConstructorReturn(this, (RPGItem.__proto__ || Object.getPrototypeOf(RPGItem)).call(this, args));
    }

    return RPGItem;
})(ObjectRPGID);

var RPGEquip = (function (_RPGItem) {
    _inherits(RPGEquip, _RPGItem);

    function RPGEquip(args) {
        _classCallCheck(this, RPGEquip);

        var _this4 = _possibleConstructorReturn(this, (RPGEquip.__proto__ || Object.getPrototypeOf(RPGEquip)).call(this, args));

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

        var _this5 = _possibleConstructorReturn(this, (RPGWeapon.__proto__ || Object.getPrototypeOf(RPGWeapon)).call(this, args));

        _this5.stats = new RPGStats();
        _this5.params = [];
        return _this5;
    }

    return RPGWeapon;
})(RPGEquip);

var RPGMesh = (function (_ObjectRPGID4) {
    _inherits(RPGMesh, _ObjectRPGID4);

    function RPGMesh(args) {
        _classCallCheck(this, RPGMesh);

        return _possibleConstructorReturn(this, (RPGMesh.__proto__ || Object.getPrototypeOf(RPGMesh)).call(this, args));
    }

    return RPGMesh;
})(ObjectRPGID);

var RPGLight = (function (_ObjectRPGID5) {
    _inherits(RPGLight, _ObjectRPGID5);

    function RPGLight(args) {
        _classCallCheck(this, RPGLight);

        return _possibleConstructorReturn(this, (RPGLight.__proto__ || Object.getPrototypeOf(RPGLight)).call(this, args));
    }

    return RPGLight;
})(ObjectRPGID);

var RPGCamera = (function (_ObjectRPGID6) {
    _inherits(RPGCamera, _ObjectRPGID6);

    function RPGCamera(args) {
        _classCallCheck(this, RPGCamera);

        return _possibleConstructorReturn(this, (RPGCamera.__proto__ || Object.getPrototypeOf(RPGCamera)).call(this, args));
    }

    return RPGCamera;
})(ObjectRPGID);

var RPGMaterial = (function (_ObjectRPGID7) {
    _inherits(RPGMaterial, _ObjectRPGID7);

    function RPGMaterial(args) {
        _classCallCheck(this, RPGMaterial);

        return _possibleConstructorReturn(this, (RPGMaterial.__proto__ || Object.getPrototypeOf(RPGMaterial)).call(this, args));
    }

    return RPGMaterial;
})(ObjectRPGID);

var RPGTexture = (function (_ObjectRPGID8) {
    _inherits(RPGTexture, _ObjectRPGID8);

    function RPGTexture(args) {
        _classCallCheck(this, RPGTexture);

        return _possibleConstructorReturn(this, (RPGTexture.__proto__ || Object.getPrototypeOf(RPGTexture)).call(this, args));
    }

    return RPGTexture;
})(ObjectRPGID);

var RPGStatus = (function (_ObjectRPGID9) {
    _inherits(RPGStatus, _ObjectRPGID9);

    function RPGStatus(args) {
        _classCallCheck(this, RPGStatus);

        var _this11 = _possibleConstructorReturn(this, (RPGStatus.__proto__ || Object.getPrototypeOf(RPGStatus)).call(this, args));

        _this11.stats = new RPGStats();

        _this11.health = 5;
        _this11.maxhealth = 5;

        _this11.magic = 0;
        _this11.magicmax = 0;

        _this11.stamina = 100;
        _this11.maxstamina = 100;

        _this11.psyche = 100;
        _this11.maxpsyche = 100;

        _this11.conditions = [];
        _this11.skills = [];
        _this11.inventory = [];
        _this11.equipments = [];

        _this11.speed = 1;
        _this11.criticalhit = 1;

        _this11.attack = 1;
        _this11.defense = 0;

        _this11.magicattack = 0;
        _this11.magicdefense = 0;

        _this11.totalattack = 1;
        _this11.totaldefense = 0;

        _this11.totalmagicattack = 0;
        _this11.totalmagicdefense = 0;

        _this11.queryaction = ""; //attack, skill
        _this11.target = null;
        _this11.targets = null;
        _this11.targettype = "single"; //single, multiples, selected, area
        _this11.readyaction = false;
        _this11.finishaction = false;

        _this11.mesh = null;
        _this11.bphysics = true;
        _this11.isdead = false;
        _this11.targets = [];

        //this.isfinishanimation = false;
        //this.isactionfinish = false;
        _this11.isturnfinish = false;
        _this11.bskipturn = false;

        if (args != null) {
            if (args['attack'] != null) {
                _this11.attack = args['attack'];
            }
            if (args['defense'] != null) {
                _this11.defense = args['defense'];
            }

            if (args['health'] != null) {
                _this11.health = args['health'];
            }
        }
        return _this11;
    }

    return RPGStatus;
})(ObjectRPGID);

var Babylonjs_game = (function (_Babylonjsbes) {
    _inherits(Babylonjs_game, _Babylonjsbes);

    function Babylonjs_game(args) {
        _classCallCheck(this, Babylonjs_game);

        var _this12 = _possibleConstructorReturn(this, (Babylonjs_game.__proto__ || Object.getPrototypeOf(Babylonjs_game)).call(this, args));

        _this12.materials = [];
        _this12.textures = [];
        _this12.meshes = [];
        _this12.models = [];

        _this12.characters = [];
        _this12.dimensionstorage = [];

        _this12.companions = []; //those who join in your party that travel together
        _this12.squads = [];

        _this12.friends = []; //battle mode?
        _this12.foes = []; //battle mode?

        _this12.turns = [];
        _this12.parties = []; //who in the party //battle mode?
        _this12.enemies = []; //threat if player attack or in battle actions //battle mode?
        _this12.npcs = []; //local villagers

        _this12.scene_battle;
        _this12.scene_dimension_homebase;
        _this12.scene_global_map;
        _this12.scene_world_map;
        _this12.scene_local_map;

        _this12.sceneassets;
        _this12.assetsManager;
        _this12.config_assets;
        //controls
        _this12.controllerid = 0;
        _this12.keys = { letft: 0, right: 0, forward: 0, back: 0 };
        _this12.moveVector = new BABYLON.Vector3(0, 0, 0);

        _this12.leftstickmove = false;
        _this12.joyleftdir = new BABYLON.Vector3(0, 0, 0);
        _this12.joylefttrigger = 0;
        _this12.joyrightdir = new BABYLON.Vector3(0, 0, 0);
        _this12.joyrighttrigger = 0;

        //EDITOR props
        //this.text2D;
        _this12.selectobject = null;

        _this12.selectobject_text_id = null;

        _this12.selectobject_text_px = null;
        _this12.selectobject_text_py = null;
        _this12.selectobject_text_pz = null;

        _this12.selectobject_text_rx = null;
        _this12.selectobject_text_ry = null;
        _this12.selectobject_text_rz = null;

        _this12.selectobject_text_sx = null;
        _this12.selectobject_text_sy = null;
        _this12.selectobject_text_sz = null;

        _this12.scriptcount = 0;
        self.mappdata = {};

        return _this12;
    }

    _createClass(Babylonjs_game, [{
        key: 'createscene_assets',
        value: function createscene_assets() {
            var self = this;
            console.log("adding preload assets...");

            this.assetsManager = new BABYLON.AssetsManager(this.scene);

            var filepath = "block_character03.babylon";
            var objectname = "CubeBody";

            var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
            meshTask.onSuccess = function (task) {
                //task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
                task.loadedMeshes[0].position = new BABYLON.Vector3(0, 2, 3);
                //console.log(task.loadedMeshes[0].position);
                task.loadedMeshes[0].isVisible = false;
                self.meshes.push(task.loadedMeshes[0]);
                self.models.push({ mesh: task.loadedMeshes[0], skeleton: null });
            };

            filepath = "arm_cube.babylon";
            objectname = "Cube";

            var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
            meshTask2.onSuccess = function (task) {
                //task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
                task.loadedMeshes[0].isVisible = false;
                self.meshes.push(task.loadedMeshes[0]);
                self.models.push({ mesh: task.loadedMeshes[0], skeleton: null });
            };

            this.assetsManager.onFinish = function (tasks) {
                console.log('assets loaded!');
                self.setup_game();
                //self.engine.hideLoadingUI();
                //self.loadmap_requestXML();
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
    }, {
        key: 'loadmap_requestXML',
        value: function loadmap_requestXML() {
            console.log("init map json load...");
            var self = this;
            var req = new XMLHttpRequest();
            req.open('GET', 'http://127.0.0.1/prototype.json');
            req.onreadystatechange = function () {
                //alert(req.responseText);
                //console.log(req.responseText);
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        //alert(req.responseText);
                        //console.log(req.responseText);
                        self.prase_mapjson(req.responseText);
                        //console.log("done loading?");
                    }
                } else {
                        //alert("Error loading page\n");
                        //console.log("Error loading page\n");
                    }
            };
            req.send();
        }
    }, {
        key: 'prase_mapjson',
        value: function prase_mapjson(stringdata) {
            console.log("init string map");
            var self = this;
            var mappdata = self.mappdata;
            var scriptcount = self.scriptcount;

            var modelfiles = [];
            var modelcount = 0;

            mappdata = JSON.parse(stringdata);
            if (mappdata == null) {
                console.log("error!");
                return;
            }
            //console.log(mappdata);
            scriptcount = 0;

            loadentities();

            //load 3d models and texture a
            function loadmodelfiles() {
                console.log("init models loading files");
                if (mappdata.assets != null) {
                    console.log("Assets files: " + mappdata.assets.length);
                    //if there no model files
                    if (mappdata.assets.length == 0) {
                        loadscriptfiles();
                    }

                    for (var i = 0; i < mappdata.assets.length; i++) {
                        console.log(mappdata.assets[i]);
                        if (mappdata.assets[i].type == "model") {
                            modelfiles.push(mappdata.assets[i]);
                            //modelcount += 1;
                        }
                    }

                    //console.log("model checking...");
                    for (var mi = 0; mi < modelfiles.length; mi++) {
                        //console.log(modelfiles[mi].uuid);
                        var _id = modelfiles[mi].uuid;
                        var _name = modelfiles[mi].path;
                        //console.log('//=========================');
                        //console.log(modelfiles[mi].path);
                        /*
                        threejsapi.LoadModelFile(modelfiles[mi],(object)=>{
                        console.log('//========================================');
                        //console.log(object.name);//console.log(object.uuid);
                        console.log(object);
                        modelcount++;
                        console.log("models: "+modelcount + ":" +(modelfiles.length));
                        if(modelcount == modelfiles.length){
                        //console.log('Finish loading file models!');
                        //console.log('init scripts!');
                        loadscriptfiles();
                        }
                        });
                        */
                    }
                }
            }

            //load scripts
            function loadscriptfiles() {
                if (mappdata.scripts != null) {
                    console.log("init script loading files...");
                    console.log("Scripts files: " + mappdata.scripts.length);
                    if (mappdata.scripts.length == 0) {
                        loadentities();
                    }
                    for (var i = 0; i < mappdata.scripts.length; i++) {
                        //threejsapi.addScript(mappdata.scripts[i]);
                        loadScript(mappdata.scripts[i], (function () {
                            //initialization code
                            scriptcount++;
                            //console.log("script: "+scriptcount + ":" + (mappdata.scripts.length));
                            if (scriptcount == mappdata.scripts.length) {
                                //make sure the scripts are load else it can't used script components
                                //console.log('Finish script components!');
                                //console.log('init load entities!');
                                loadentities();
                            }
                        }));
                    }
                }
            }
            //load entities
            function loadentities() {
                console.log('loading entities?');
                if (mappdata.entities != null) {
                    console.log("Entities count:" + mappdata.entities.length);
                    for (var i = 0; i < mappdata.entities.length; i++) {
                        //threejsapi.parseObject(mappdata.entities[i]);
                        self.parse_object(mappdata.entities[i]);
                    }
                    console.log('Finish loading!');

                    //self.hideloadingscreen();

                    //self.loadScript("/assets/test1.js", function(){
                    //initialization code
                    //console.log("test? js");
                    //});
                    //console.log(threejsapi);
                }
                self.setup_game();
            }
        }
    }, {
        key: 'getmesh',
        value: function getmesh(_name) {
            var model = null;
            for (var i = 0; i < this.models.length; i++) {
                if (this.models[i].mesh.name == _name) {
                    var mid = uuid(); //random id generator
                    //model = this.meshes[i].clone(mid,null,true);
                    model = this.models[i].mesh.clone("mesh" + mid);
                    var mid = uuid(); //random id generator
                    model.position = new BABYLON.Vector3(0, 0, 3);
                    model.skeleton = this.models[i].mesh.skeleton.clone("skeleton" + mid);
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
    }, {
        key: 'createbattle_prototype',
        value: function createbattle_prototype() {
            var self = this;
            var player = new RPGStatus({ name: "player", health: 10 });
            //console.log(this.assetsManager);

            var model = this.getmesh("CubeBody");
            //console.log(model);
            if (model != null) {
                model.rpgstatus = player;
                console.log(player);
                player.mesh = model;
                player.mesh.isVisible = true;
                player.mesh.position.x = 3;
                player.mesh.position.z = 0;
                player.mesh.position.y = 0;
                player.mesh.rotation.y = Math.PI / 2; //90
                this.create_spaceworld_status(self.scene, player.mesh, player);
            }
            this.parties.push(player);

            var enemy = new RPGStatus({ name: "enemy", health: 1 });
            console.log(enemy);
            var model2 = this.getmesh("CubeBody");
            if (model2 != null) {
                model2.rpgstatus = enemy;
                enemy.mesh = model2;
                model2.isVisible = true;
                model2.position.x = -3;
                model2.position.z = 0;
                model2.position.y = 0;
                model2.rotation.y = Math.PI / 2 * -1; //-90
                this.create_spaceworld_status(this.scene, model2, enemy);
            }
            this.enemies.push(enemy);

            player.targets.push(enemy);
            enemy.targets.push(player);

            this.turns.push(player);
            this.turns.push(enemy);

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
        key: 'createspacecavnas2D',
        value: function createspacecavnas2D() {
            //screenCanvas
            this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
                id: "ScreenCanvas",
                enableInteraction: true //,
            });
            //console.log(this.screencanvas);
        }
    }, {
        key: 'create2DHUD',
        value: function create2DHUD() {
            var self = this;
            var screencanvas_group2d = new BABYLON.Group2D({
                parent: this.screencanvas,
                id: "screencanvas_group2d",
                marginAlignment: "h: left, v: top"
                //scale:0.6 //limited since backgroundRoundRadius effect render
                //scale:1 //limited since backgroundRoundRadius effect render
            });

            new BABYLON.Rectangle2D({
                parent: screencanvas_group2d, id: "R2DHealth", x: 10, y: -32, width: 64, height: 28, fill: "#263238FF",
                children: [new BABYLON.Text2D("Health:", { x: 5, y: 0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            new BABYLON.Rectangle2D({
                parent: screencanvas_group2d, id: "R2DMagic", x: 10, y: -64, width: 64, height: 28, fill: "#263238FF",
                children: [new BABYLON.Text2D("Magic:", { x: 5, y: 0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            new BABYLON.Rectangle2D({
                parent: screencanvas_group2d, id: "R2DStamina", x: 10, y: -96, width: 64, height: 28, fill: "#263238FF",
                children: [new BABYLON.Text2D("Stamina:", { x: 5, y: 0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
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
                parent: this.screencanvas,
                id: "screencanvas_group2d_RT",
                marginAlignment: "h: right, v: top"
                //scale:0.6 //limited since backgroundRoundRadius effect render
                //scale:1 //limited since backgroundRoundRadius effect render
            });

            new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RT, id: "R2DStamina", x: -36, y: -42, width: 32, height: 32, fill: "#263238FF"
            });

            // LEFT BOTTOM
            var screencanvas_group2d_LB = new BABYLON.Group2D({
                parent: this.screencanvas,
                id: "screencanvas_group2d_LB",
                marginAlignment: "h: left, v: bottom"
                //scale:0.6 //limited since backgroundRoundRadius effect render
                //scale:1 //limited since backgroundRoundRadius effect render
            });

            new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_LB, id: "R2DStamina", x: 8, y: 8, width: 48, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Chat:", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            // RIGHT BOTTOM
            var screencanvas_group2d_RB = new BABYLON.Group2D({
                parent: this.screencanvas,
                id: "screencanvas_group2d_RB",
                marginAlignment: "h: right, v: bottom"
                //scale:0.6 //limited since backgroundRoundRadius effect render
                //scale:1 //limited since backgroundRoundRadius effect render
            });

            var R2DEditor = new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RB, id: "R2DEditor", x: -36 + 64 * 1 * -1, y: 4, width: 52, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Editor", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            R2DEditor.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                console.log("R2DEditor clicked!");
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            var R2DSettings = new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RB, id: "R2DSettings", x: -36 + 64 * 2 * -1, y: 4, width: 52, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Settings", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            R2DSettings.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                console.log("R2DSettings clicked!");
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            var R2DMap = new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RB, id: "R2DMap", x: -36 + 64 * 3 * -1, y: 4, width: 52, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Map", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            R2DMap.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                console.log("R2DMap clicked!");
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            var R2DSkills = new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RB, id: "R2DSkills", x: -36 + 64 * 4 * -1, y: 4, width: 52, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Skills", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            R2DSkills.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                console.log("R2DSkills clicked!");
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            var R2DItems = new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RB, id: "R2DItems", x: -36 + 64 * 5 * -1, y: 4, width: 52, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Items", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            R2DItems.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                console.log("R2DItems clicked!");
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            var R2DHome = new BABYLON.Rectangle2D({
                parent: screencanvas_group2d_RB, id: "R2DHome", x: -36 + 64 * 6 * -1, y: 4, width: 52, height: 32, fill: "#263238FF",
                children: [new BABYLON.Text2D("Home", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            R2DHome.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                console.log("R2DHome clicked!");
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            //this.setupeditor();
        }
    }, {
        key: 'setupeditor',
        value: function setupeditor() {
            var self = this;
            var editor_group2d = new BABYLON.Group2D({
                parent: this.screencanvas,
                id: "screencanvas_group2d",
                marginAlignment: "h: left, v: top"
                //scale:0.6 //limited since backgroundRoundRadius effect render
                //scale:1 //limited since backgroundRoundRadius effect render
            });

            var panel = this.create_R2D_Drag01(editor_group2d, { text: 'Drag Panel', x: 10, y: -142 });

            //tab
            this.create_R2D_Text01(panel, { text: "Object", balign: true, x: 10, y: -32 * 1, width: 70 });
            this.create_R2D_Text01(panel, { text: "Transform", balign: true, x: 84, y: -32 * 1, width: 70 });
            this.create_R2D_Text01(panel, { text: "Materials", balign: true, x: 158, y: -32 * 1, width: 70 });
            this.create_R2D_Text01(panel, { text: "Scripts", balign: true, x: 234, y: -32 * 1, width: 70 });
            this.create_R2D_Text01(panel, { text: "Animations", balign: true, x: 308, y: -32 * 1, width: 70 });

            //props
            var _obj = null;
            this.create_R2D_Text01(panel, { text: "ID:", x: 10, y: -32 * 2 });
            _obj = this.create_R2D_TextInput01(panel, { text: "None", x: 34, y: -32 * 2, returnarray: true });
            this.selectobject_text_id = _obj[1];

            this.create_R2D_Text01(panel, { text: "px", x: 10, y: -32 * 3 });
            _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 3, returnarray: true });
            this.selectobject_text_px = _obj[1];
            this.create_R2D_Text01(panel, { text: "py", x: 10, y: -32 * 4 });
            _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 4, returnarray: true });
            this.selectobject_text_py = _obj[1];
            this.create_R2D_Text01(panel, { text: "pz", x: 10, y: -32 * 5 });
            _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 5, returnarray: true });
            this.selectobject_text_pz = _obj[1];

            this.create_R2D_Text01(panel, { text: "rx", x: 10, y: -32 * 6 });
            _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 6, returnarray: true });
            this.selectobject_text_rx = _obj[1];
            this.create_R2D_Text01(panel, { text: "ry", x: 10, y: -32 * 7 });
            _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 7, returnarray: true });
            this.selectobject_text_ry = _obj[1];
            this.create_R2D_Text01(panel, { text: "rz", x: 10, y: -32 * 8 });
            _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 8, returnarray: true });
            this.selectobject_text_rz = _obj[1];

            this.create_R2D_Text01(panel, { text: "sx", x: 10, y: -32 * 9 });
            _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 9, returnarray: true });
            this.selectobject_text_sx = _obj[1];
            this.create_R2D_Text01(panel, { text: "sy", x: 10, y: -32 * 10 });
            _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 10, returnarray: true });
            this.selectobject_text_sy = _obj[1];
            this.create_R2D_Text01(panel, { text: "sz", x: 10, y: -32 * 11 });
            _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 11, returnarray: true });
            this.selectobject_text_sz = _obj[1];
        }
    }, {
        key: 'create_R2D_Drag01',
        value: function create_R2D_Drag01(_parent, args) {
            //RIGHT TOP DRAG
            var self = this;
            if (args == null) {
                args = {};
            };

            var _x = typeof args['x'] === 'number' ? args['x'] : 0; //rect position
            var _y = typeof args['y'] === 'number' ? args['y'] : 0;
            var _width = typeof args['width'] === 'number' ? args['width'] : 128; //rect size
            var _height = typeof args['height'] === 'number' ? args['height'] : 32;

            var _text = typeof args['text'] === 'string' ? args['text'] : 'Drag';

            var panel = new BABYLON.Rectangle2D({
                parent: _parent, id: "R2Dpanel", x: _x, y: _y, width: _width, height: _height, fill: "#263238FF"
            });

            var paneldrag = new BABYLON.Rectangle2D({
                parent: panel, id: "R2Dpaneldrag", x: 0, y: 0, width: _width - 4, height: _height - 4, fill: "#455A64FF",
                children: [new BABYLON.Text2D(_text, { x: 5, y: 0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
            });

            panel.bdrag = false;
            panel.dragpostion = new BABYLON.Vector2(0, 0);

            paneldrag.pointerEventObservable.add((function (d, s) {
                //button2Rect.levelVisible = !button2Rect.levelVisible;
                //console.log("PointerDown!");
                //console.log(d);
                //console.log(buttonRect);
                panel.bdrag = true;
                panel.dragpostion = d.primitivePointerPos;
            }), BABYLON.PrimitivePointerInfo.PointerDown);

            paneldrag.pointerEventObservable.add((function (d, s) {
                //console.log("PointerUp!");
                panel.bdrag = false;
            }), BABYLON.PrimitivePointerInfo.PointerUp);
            //console.log(this.engine);
            //this.screencanvas.size.height
            //this.screencanvas.viewportSize.height
            paneldrag.pointerEventObservable.add((function (d, s) {
                //console.log(d.canvasPointerPos);
                //console.log(d.primitivePointerPos);
                if (panel.bdrag) {
                    panel.x = d.canvasPointerPos.x - panel.dragpostion.x;
                    panel.y = -(self.screencanvas.size.height - (d.canvasPointerPos.y + panel.dragpostion.y) + 32);
                }
            }), BABYLON.PrimitivePointerInfo.PointerMove);

            paneldrag.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, panel, "bdrag", false));

            return panel;
        }
    }, {
        key: 'create_R2D_Text01',
        value: function create_R2D_Text01(_parent, args) {
            if (args == null) {
                args = {};
            };
            var panel;
            //console.log(typeof args['color']);
            var _color = typeof args['color'] === 'string' ? args['color'] : '#263238FF';
            var _width = typeof args['width'] === 'number' ? args['width'] : 128;
            var _height = typeof args['height'] === 'number' ? args['height'] : 32;
            var _x = typeof args['x'] === 'number' ? args['x'] : 0; //rect position
            var _y = typeof args['y'] === 'number' ? args['y'] : 0;
            var _tx = typeof args['tx'] === 'number' ? args['tx'] : 2; //text position
            var _ty = typeof args['ty'] === 'number' ? args['ty'] : 0;
            var _text = typeof args['text'] === 'string' ? args['text'] : 'none';
            //console.log(typeof args['balign']);
            var _balign = typeof args['balign'] === 'boolean' ? args['align'] : false;

            var _config = {};
            _config['fontName'] = "10pt Arial";
            if (_balign) {
                _config['marginAlignment'] = "h: center, v: center";
            } else {
                _config['x'] = _tx;
                _config['y'] = _ty;
            }
            var text2d = new BABYLON.Text2D(_text, _config);

            panel = new BABYLON.Rectangle2D({
                parent: _parent, id: "R2D" + _text, x: _x, y: _y, width: _width, height: _height, fill: _color,
                children: [text2d]
            });
            return panel;
        }
    }, {
        key: 'create_R2D_TextInput01',
        value: function create_R2D_TextInput01(_parent, args) {
            var self = this;
            if (args == null) {
                args = {};
            };
            var panel;
            //console.log(typeof args['color']);
            var _color = typeof args['color'] === 'string' ? args['color'] : '#263238FF';
            var _width = typeof args['width'] === 'number' ? args['width'] : 128;
            var _height = typeof args['height'] === 'number' ? args['height'] : 32;
            var _x = typeof args['x'] === 'number' ? args['x'] : 0; //rect position
            var _y = typeof args['y'] === 'number' ? args['y'] : 0;
            var _tx = typeof args['tx'] === 'number' ? args['tx'] : 2; //text position
            var _ty = typeof args['ty'] === 'number' ? args['ty'] : 0;
            var _text = typeof args['text'] === 'string' ? args['text'] : 'none';
            //console.log(typeof args['balign']);
            var _balign = typeof args['balign'] === 'boolean' ? args['align'] : false;
            var _returnarray = typeof args['returnarray'] === 'boolean' ? args['returnarray'] : false;

            var _config = {};
            _config['fontName'] = "10pt Arial";
            if (_balign) {
                _config['marginAlignment'] = "h: center, v: center";
            } else {
                _config['x'] = _tx;
                _config['y'] = _ty;
            }
            var text2d = new BABYLON.Text2D(_text, _config);

            panel = new BABYLON.Rectangle2D({
                parent: _parent, id: "R2D" + _text, x: _x, y: _y, width: _width, height: _height, fill: _color,
                children: [text2d]
            });
            //console.log(text2d);
            function TextInputKey(e) {
                console.log(e.keyCode);
                if (e.keyCode == 8) {
                    //console.log('BACKSPACE was pressed');
                    var llen = text2d.text.length;
                    //text2d.text = text2d.text.substring(1, llen);//first letter
                    text2d.text = text2d.text.substring(0, llen - 1); //last letter
                    // Call event.preventDefault() to stop the character before the cursor
                    // from being deleted. Remove this line if you don't want to do that.
                    e.preventDefault();
                }
                if (e.keyCode == 46) {
                    //console.log('DELETE was pressed');
                    // Call event.preventDefault() to stop the character after the cursor
                    // from being deleted. Remove this line if you don't want to do that.
                    e.preventDefault();
                }

                if (e.keyCode == 13) {
                    //console.log('DELETE was pressed');
                    // Call event.preventDefault() to stop the character after the cursor
                    // from being deleted. Remove this line if you don't want to do that.
                    //console.log('remove listener');
                    document.removeEventListener("keydown", TextInputKey);
                    e.preventDefault();
                }

                var txt = String.fromCharCode(e.which);
                console.log(txt + ' : ' + e.which);

                if (!txt.match(/[A-Za-z0-9+#.]/)) {
                    return false;
                } else {
                    //console.log("TYPEING?");
                    text2d.text = text2d.text + txt;
                }
                //console.log("test?");
            }

            panel.pointerEventObservable.add((function (d, s) {
                //console.log("PointerDown!");
                //window.addEventListener("keypress",TextInputKey );
            }), BABYLON.PrimitivePointerInfo.PointerDown);

            panel.pointerEventObservable.add((function (d, s) {
                //console.log("PointerUp!");
                document.addEventListener("keydown", TextInputKey);
            }), BABYLON.PrimitivePointerInfo.PointerUp);

            panel.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (evt) {
                //console.log("out!");
                document.removeEventListener("keydown", TextInputKey);
            }));

            if (_returnarray) {
                return [panel, text2d];
            } else {
                return panel;
            }
        }

        //TextInputKey(e){
        //if(e.keyCode === 8 && document.activeElement !== 'text') {
        //e.preventDefault();
        //alert('Prevent page from going back');
        //}
        //console.log("test?");
        //}


    }, {
        key: 'actionbattle',
        value: function actionbattle() {
            console.log("action battle ...");
            console.log(this.parties[0]);
            //check if party health is not zero for attack
            //this.opponentAttack(this.parties[0],this.enemies[0]);
            //this.opponentAttack(this.enemies[0],this.parties[0]);
            this.checkcharacter_turns();
        }
    }, {
        key: 'opponentAttack',
        value: function opponentAttack(_Attack, _defender) {
            console.log("opponentAttack ...");
            if (_Attack.health > 0) {
                _defender.health = _defender.health - _Attack.attack;
            }
            if (_defender.health <= 0) {
                _defender.health = 0;
            }
        }
    }, {
        key: 'setupbattle',
        value: function setupbattle() {
            console.log("set up");
        }
    }, {
        key: 'createbattle',
        value: function createbattle() {
            console.log("create battle");
        }
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
            //var self = this;
            //console.log("action player attack ...");
            //console.log(  this.parties[0].mesh.uniqueId   );
            //self.scene.beginAnimation(this.parties[0].mesh.skeleton, 0, 10, false, 0.5); //works /// works
            //this.opponentAttack(this.parties[0],this.enemies[0]);
            //this.opponentAttack(this.enemies[0],this.parties[0]);
            //this.checkcharacter_turns();
        }
    }, {
        key: 'actionenemyattack',
        value: function actionenemyattack() {
            var _this13 = this;

            var self = this;
            console.log("action enemy attack ...");
            self.scene.beginAnimation(this.enemies[0].mesh.skeleton, 0, 10, false, 0.5, (function () {
                console.log("finish attack");
                self.opponentAttack(_this13.enemies[0], _this13.parties[0]);
                self.enemies[0].isturnfinish = true;

                self.scene.beginAnimation(_this13.parties[0].mesh.skeleton, 30, 40, false, 0.5, (function () {
                    self.checkcharacters_battle();
                }));
            })); //works
            //this.opponentAttack(this.parties[0],this.enemies[0]);
        }
    }, {
        key: 'actionmove',
        value: function actionmove() {
            console.log("action move ...");
            //console.log(this.parties[0]);
        }
    }, {
        key: 'actionescape',
        value: function actionescape() {
            console.log("action escape ...");
            //console.log(this.parties[0]);
        }
    }, {
        key: 'playattackaction',
        value: function playattackaction() {
            console.log("player attack action");
        }
    }, {
        key: 'characteraction_turn',
        value: function characteraction_turn(currentcharacter) {
            var self = this;
            console.log("action enemy attack ...");
            //attack
            if (currentcharacter.health <= 0) {
                currentcharacter.isturnfinish = true;
                self.checkcharacters_battle();
            } else {
                if (currentcharacter.targets[0].health <= 0) {
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
                } else {
                    self.scene.beginAnimation(currentcharacter.mesh.skeleton, 0, 10, false, 0.5, (function () {
                        console.log("finish attack");
                        self.opponentAttack(currentcharacter, currentcharacter.targets[0]);
                        currentcharacter.isturnfinish = true;
                        //being hit
                        self.scene.beginAnimation(currentcharacter.targets[0].mesh.skeleton, 30, 40, false, 0.5, (function () {
                            self.checkcharacters_battle();
                        }));
                    })); //works
                }
            }
        }
    }, {
        key: 'checkcharacter_turns',
        value: function checkcharacter_turns() {
            for (var i = 0; i < this.turns.length; i++) {
                if (this.turns[i].isturnfinish == false) {
                    console.log("start current turn character");
                    console.log(this.turns[i].name);
                    this.characteraction_turn(this.turns[i]);
                    break;
                }
            }
        }
    }, {
        key: 'checkcharacters_battle',
        value: function checkcharacters_battle() {
            console.log("checking...");
            var count = 0;
            var bfinishturns = false;

            for (var i = 0; i < this.turns.length; i++) {
                console.log(this.turns[i].name + ":" + this.turns[i].isturnfinish);
                if (this.turns[i].isturnfinish == true) {
                    count += 1;
                }
            }

            if (count == this.turns.length) {
                bfinishturns = true;
            }
            //console.log(count + ":" + this.turns.length);

            console.log("bfinishturns:" + bfinishturns);
            if (bfinishturns) {
                console.log("done!");
                this.battle_turnreset();
            } else {
                console.log("next action attack for character!");
                this.checkcharacter_turns();
            }
            bfinishturns = null;
            count = null;
        }
    }, {
        key: 'battle_turnreset',
        value: function battle_turnreset() {
            for (var pi = 0; pi < this.parties.length; pi++) {
                if (this.parties[pi].isturnfinish == true) {
                    this.parties[pi].isturnfinish = false;
                }
            }

            for (var pi = 0; pi < this.enemies.length; pi++) {
                if (this.enemies[pi].isturnfinish == true) {
                    this.enemies[pi].isturnfinish = false;
                }
            }
        }
    }, {
        key: 'create2D_BattleHUD',
        value: function create2D_BattleHUD() {
            var self = this;
            //button
            this.AddButton(this.screencanvas, 'button_escape', 'Escape', 10, 22 * 0 + 10, (function () {
                self.actionescape();
            }));
            this.AddButton(this.screencanvas, 'button_item', 'Items', 10, 22 * 1 + 10, (function () {
                self.openitem();
            }));
            this.AddButton(this.screencanvas, 'button_skills', 'Skills', 10, 22 * 2 + 10, (function () {
                self.openskills();
            }));
            this.AddButton(this.screencanvas, 'button_move', 'Move', 10, 22 * 3 + 10, (function () {
                self.openitem();
            }));
            this.AddButton(this.screencanvas, 'button_attack', 'Attack', 10, 22 * 4 + 10, (function () {
                self.actionattack();
            }));

            this.AddButton(this.screencanvas, 'button_attack', 'Enemy Attack', 150, 22 * 4 + 10, (function () {
                self.actionenemyattack();
            }));

            this.AddButton(this.screencanvas, 'button_battle', 'Battle', 10, 22 * 5 + 10, (function () {
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
    }, {
        key: 'create_movement',
        value: function create_movement() {
            var self = this;

            var camera = new BABYLON.ArcRotateCamera("arcCamera1", 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
            camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
            camera.attachControl(this.canvas, false);
            camera.setPosition(new BABYLON.Vector3(0, 5, 5));
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

            var model = this.create_character({ x: 0, y: 0.5, z: 0 });

            this.controllerid = model.id;
            this.model = model;
            camera.setTarget(model);
        }
    }, {
        key: 'create_character',
        value: function create_character(args) {
            args = args || {};
            var self = this;
            var tmpmodel = this.getmesh("CubeBody");
            tmpmodel.isVisible = true;
            var objphysics = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, this.scene);
            objphysics.isVisible = false;
            tmpmodel.objphysics = objphysics;
            tmpmodel.objtype = "npc";

            //console.log(tmpmodel.id);
            //console.log(tmpmodel.uniqueId);

            objphysics.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, move: true, restitution: 0, mass: 1, friction: 10 });
            //console.log(typeof args['x']);
            objphysics.position.x = typeof args['x'] === 'number' ? args['y'] : 4;
            objphysics.position.y = typeof args['y'] === 'number' ? args['y'] : 0.5;
            objphysics.position.z = typeof args['z'] === 'number' ? args['z'] : 0;
            //console.log(args['x'],":",args['y'],":",args['z']);
            //console.log(objphysics.position.x,":",objphysics.position.y,":",objphysics.position.z);
            objphysics.showBoundingBox = true;

            var keys = self.keys;
            tmpmodel.facedir = 0;
            var currentAngle = 0;

            var Material = new BABYLON.StandardMaterial("material", this.scene);
            Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

            var hit = BABYLON.Mesh.CreateBox("hit", 0.5, this.scene);
            hit.material = Material;

            tmpmodel.update = function () {
                //console.log(leftstickmove);
                //console.log(this.uniqueId);
                var needMove = false;
                if (self.controllerid == this.id) {
                    //vector forward direction
                    //this breaks
                    var forward = self.scene.activeCamera.getFrontPosition(1).subtract(self.scene.activeCamera.position).normalize();
                    forward.y = 0;
                    //get rotation dir
                    //var diffAngle = Math.atan2(-forward.x,-forward.z);
                    var diffAngle = Math.atan2(forward.x, forward.z);
                    //var currentAngle = 0;
                    if (keys.left) {
                        currentAngle = diffAngle + Math.PI / 2;
                        needMove = true;
                    }
                    if (keys.right) {
                        currentAngle = diffAngle - Math.PI / 2;
                        needMove = true;
                    }
                    if (keys.forward) {
                        currentAngle = diffAngle + Math.PI;;
                        needMove = true;
                    }
                    if (keys.back) {
                        currentAngle = diffAngle;
                        needMove = true;
                    }

                    //gamepad
                    if (self.leftstickmove) {
                        var joyangle = Math.atan2(self.joyleftdir.x, -self.joyleftdir.z);
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
                } else {
                    if (needMove == false) {
                        tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                    }

                    var objpos = tmpmodel.objphysics.position.clone();
                    objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                    tmpmodel.position = objpos;
                }
            };

            tmpmodel.interact = function () {
                //console.log("???" + model.facedir);
                var fdir = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -2), BABYLON.Matrix.RotationY(tmpmodel.facedir));
                var rayPick = new BABYLON.Ray(tmpmodel.objphysics.position, fdir, 2);
                var meshFound = self.scene.pickWithRay(rayPick, (function (item) {
                    //console.log(item.name);
                    if (item.name.indexOf("box") == 0) return true;else return false;
                }));
                if (meshFound != null && meshFound.pickedPoint != null) {
                    //console.log("found!");
                    hit.position = meshFound.pickedPoint;
                } else {
                    //console.log("not found!");
                }
                rayPick = null;
                fdir = null;
            };

            //var name = args['name'] || "none";
            //console.log(name)

            return tmpmodel;
        }
    }, {
        key: 'create_input',
        value: function create_input() {
            var self = this;

            //this.keys={letft:0,right:0,forward:0,back:0};
            window.addEventListener("keydown", handleKeyDown, false);
            window.addEventListener("keyup", handleKeyUp, false);
            function handleKeyDown(evt) {
                //console.log(evt.keyCode);
                if (evt.keyCode == 69) {
                    //E
                    if (self.model != null) {
                        if (typeof self.model.interact === 'function') {
                            self.model.interact();
                        }
                    }
                }

                if (evt.keyCode == 65) {
                    //A
                    self.keys.left = 1;
                    //console.log("left");
                }
                if (evt.keyCode == 68) {
                    //D
                    self.keys.right = 1;
                    //console.log("right");
                }
                if (evt.keyCode == 87) {
                    //W
                    self.keys.forward = 1;
                    //console.log("up");
                }
                if (evt.keyCode == 83) {
                    //S
                    self.keys.back = 1;
                    //console.log("down");
                }
            }

            function handleKeyUp(evt) {
                if (evt.keyCode == 65) {
                    self.keys.left = 0;
                }
                if (evt.keyCode == 68) {
                    self.keys.right = 0;
                }
                if (evt.keyCode == 87) {
                    self.keys.forward = 0;
                }
                if (evt.keyCode == 83) {
                    self.keys.back = 0;
                }
            }
        }
    }, {
        key: 'create_gamepadinput',
        value: function create_gamepadinput() {
            var self = this;
            var gamepadConnected = function gamepadConnected(gamepad) {
                console.log(gamepad);
                //console.log(gamepad.gamepad);
                if (typeof gamepad.onlefttriggerchanged === 'function') {
                    gamepad.onlefttriggerchanged((function (values) {
                        console.log(values);
                    }));
                } else {
                    console.log("left trigger function doesn't exist");
                }
                if (typeof gamepad.onrighttriggerchanged === 'function') {
                    gamepad.onrighttriggerchanged((function (values) {
                        console.log(values);
                    }));
                } else {
                    console.log("right trigger function doesn't exist");
                }

                gamepad.onleftstickchanged((function (values) {
                    self.leftstickmove = false;
                    if (values.y < 0.1 && values.y > -0.1) {} else {
                        //console.log("x: ",values.x, " y: " , values.y );
                        self.joyleftdir.z = values.y;
                        self.leftstickmove = true;
                    }
                    if (values.x < 0.1 && values.x > -0.1) {} else {
                        //console.log("x: ",values.x, " y: " , values.y );
                        self.joyleftdir.x = values.x;
                        self.leftstickmove = true;
                    }
                    //console.log("x: ",values.x, " y: " , values.y );
                }));

                gamepad.onrightstickchanged((function (values) {

                    if (values.y < 0.1 && values.y > -0.1) {} else {
                        //console.log("x: ",values.x, " y: " , values.y );
                        self.joyrightdir.y = values.y;
                    }
                    if (values.x < 0.1 && values.x > -0.1) {
                        //console.log("x: ",values.x, " y: " , values.y );
                    } else {
                        //console.log("x: ",values.x, " y: " , values.y );
                        self.joyrightdir.x = values.x;
                    }
                    //console.log("x: ",values.x, " y: " , values.y );
                }));

                gamepad.onbuttondown((function (buttonIndex) {
                    //alert(buttonIndex);
                    //console.log(buttonIndex);
                }));

                gamepad.onbuttonup((function (buttonIndex) {}));
            };

            var gamepads = new BABYLON.Gamepads(gamepadConnected);

            // for google chrome start the monitoring if navigator.getGamepads() has a gamepad at index 0 for example
            // this is because chrome doesn't seem to support the gamepadconnected/gamepaddisconnected events perfectly yet,
            // it only detects the gamepad if you plug it in again but not if it is already connected
            if (navigator.getGamepads()[0]) {
                gamepads._startMonitoringGamepads();
            }
        }
    }, {
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
            this.engine.runRenderLoop((function () {
                if (self.scenes[self.scenename] != null) {
                    self.scenes[self.scenename].render();
                    for (var i = 0; i < self.scenes[self.scenename].meshes.length; i++) {
                        if (typeof self.scenes[self.scenename].meshes[i].update === 'function') {
                            self.scenes[self.scenename].meshes[i].update();
                        }
                    }
                    if (self.selectobject != null) {}
                }
            }));
        }
    }, {
        key: 'updateselectobject',
        value: function updateselectobject() {
            var self = this;
            if (self.selectobject != null) {
                if (self.selectobject_text_id != null) {
                    self.selectobject_text_id.text = self.selectobject.id;
                }
                //===
                if (self.selectobject_text_px != null) {
                    self.selectobject_text_px.text = self.selectobject.position.x.toString();
                    //console.log("found x",self.selectobject.position.x);
                }
                if (self.selectobject_text_py != null) {
                    self.selectobject_text_py.text = self.selectobject.position.y.toString();
                }
                if (self.selectobject_text_pz != null) {
                    self.selectobject_text_pz.text = self.selectobject.position.z.toString();
                }
                //===
                if (self.selectobject_text_rx != null) {
                    self.selectobject_text_rx.text = self.selectobject.rotation.x.toString();
                }
                if (self.selectobject_text_ry != null) {
                    self.selectobject_text_ry.text = self.selectobject.rotation.y.toString();
                }
                if (self.selectobject_text_rz != null) {
                    self.selectobject_text_rz.text = self.selectobject.rotation.z.toString();
                }
                //===
                if (self.selectobject_text_sx != null) {
                    self.selectobject_text_sx.text = self.selectobject.scaling.x.toString();
                }
                if (self.selectobject_text_sy != null) {
                    self.selectobject_text_sy.text = self.selectobject.scaling.y.toString();
                }
                if (self.selectobject_text_sz != null) {
                    self.selectobject_text_sz.text = self.selectobject.scaling.z.toString();
                }
            }
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
            //console.log(this.engine);
            //console.log(this.scene);
            //console.log(BABYLON);
            this.init_phsics();
            this.create2DHUD();
            //this.setupeditor();
            //this.create2D_BattleHUD();
            //BABYLON.DebugLayer().show();
            //this.scene.debugLayer.show(false);
            //this.scene.debugLayer.show(true);
            //this.createbattle_prototype();
            this.create_input();
            this.create_gamepadinput();
            this.create_movement();
            this.ScenePickObject();
            this.simple_scene();
            //this.create_character();
            //this.loadmap_requestXML();
        }
    }]);

    return Babylonjs_game;
})(Babylonjsbes6);