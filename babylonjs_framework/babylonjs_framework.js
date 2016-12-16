define(['exports', './babylonjs_framework_network', './babylonjs_framework_physics', './babylonjs_framework_scene', './babylonjs_framework_editor', './babylonjs_framework_gui'], function (exports, _babylonjs_framework_network, _babylonjs_framework_physics, _babylonjs_framework_scene, _babylonjs_framework_editor, _babylonjs_framework_gui) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Babylonjs_framework = undefined;

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

	//place holder id
	function object3d() {
		this.uuid = "";
		this.name = "none";
		return this;
	}

	var Babylonjs_framework = exports.Babylonjs_framework = function () {
		function Babylonjs_framework(args) {
			_classCallCheck(this, Babylonjs_framework);

			new _babylonjs_framework_network.Babylonjs_framework_network(this);
			new _babylonjs_framework_physics.Babylonjs_framework_physics(this);
			new _babylonjs_framework_scene.Babylonjs_framework_scene(this);
			new _babylonjs_framework_editor.Babylonjs_framework_editor(this);
			new _babylonjs_framework_gui.Babylonjs_framework_gui(this);

			var self = this;
			this.onload = false;
			this.binit = true;
			this.reload = false; //web browser editor reload url

			this.scenename = "default"; //default name
			this.scenes = []; //manage scene

			//var id = new object3d();
			//console.log(id);
			if (args != null) {
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

		//window load listen event


		_createClass(Babylonjs_framework, [{
			key: 'addListener',
			value: function addListener(event, obj, fn) {
				if (obj.addEventListener) {
					obj.addEventListener(event, fn, false); // modern browsers
				} else {
					obj.attachEvent("on" + event, fn); // older versions of IE
				}
			}
		}, {
			key: 'enableMeshesCollision',
			value: function enableMeshesCollision(meshes) {
				meshes.forEach(function (mesh) {
					mesh.checkCollisions = true;
				});
			}

			//this need to be here sub class add doesn't work
			//start render scene set array

		}, {
			key: 'start_scenerender',
			value: function start_scenerender() {
				var self = this;
				this.engine.runRenderLoop(function () {
					//console.log("main render!");
					if (self.scenes[self.scenename] != null) {
						if (typeof self.scenes[self.scenename].renderloop === 'function') {
							self.scenes[self.scenename].renderloop(); //custom function call
						} else {
							self.scenes[self.scenename].render();
						}
					}
				});
			}
		}, {
			key: 'init',
			value: function init() {
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
				window.addEventListener('resize', function () {
					self.engine.resize();
				});
			}
		}]);

		return Babylonjs_framework;
	}();
});