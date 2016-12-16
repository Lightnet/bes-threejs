define(["exports", "./babylonjs_framework_module"], function (exports, _babylonjs_framework_module) {
				"use strict";

				Object.defineProperty(exports, "__esModule", {
								value: true
				});
				exports.Babylonjs_framework_physics = undefined;

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

				var Babylonjs_framework_physics = exports.Babylonjs_framework_physics = function (_Babylonjs_framework_) {
								_inherits(Babylonjs_framework_physics, _Babylonjs_framework_);

								function Babylonjs_framework_physics(args) {
												_classCallCheck(this, Babylonjs_framework_physics);

												return _possibleConstructorReturn(this, (Babylonjs_framework_physics.__proto__ || Object.getPrototypeOf(Babylonjs_framework_physics)).call(this, args));
								}

								_createClass(Babylonjs_framework_physics, [{
												key: "createscene_physics",
												value: function createscene_physics() {
																this.sphere.position.y = 5;
																this.sphere.physicsImpostor = new BABYLON.PhysicsImpostor(this.sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
																this.sphere.material = new BABYLON.StandardMaterial("Mat", this.scene);

																this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);

																//this.sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
																//impostor.setAngularVelocity(new BABYLON.Quaternion(0,1,0,0));
																//console.log(this.sphere.physicsImpostor);
																//this.sphere.physicsImpostor.setDeltaPosition(new BABYLON.Vector3(0,5,0));

																//this.sphere.physicsImpostor.registerOnPhysicsCollide(this.ground.physicsImpostor, function(main, collided) {
																//main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
																//console.log("hit");
																//});
												}

												//init oimo.js physics

								}, {
												key: "init_physics",
												value: function init_physics() {
																//this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
																this.scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.CannonJSPlugin());
												}
								}, {
												key: "parse_physcis",
												value: function parse_physcis() {}
								}]);

								return Babylonjs_framework_physics;
				}(_babylonjs_framework_module.Babylonjs_framework_module);
});