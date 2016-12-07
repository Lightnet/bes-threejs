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
		}else{
            self.init();
            console.log("manual init();");
        }

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

		//this.createscene_objects();
		//init oimo.js physics
		//this.init_phsics();
		//this.createphsycis_test();
		//https://doc.babylonjs.com/tutorials/how_to_use_assetsmanager
		//this.create_hud();

		//this.setup_network();
		//render the scene
		this.start_scenerender();

		/*
		this.engine.runRenderLoop(function() {
			var name = "scene";
		    self.scene.render();
		});
		*/
		//add listen event for window to load
		window.addEventListener('resize', function() {
    		self.engine.resize();
		});
		//this.engine.hideLoadingUI();
	}

}
