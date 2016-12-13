/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Babylonjs_framework} from '../babylonjs_framework/babylonjs_framework';

import {ObjectRPGID} from './ObjectRPGID';
import {RPGStats} from './RPGStats';
import {RPGStatus} from './RPGStatus';

import {Babylonjs_game_network} from './babylonjs_game_network';
import {Babylonjs_game_physics} from './babylonjs_game_physics';
import {Babylonjs_game_load} from './babylonjs_game_load';
import {Babylonjs_game_scene} from './babylonjs_game_scene';
import {Babylonjs_game_hud} from './babylonjs_game_hud';
import {Babylonjs_game_ui} from './babylonjs_game_ui';
import {Babylonjs_game_editor} from './babylonjs_game_editor';
import {Babylonjs_game_assets} from './babylonjs_game_assets';
import {Babylonjs_game_character} from './babylonjs_game_character';
import {Babylonjs_game_controller} from './babylonjs_game_controller';
import {Babylonjs_game_battle} from './babylonjs_game_battle';
import {Babylonjs_game_parse} from './babylonjs_game_parse';
import {Babylonjs_game_terrain} from './babylonjs_game_terrain';

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

export class Babylonjs_game extends Babylonjs_framework{

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

        //EDITOR props
        //this.text2D;
        this.selectobject = null;

        this.selectobject_text_id = null;

        this.selectobject_text_px = null;
        this.selectobject_text_py = null;
        this.selectobject_text_pz = null;

        this.selectobject_text_rx = null;
        this.selectobject_text_ry = null;
        this.selectobject_text_rz = null;

        this.selectobject_text_sx = null;
        this.selectobject_text_sy = null;
        this.selectobject_text_sz = null;

        this.scriptcount = 0;
        self.mappdata = {};

        new Babylonjs_game_network(this);
        new Babylonjs_game_physics(this);
        new Babylonjs_game_parse(this);
        new Babylonjs_game_load(this);
        new Babylonjs_game_scene(this);
        new Babylonjs_game_hud(this);
        new Babylonjs_game_ui(this);
        new Babylonjs_game_editor(this);
        new Babylonjs_game_assets(this);
        new Babylonjs_game_character(this);
        new Babylonjs_game_controller(this);
        new Babylonjs_game_battle(this);
        new Babylonjs_game_terrain(this);

    }

    ScenePickObject(){
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
        //this.camera.attachControl(this.canvas, false);
        var box1 = BABYLON.Mesh.CreateBox("box", 1.0, this.scene);
        console.log("BABYLON.ActionManager");
        console.log(BABYLON.ActionManager);
        //input key
        //this.camera.attachControl(this.scene.getEngine().getRenderingCanvas());
        //working... some what
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: "r" }, function (evt) {
            console.log("typing r...");
            console.log(evt);
            //if (evt.sourceEvent.key == "r") {
            //}
        }));
        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            console.log(" OnKeyUpTrigger typing...");
            console.log(evt);
            //if (evt.sourceEvent.key == "r") {
            //}
        }));
        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            console.log(" OnKeyDownTrigger typing...");
            console.log(evt);
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
		//this.create_input();
        //this.create_gamepadinput();
		//this.create_movement();
		//this.ScenePickObject();
		//this.simple_scene();

        //this.simpleterrain()
        //this.simpleterrain01();

        //this.create_character();
        //this.loadmap_requestXML();
	}

}
