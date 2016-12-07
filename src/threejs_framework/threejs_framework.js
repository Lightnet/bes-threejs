/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Threejs_framework_network} from './threejs_framework_network';
import {Threejs_framework_loadingscreen} from './threejs_framework_loadingscreen';
import {Threejs_framework_physics} from './threejs_framework_physics';
import {Threejs_framework_editor} from './threejs_framework_editor';
import {Threejs_framework_scene} from './threejs_framework_scene';
import {Threejs_framework_hud} from './threejs_framework_hud';
import {Threejs_framework_ui} from './threejs_framework_ui';
import {Threejs_framework_loader} from './threejs_framework_loader';
import {Threejs_framework_script} from './threejs_framework_script';
import {Threejs_framework_gundb} from './threejs_framework_gundb';
//===============================================
//main class entry
//===============================================
export class Threejs_framework{

    constructor(args){
        var self = this;
        if(!args){
            args = {};
            //console.log("no args...");
        }
        var self = this;

        this.version = "0.0.1";
		this.antialias = true;//threejs
		this.bfixedassetpath = true;
		this.reload = false;//web browser editor reload url

		this.ToRad = 0.0174532925199432957;

		this.scene = null;
		this.scenehud = null;
		this.camera = null;
		this.camerahud = null;
		this.canvas = null;
		this.renderer = null;

		this.objects = [];
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		this.bablephysics = false;
		this.physicsIndex = 2;
		this.setPhysicsType = ['Oimo.js', 'Cannon.js', 'Ammo.js'];
		this.timeSteptimeStep = 1 / 60;
		this.world = null;
		this.meshs = [];
		this.bodies = [];
		this.grounds = [];

		this.scenenodes = [];//editor scene
		this.mapscenenodes = [];
		this.scriptcomponents = [];//javascript

		this.mappdata;
		this.scriptcount = 0;
		this.loader = new THREE.XHRLoader();

		this.scriptlist = [
			'/js/libs/threex.domevents.js',
			'js/loaders/FBXLoader.js',
			'js/loaders/collada/Animation.js',
			'js/loaders/collada/AnimationHandler.js',
			'js/loaders/collada/KeyFrameAnimation.js',
			'js/loaders/ColladaLoader.js',
			'js/loaders/OBJLoader.js',
			'/js/controls/TrackballControls.js',
			'/js/renderers/CSS3DRenderer.js',
			'/js/shaders/CopyShader.js',
			'/js/postprocessing/EffectComposer.js',
			'/js/postprocessing/ClearPass.js',
			'/js/postprocessing/RenderPass.js',
			'/js/postprocessing/MaskPass.js',
			'/js/postprocessing/ShaderPass.js'
		];

        new Threejs_framework_loadingscreen(this);
        new Threejs_framework_network(this);
        new Threejs_framework_physics(this);
        new Threejs_framework_editor(this);
        new Threejs_framework_scene(this);
        new Threejs_framework_hud(this);
        new Threejs_framework_ui(this);
        new Threejs_framework_loader(this);
        new Threejs_framework_gundb(this);
        new Threejs_framework_script(this);

        this.initloadingscreen();
		this.showloadingscreen();

        if(args != null){
			if(args['mode'] != null){
				this.mode = args['mode'];
			}else{
				this.mode = "game;";
			}
			console.log("mode: "+this.mode);
			if (args['bupdateobjects'] != null) {
                    this.bupdateobjects = args['bupdateobjects'];
                }
			if (args['bfixedassetpath'] != null) {
                this.bfixedassetpath = args['bfixedassetpath'];
            }
			if (args['bablephysics'] != null) {
                this.bablephysics = args['bablephysics'];
            }
			//this need to be last else it variable are not assign
            if (args['onload'] == true) {
                this.addListener("load", window, function () {
                    //console.log('init window listen threejs setup... ');
                    //_this.init();
					self.loadlibraries();
                });
            } else {
                //console.log('init threejs setup...');
                //this.init();
				this.loadlibraries();
            }

			if(args['load'] !=null ){
				this.bmap = true;
				this.mapurl = args['load'];
			}else{
				this.bmap = false;
				this.mapurl = "";
			}
			//console.log("Map: " + this.bmap + " url: "+ this.mapurl);
		}
    }

    setup_render(){
		//this.setup_network();

		if((this.mode == "css3dwebgl")||(this.mode == "editor")){
			//css3d render
			this.setup_css3d();
		}

		//webgl render
		this.setup_webgl();
		this.setup_hud();

		if(this.bmap){
			this.load();
		}

		//render pass with two secnes
		this.setup_renderpass();
		this.render();
		if(this.bmap == false){
			this.hideloadingscreen();
		}
	}

    init(){
        this.setup_render();
		//this.hideloadingscreen();
		if(this.bablephysics){
			this.initPhysics();
		}
		//console.log("game init");
    }

}
