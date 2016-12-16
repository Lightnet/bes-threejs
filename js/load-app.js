"use strict";

/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

var threejsapi; //need to be global variable

function _CLASSLOAD(_OBJCLASS, args) {
	var loader = new THREE.XHRLoader();
	var CLASSGAME = _OBJCLASS['_class']; //Threejs_game_json;
	//var threejsapi;
	var mappdata;
	var scriptcount = 0;

	//https://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
	function loadScript(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState) {
			//IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			//Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		var scriptcomponents = document.getElementById('scriptcomponents');
		//document.getElementsByTagName("head")[0].appendChild(script);
		scriptcomponents.appendChild(script);
	}

	loader.load('post-app.json', (function (text) {
		var modelfiles = [];
		var modelcount = 0;

		mappdata = JSON.parse(text);
		console.log(mappdata);
		//threejsapi = new CLASSGAME({onload:false,bcanvasRatio:true,bfixedassetpath:false});//config
		threejsapi = new CLASSGAME(args); //config
		scriptcount = 0;

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
					threejsapi.LoadModelFile(modelfiles[mi], (function (object) {
						console.log('//========================================');
						//console.log(object.name);
						//object.name = _name;
						//console.log(object.uuid);
						//object.uuid = _id;
						console.log(object);
						//console.log(object.uuid);
						modelcount++;
						console.log("models: " + modelcount + ":" + modelfiles.length);
						if (modelcount == modelfiles.length) {
							//console.log('Finish loading file models!');
							//console.log('init scripts!');
							loadscriptfiles();
						}
					}));
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
					threejsapi.parseObject(mappdata.entities[i]);
				}
				console.log('Finish loading/creating entities!');
			}
		}

		loadmodelfiles();
	}));
}