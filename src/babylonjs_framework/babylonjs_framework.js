/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_framework_network} from './babylonjs_framework_network';
import {Babylonjs_framework_physics} from './babylonjs_framework_physics';
import {Babylonjs_framework_scene} from './babylonjs_framework_scene';
import {Babylonjs_framework_editor} from './babylonjs_framework_editor';
import {Babylonjs_framework_gui} from './babylonjs_framework_gui';

//place holder id
function object3d() {
    this.uuid = "";
    this.name = "none";
    return this;
}

export class Babylonjs_framework{

    constructor(args){

        new Babylonjs_framework_network(this);
        new Babylonjs_framework_physics(this);
        new Babylonjs_framework_scene(this);
        new Babylonjs_framework_editor(this);
        new Babylonjs_framework_gui(this);

        var self = this;
		this.onload = false;
		this.binit = true;
		this.reload = false;//web browser editor reload url

		this.scenename = "default"; //default name
		this.scenes = []; //manage scene

        //var id = new object3d();
        //console.log(id);
        if(args != null){
			//this need to be last else it variable are not assign
			if (args['onload'] != null) {
				this.onload = args['onload'];
				//console.log(args);
			}
		}

		if (this.onload) {
            console.log('init window listen Babylonjs setup... ');
			this.addListener("load", window, function () {
				self.init();
			});
		}
    }

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
    }

    //window load listen event
	addListener(event, obj, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(event, fn, false); // modern browsers
        }
        else {
            obj.attachEvent("on" + event, fn); // older versions of IE
        }
    }

    enableMeshesCollision(meshes) {
  		meshes.forEach(function(mesh) {
    		mesh.checkCollisions = true;
  		});
	}

    //this need to be here sub class add doesn't work
    //start render scene set array
	start_scenerender(){
        /*
		var self = this;
		this.engine.runRenderLoop(function() {
            //console.log("main render!");
			if(self.scenes[self.scenename] !=null){
				if(typeof self.scenes[self.scenename].renderloop === 'function'){
					self.scenes[self.scenename].renderloop(); //custom function call
				}else{
					self.scenes[self.scenename].render();
				}
			}
		});
        */
	}

    init(){
		//console.log("init babylonjsbes6");
		var self = this;
		this.canvas = document.getElementById('renderCanvas');
		this.engine = new BABYLON.Engine(this.canvas, true);
		//disable  manifest cache
		this.engine.enableOfflineSupport = false;
		//console.log(this.engine);
		//https://doc.babylonjs.com/tutorials/how_to_use_assetsmanager
		this.engine.loadingUIText = "loading...";
		//this.engine.displayLoadingUI();
		this.scene = this.createScene();
        //console.log(this.scenename);
		this.scenes[this.scenename] = this.scene;
		//this.scenes[this.scenename].looprender=function(){
			//this.render();
		//}

		//this.setup_network();
		//render the scene
		this.start_scenerender();

		//add listen event for window to load
		window.addEventListener('resize', function() {
    		self.engine.resize();
		});
	}
}
