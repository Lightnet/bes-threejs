/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Babylonjs_framework} from '../babylonjs_framework/babylonjs_framework';

import {ObjectRPGID} from './rpg/ObjectRPGID';
import {RPGStats} from './rpg/RPGStats';
import {RPGStatus} from './rpg/RPGStatus';
import {RPGItem} from './rpg/RPGItem';

import {Babylonjs_game_network} from './network/Babylonjs_game_network';
import {Babylonjs_game_physics} from './physics/Babylonjs_game_physics';
import {Babylonjs_game_load} from './load/Babylonjs_game_load';
import {Babylonjs_game_scene} from './scene/Babylonjs_game_scene';
import {Babylonjs_game_hud} from './hud/Babylonjs_game_hud';
import {Babylonjs_game_hud_battle} from './hud/Babylonjs_game_hud_battle';
import {Babylonjs_game_hud_inventory} from './hud/Babylonjs_game_hud_inventory';
import {Babylonjs_game_hud_loot} from './hud/Babylonjs_game_hud_loot';
import {Babylonjs_game_hud_skills} from './hud/Babylonjs_game_hud_skills';
import {Babylonjs_game_hud_shop} from './hud/Babylonjs_game_hud_shop';
import {Babylonjs_game_hud_storage} from './hud/Babylonjs_game_hud_storage';
import {Babylonjs_game_hud_trade} from './hud/Babylonjs_game_hud_trade';
import {Babylonjs_game_hud_market} from './hud/Babylonjs_game_hud_market';

import {Babylonjs_game_ui} from './ui/Babylonjs_game_ui';
import {Babylonjs_game_editor} from './editor/Babylonjs_game_editor';
import {Babylonjs_game_assets} from './system/Babylonjs_game_assets';
import {Babylonjs_game_character} from './character/Babylonjs_game_character';
import {Babylonjs_game_controller} from './controller/Babylonjs_game_controller';
import {Babylonjs_game_battle} from './system/Babylonjs_game_battle';
import {Babylonjs_game_parse} from './system/Babylonjs_game_parse';
import {Babylonjs_game_loadsave} from './system/Babylonjs_game_loadsave';
import {Babylonjs_game_gundb} from './system/Babylonjs_game_gundb';


import {Babylonjs_game_terrain} from './terrain/Babylonjs_game_terrain';

import {Babylonjs_game_jqueryui} from './jqueryui/Babylonjs_game_jqueryui';

// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

export class Babylonjs_game extends Babylonjs_framework {

    constructor(args) {
        super(args);

        this.materials = [];
        this.textures = [];
        this.meshes = [];
        this.models = [];

        this.characters = [];
        this.dimensionstorage = [];

        this.companions = []; //those who join in your party that travel together
        this.squads = [];

        this.friends = []; //battle mode?
        this.foes = []; //battle mode?

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
        this.bcontroller = true;
        this.keys = {
            letft: 0,
            right: 0,
            forward: 0,
            back: 0
        };
        this.moveVector = new BABYLON.Vector3(0, 0, 0);

        this.npc = null;

        this.leftstickmove = false;
        this.joyleftdir = new BABYLON.Vector3(0, 0, 0);
        this.joylefttrigger = 0;
        this.joyrightdir = new BABYLON.Vector3(0, 0, 0);
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

        this.display_inventory = [];
        this.inventory = [];
        this.scroll_inventory_y = 0;

        new Babylonjs_game_network(this);
        new Babylonjs_game_physics(this);
        new Babylonjs_game_parse(this);
        new Babylonjs_game_load(this);
        new Babylonjs_game_loadsave(this);
        new Babylonjs_game_scene(this);

        new Babylonjs_game_hud(this);
        new Babylonjs_game_hud_battle(this);
        new Babylonjs_game_hud_inventory(this);
        new Babylonjs_game_hud_loot(this);
        new Babylonjs_game_hud_skills(this);
        new Babylonjs_game_hud_shop(this);
        new Babylonjs_game_hud_storage(this);
        new Babylonjs_game_hud_trade(this);
        new Babylonjs_game_hud_market(this);

        new Babylonjs_game_ui(this);
        new Babylonjs_game_editor(this);
        new Babylonjs_game_assets(this);

        new Babylonjs_game_character(this);

        new Babylonjs_game_controller(this);

        new Babylonjs_game_battle(this);

        new Babylonjs_game_terrain(this);

        new Babylonjs_game_jqueryui(this);

        new Babylonjs_game_gundb(this);

    }

    ScenePickObject() {
        console.log("PICK? Setup");
        var self = this;
        //When pointer down event is raised
        this.scene.onPointerDown = function(evt, pickResult) {
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
    start_scenerender() {
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

    canvasrender() {
        //console.log("render?");
        var self = this;
        this.engine.runRenderLoop(function() {
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

    init() {
        super.init();
        console.log("init [babylonjs_game]");
        this.createspacecavnas2D();
        this.createscene_assets();
        this.init_gundb();
    }

    setup_gamedata() {
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

        var item0 = new RPGItem({name: "Potion HP"});
        this.inventory.push(item0);

        item0 = new RPGItem({name: "Potion MP"});
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        var item0 = new RPGItem({name: "Potion HP"});
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        this.inventory.push(item0);
        var item0 = new RPGItem({name: "Potion MP"});
        this.inventory.push(item0);
        this.inventory.push(item0);
        var item0 = new RPGItem({name: "Potion"});
        this.inventory.push(item0);

        var item0 = new RPGItem({name: "Potion MP"});
        this.inventory.push(item0);
    }

    createshopmenu_variable() {
        this.display_shop = [];
        this.select_index_shop = 0;
        this.scroll_shop_y = 0;
    }

    setup_game() {
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
        //var terrain = this.createterrain({wireframe:true,x:0,y:0,z:0});
        //console.log(terrain);

        //var npc = this.spawn_player({y: 64});
        //console.log(npc);
        //npc.status.bshop = true;
        //var item0 = new RPGItem({name: "Potion MP"});
        //npc.status.shop.push(item0);
        //this.spawn_player({y: 32, bplayer: true});

    }

    setup_game00() {
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
        //this.spawn_player({y:32});
        var npc = this.spawn_player({y: 64});
        console.log(npc);
        npc.status.bshop = true;
        var item0 = new RPGItem({name: "Potion MP"});
        npc.status.shop.push(item0);
        this.spawn_player({y: 32, bplayer: true});
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

}
