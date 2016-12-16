define(['exports', './threejs_framework_module'], function (exports, _threejs_framework_module) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Threejs_framework_physics = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

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

	var Threejs_framework_physics = exports.Threejs_framework_physics = function (_Threejs_framework_mo) {
		_inherits(Threejs_framework_physics, _Threejs_framework_mo);

		function Threejs_framework_physics(args) {
			_classCallCheck(this, Threejs_framework_physics);

			return _possibleConstructorReturn(this, (Threejs_framework_physics.__proto__ || Object.getPrototypeOf(Threejs_framework_physics)).call(this, args));
		}

		_createClass(Threejs_framework_physics, [{
			key: 'initCannonPhysics',
			value: function initCannonPhysics() {
				if ((typeof CANNON === 'undefined' ? 'undefined' : _typeof(CANNON)) != undefined) {
					this.world = new CANNON.World();
					this.world.gravity.set(0, -9.82, 0);
					this.world.broadphase = new CANNON.NaiveBroadphase();
					this.world.solver.iterations = 10;
				}
				//this.createCannonScene();
			}
		}, {
			key: 'updateCannonPhysics',
			value: function updateCannonPhysics(deta) {
				if (typeof this.world == 'undefined' || this.world == null) {
					return;
				}
				if ((typeof CANNON === 'undefined' ? 'undefined' : _typeof(CANNON)) != undefined) {
					this.world.step(this.timeSteptimeStep);
				}
			}
		}, {
			key: 'destroyCannonPhysics',
			value: function destroyCannonPhysics() {
				console.log('destroyCannonPhysics');
			}
		}, {
			key: 'initAmmoPhysics',
			value: function initAmmoPhysics() {
				//https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
				if ((typeof Ammo === 'undefined' ? 'undefined' : _typeof(Ammo)) != undefined) {
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
		}, {
			key: 'updateAmmoPhysics',
			value: function updateAmmoPhysics(deta) {
				deta = deta || 1;
				if (typeof this.world == 'undefined' || this.world == null) {
					return;
				}
				if ((typeof Ammo === 'undefined' ? 'undefined' : _typeof(Ammo)) != undefined) {
					//this.world.stepSimulation(1 / 60, 10);
					this.world.stepSimulation(deta, 2);
					//console.log(deta);
				}
			}
		}, {
			key: 'destroyAmmoPhysics',
			value: function destroyAmmoPhysics() {
				//https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
				// Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
				Ammo.destroy(this.collisionConfiguration);
				Ammo.destroy(this.dispatcher);
				Ammo.destroy(this.overlappingPairCache);
				Ammo.destroy(this.solver);
			}
		}, {
			key: 'initOimoPhysics',
			value: function initOimoPhysics() {
				if ((typeof OIMO === 'undefined' ? 'undefined' : _typeof(OIMO)) != undefined) {
					this.world = new OIMO.World(1 / 60, 2);
					//this.world.gravity = new OIMO.Vec3(0, -1, 0);
					this.world.clear();
					//this.createOimoScene();
					//this.infos = document.getElementById("info");
				}
			}
		}, {
			key: 'updateOimoPhysics',
			value: function updateOimoPhysics(deta) {
				//https://github.com/lo-th/Oimo.js/blob/gh-pages/test_moving.html
				if (typeof this.world == 'undefined' || this.world == null) {
					return;
				}
				this.world.step();
			}
		}, {
			key: 'destroyOimoPhysics',
			value: function destroyOimoPhysics() {
				console.log('destroyOimoPhysics');
			}
		}, {
			key: 'updatePhysics',
			value: function updatePhysics(deta) {
				//console.log("p");
				if (typeof this.world == 'undefined' || this.world == null) {
					return;
				}
				if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
					this.updateOimoPhysics(deta);
				}
				if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
					this.updateCannonPhysics(deta);
				}
				if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
					this.updateAmmoPhysics(deta);
				}
			}
		}, {
			key: 'initPhysics',
			value: function initPhysics() {

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
		}]);

		return Threejs_framework_physics;
	}(_threejs_framework_module.Threejs_framework_module);
});