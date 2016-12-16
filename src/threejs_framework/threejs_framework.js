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
            '/js/controls/OrbitControls.js',
            '/js/controls/FirstPersonControls.js',
			'/js/renderers/CSS3DRenderer.js',
			'/js/shaders/CopyShader.js',
			'/js/postprocessing/EffectComposer.js',
			'/js/postprocessing/ClearPass.js',
			'/js/postprocessing/RenderPass.js',
			'/js/postprocessing/MaskPass.js',
			'/js/postprocessing/ShaderPass.js'
		];

        //this.scriptlist.push('/js/libs/three-interface.min.js'); //css3d

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
		//this.showloadingscreen();

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
                console.log("load listen");
                this.addListener("load", window, function () {
                    //console.log('init window listen threejs setup... ');
                    //_this.init();
					self.loadlibraries();
                });
            } else {
                console.log("load");
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

    //RFC Type 4 (random) schema
    uuid() {
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
    /*
    initCannonPhysics() {
		if (typeof CANNON != undefined) {
			this.world = new CANNON.World();
			this.world.gravity.set(0, -9.82, 0);
			this.world.broadphase = new CANNON.NaiveBroadphase();
			this.world.solver.iterations = 10;
		}
		//this.createCannonScene();
	}

	updateCannonPhysics() {
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (typeof CANNON != undefined) {
			this.world.step(this.timeSteptimeStep);
		}
	}

	destroyCannonPhysics() {
		console.log('destroyCannonPhysics');
	}

	initAmmoPhysics() {
		//https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
		if (typeof Ammo != undefined) {
			console.log('init Ammo');
			this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
			this.dispatcher = this.dp = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
			//console.log(dispatcher);
			this.overlappingPairCache = new Ammo.btDbvtBroadphase();
			this.solver = new Ammo.btSequentialImpulseConstraintSolver();
			this.world = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration);
			this.world.setGravity(new Ammo.btVector3(0, -10, 0));
			this.trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking
			//this.createAmmoScene();
		}
	}

	updateAmmoPhysics() {
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (typeof Ammo != undefined) {
			this.world.stepSimulation(1 / 60, 10);
            //console.log(this.world);
		}
	}

	destroyAmmoPhysics() {
		//https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
		// Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
		Ammo.destroy(this.collisionConfiguration);
		Ammo.destroy(this.dispatcher);
		Ammo.destroy(this.overlappingPairCache);
		Ammo.destroy(this.solver);
	}

	initOimoPhysics() {
		if (typeof OIMO != undefined) {
			this.world = new OIMO.World(1 / 60, 2);
			//this.world.gravity = new OIMO.Vec3(0, -1, 0);
			this.world.clear();
			//this.createOimoScene();
			//this.infos = document.getElementById("info");
		}
	}

	updateOimoPhysics() {
		//https://github.com/lo-th/Oimo.js/blob/gh-pages/test_moving.html
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		this.world.step();
	}

	destroyOimoPhysics() {
        console.log('destroyOimoPhysics');
    }

	updatePhysics() {
        //console.log("p");
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
			this.updateOimoPhysics();
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
			this.updateCannonPhysics();
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
			this.updateAmmoPhysics();
		}
	}

	initPhysics() {

        if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
            this.initOimoPhysics();
        }
        if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
            this.initCannonPhysics();
        }
        if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
            this.initAmmoPhysics();
        }
		console.log("init physics type:" + this.setPhysicsType[this.physicsIndex]);
    }
    */



    setup_render(){
		//this.setup_network();

		if((this.mode == "css3dwebgl")||(this.mode == "editor")){
			//css3d render
			this.setup_css3d();
		}

		//webgl render
		this.setup_webgl();
		this.setup_hud();
        this.setup_renderpass();

		//if(this.bmap){
			//this.load();
		//}

		//render pass with two secnes
		this.render();
		if(this.bmap == false){
			this.hideloadingscreen();
		}
	}

    init(){
        this.setup_render();
		//this.hideloadingscreen();
		//if(this.bablephysics){
			//this.initPhysics();
		//}
		//console.log("game init");
    }

    update(){

	}

}
