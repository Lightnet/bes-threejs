/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Threejs_framework_network} from './threejs_framework_network';
import {Threejs_framework_physics} from './threejs_framework_physics';
import {Threejs_framework_editor} from './threejs_framework_editor';
import {Threejs_framework_scene} from './threejs_framework_scene';

import {Threejs_framework_hud} from './threejs_framework_hud';
import {Threejs_framework_ui} from './threejs_framework_ui';
import {Threejs_framework_loader} from './threejs_framework_loader';
import {Threejs_framework_gundb} from './threejs_framework_gundb';

export class Threejs_framework{

    constructor(args){
        var self = this;
        if(!args){
            args = {};
            //console.log("no args...");
        }
        //{
        this.version = "0.0.1";
		this.antialias = true;//threejs
		this.bfixedassetpath = true;
		this.reload = false;//web browser editor reload url

		this.ToRad = 0.0174532925199432957;

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
        //}
        new Threejs_framework_network(this);
        new Threejs_framework_physics(this);
        new Threejs_framework_editor(this);
        new Threejs_framework_scene(this);
        new Threejs_framework_hud(this);
        new Threejs_framework_ui(this);
        new Threejs_framework_loader(this);
        new Threejs_framework_gundb(this);


    }

    initloadingscreen(){
		var styleloadingscreen = document.createElement("style");
		styleloadingscreen.innerHTML = '';
		styleloadingscreen.innerHTML += '.loader {border: 16px solid #f3f3f3;border-top: 16px solid #3498db;border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;}';
		styleloadingscreen.innerHTML += '\n@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg);}}';
		styleloadingscreen.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(styleloadingscreen);

		var divloadingscreen = document.createElement("div");
		divloadingscreen.id = "loadingscreen";
		divloadingscreen.style['background-color'] = '#dddddd';
		divloadingscreen.style.position = 'absolute';
		divloadingscreen.style.top = 0;
		divloadingscreen.style.left = 0;
		divloadingscreen.style.width = '100%';
		divloadingscreen.style.height = '100%';
		divloadingscreen.innerHTML = "<div style='background-color: #dddddd;position: absolute;left: 0;height: 50%;width: 100%;top: 50%;'><center><div class='loader'></div></center> <center id='loadingscreentext'>Loading...</center></div>"
		document.getElementsByTagName('body')[0].appendChild(divloadingscreen);
	}

	loadingscreentext(_TEXT="loading......"){
		document.getElementById('loadingscreentext').innerHTML = _TEXT;
	}

	showloadingscreen(){
		document.getElementById('loadingscreen').style.display = 'block';
	}

	hideloadingscreen(){
		document.getElementById('loadingscreen').style.display = 'none';
	}

    loadlibraries(){
		var scriptcount = 0;
		var scriptlist = this.scriptlist;
		var self = this;
		for(var i = 0; i < scriptlist.length;i++){
			//threejsapi.addScript(mappdata.scripts[i]);
			this.loadjavascript(scriptlist[i], function(){
				//initialization code
				scriptcount++;
				//console.log("script: "+scriptcount + ":" + (scriptlist.length));
				if(scriptcount == scriptlist.length){ //make sure the scripts are load else it can't used script components
					console.log("script: "+scriptcount + ":" + (scriptlist.length));
					console.log('Finish load javascript libs!');
					self.init();
				}
			});
		}
	}

    addListener(event, obj, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(event, fn, false); // modern browsers
        }
        else {
            obj.attachEvent("on" + event, fn); // older versions of IE
        }
    }

    init(){
        console.log("testing...");
    }

    setup(){
        console.log("setup..");
    }

	setup_user(){
        console.log("setup user..");
	}

}
