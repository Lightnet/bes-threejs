define(['exports', './babylonjs_framework_module'], function (exports, _babylonjs_framework_module) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Babylonjs_framework_scene = undefined;

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Babylonjs_framework_scene = exports.Babylonjs_framework_scene = function (_Babylonjs_framework_) {
		_inherits(Babylonjs_framework_scene, _Babylonjs_framework_);

		//export class Babylonjs_framework_scene {

		function Babylonjs_framework_scene(args) {
			_classCallCheck(this, Babylonjs_framework_scene);

			return _possibleConstructorReturn(this, (Babylonjs_framework_scene.__proto__ || Object.getPrototypeOf(Babylonjs_framework_scene)).call(this, args));
			//args.createScene = this.createScene;
			//args.createscene_objects = this.createscene_objects;
			//args.start_scenerender = this.start_scenerender;
		}

		//create simple scene


		_createClass(Babylonjs_framework_scene, [{
			key: 'createScene',
			value: function createScene() {
				// create a basic BJS Scene object
				var scene = new BABYLON.Scene(this.engine);
				// create a FreeCamera, and set its position to (x:0, y:5, z:-10)
				var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
				//console.log(camera);
				// target the camera to scene origin
				camera.setTarget(BABYLON.Vector3.Zero());
				// attach the camera to the canvas
				camera.attachControl(this.canvas, false);
				this.camera = camera;
				// return the created scene
				return scene;
			}

			//create example scene

		}, {
			key: 'createscene_objects',
			value: function createscene_objects() {
				// create a basic light, aiming 0,1,0 - meaning, to the sky
				var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
				// create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
				var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
				// move the sphere upward 1/2 of its height
				sphere.position.y = 1;
				this.sphere = sphere;
				// create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
				var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
				this.ground = ground;
			}

			//start_scenerender(){
			//var self = this;
			//this.engine.runRenderLoop(function() {
			//console.log("main render!");
			//if(self.scenes[self.scenename] !=null){
			//if(typeof self.scenes[self.scenename].renderloop === 'function'){
			//self.scenes[self.scenename].renderloop(); //custom function call
			//}else{
			//self.scenes[self.scenename].render();
			//}
			//}
			//});
			//}


		}]);

		return Babylonjs_framework_scene;
	}(_babylonjs_framework_module.Babylonjs_framework_module);
});