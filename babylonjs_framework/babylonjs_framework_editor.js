define(['exports', './babylonjs_framework_module'], function (exports, _babylonjs_framework_module) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Babylonjs_framework_editor = undefined;

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

	var Babylonjs_framework_editor = exports.Babylonjs_framework_editor = function (_Babylonjs_framework_) {
		_inherits(Babylonjs_framework_editor, _Babylonjs_framework_);

		function Babylonjs_framework_editor(args) {
			_classCallCheck(this, Babylonjs_framework_editor);

			return _possibleConstructorReturn(this, (Babylonjs_framework_editor.__proto__ || Object.getPrototypeOf(Babylonjs_framework_editor)).call(this, args));
		}

		//http://doc.babylonjs.com/classes/2.4/Mesh


		_createClass(Babylonjs_framework_editor, [{
			key: 'parse_object',
			value: function parse_object(args) {
				var _obj;
				if (args != null) {
					if (args['freecamera'] != null) {
						_obj = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);
					}

					if (args['scene'] != null) {
						_obj = new BABYLON.Scene(this.engine);
					}

					if (args['hemisphericlight'] != null) {
						_obj = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
					}

					if (args['geometrytype'] != null) {
						if (args['geometrytype'] == 'cube') {
							_obj = this.parse_createbox(args);
						}

						if (args['geometrytype'] == 'sphere') {
							_obj = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
						}

						if (args['geometrytype'] == 'ground') {
							_obj = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
						}

						if (args['geometrytype'] == 'plane') {
							_obj = BABYLON.Mesh.CreatePlane("plane", 10.0, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}

						if (args['geometrytype'] == 'disc') {
							_obj = BABYLON.Mesh.CreateDisc("disc", 5, 30, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}

						if (args['geometrytype'] == 'cylinder') {
							_obj = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}

						if (args['geometrytype'] == 'torus') {
							_obj = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}

						if (args['geometrytype'] == 'knot') {
							_obj = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}
						if (args['geometrytype'] == 'lines') {
							/*
       _obj = BABYLON.Mesh.CreateLines("lines", [
           new BABYLON.Vector3(-10, 0, 0),
           new BABYLON.Vector3(10, 0, 0),
           new BABYLON.Vector3(0, 0, -10),
           new BABYLON.Vector3(0, 0, 10)
       ], scene);
       */
						}

						if (args['dashedLines'] != null) {
							//_obj = BABYLON.Mesh.CreateDashedLines("dashedLines", [v1, v2, ... vn], dashSize, gapSize, dashNb, scene);
						}

						if (args['ribbon'] != null) {
							//_obj = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}

						if (args['tube'] != null) {
							//_obj = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene, false, BABYLON.Mesh.DEFAULTSIDE);
						}

						if (args['tiledhround'] != null) {
							//_obj = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -3, -3, 3, 3, subdivisions, precision, scene, false);
						}
					}
				} else {}

				return _obj;
			}
		}, {
			key: 'parse_createbox',
			value: function parse_createbox(args) {
				console.log("found");
				console.log(args);
				var _obj = null;
				var params = {};
				//if(args['box'] != null){
				//var _obj = BABYLON.MeshBuilder.CreateBox("ground", {height:1,width:20,depth:20}, this.scene);
				//args = args['box'];
				params.height = typeof args['parameters']['height'] === 'number' ? args['parameters']['height'] : 1;
				params.width = typeof args['parameters']['width'] === 'number' ? args['parameters']['width'] : 1;
				params.depth = typeof args['parameters']['depth'] === 'number' ? args['parameters']['depth'] : 1;
				var _obj = BABYLON.MeshBuilder.CreateBox("ground", params, this.scene);
				_obj.position.x = typeof args['position']['x'] === 'number' ? args['position']['x'] : 0;
				_obj.position.y = typeof args['position']['y'] === 'number' ? args['position']['y'] : 0;
				_obj.position.z = typeof args['position']['z'] === 'number' ? args['position']['z'] : 0;

				_obj.rotation.x = typeof args['rotation']['x'] === 'number' ? args['rotation']['x'] : 0;
				_obj.rotation.y = typeof args['rotation']['y'] === 'number' ? args['rotation']['y'] : 0;
				_obj.rotation.z = typeof args['rotation']['z'] === 'number' ? args['rotation']['z'] : 0;

				_obj.scaling.x = typeof args['scaling']['x'] === 'number' ? args['scaling']['x'] : 1;
				_obj.scaling.y = typeof args['scaling']['y'] === 'number' ? args['scaling']['y'] : 1;
				_obj.scaling.z = typeof args['scaling']['z'] === 'number' ? args['scaling']['z'] : 1;

				console.log(_obj);

				//}
				return _obj;
			}
		}]);

		return Babylonjs_framework_editor;
	}(_babylonjs_framework_module.Babylonjs_framework_module);
});