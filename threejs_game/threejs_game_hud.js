define(["exports", "./threejs_game_module"], function (exports, _threejs_game_module) {
				"use strict";

				Object.defineProperty(exports, "__esModule", {
								value: true
				});
				exports.Threejs_game_hud = undefined;

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

				var Threejs_game_hud = exports.Threejs_game_hud = function (_Threejs_game_module) {
								_inherits(Threejs_game_hud, _Threejs_game_module);

								function Threejs_game_hud(args) {
												_classCallCheck(this, Threejs_game_hud);

												return _possibleConstructorReturn(this, (Threejs_game_hud.__proto__ || Object.getPrototypeOf(Threejs_game_hud)).call(this, args));
								}

								_createClass(Threejs_game_hud, [{
												key: "createBaseHUD",
												value: function createBaseHUD() {
																var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
																var self = this;

																function updateHUDSprites() {
																				console.log(window.innerWidth);
																				var width = window.innerWidth / 2;
																				var height = window.innerHeight / 2;
																				var material = spriteTL.material;
																				var imageWidth = material.map.image.width / 2;
																				var imageHeight = material.map.image.height / 2;
																				spriteTL.position.set(-width + imageWidth, height - imageHeight, 0); // top left
																				spriteTR.position.set(width - imageWidth, height - imageHeight, 0); // top right
																				spriteBL.position.set(-width + imageWidth, -height + imageHeight, 0); // bottom left
																				spriteBR.position.set(width - imageWidth, -height + imageHeight, 0); // bottom right
																				spriteC.position.set(0, 0, 0); // center
																}

																function createHUDSprites(texture) {
																				var material = new THREE.SpriteMaterial({ map: texture });
																				var width = material.map.image.width;
																				var height = material.map.image.height;
																				spriteTL = new THREE.Sprite(material);
																				spriteTL.scale.set(width, height, 1);
																				self.scenehud.add(spriteTL);

																				spriteTR = new THREE.Sprite(material);
																				spriteTR.scale.set(width, height, 1);
																				self.scenehud.add(spriteTR);
																				spriteBL = new THREE.Sprite(material);
																				spriteBL.scale.set(width, height, 1);
																				self.scenehud.add(spriteBL);
																				spriteBR = new THREE.Sprite(material);
																				spriteBR.scale.set(width, height, 1);
																				self.scenehud.add(spriteBR);
																				spriteC = new THREE.Sprite(material);
																				spriteC.scale.set(width, height, 1);
																				self.scenehud.add(spriteC);

																				updateHUDSprites();
																}
																var textureLoader = new THREE.TextureLoader();
																var mapA = textureLoader.load("assets/sprite0.png", createHUDSprites);
												}
								}]);

								return Threejs_game_hud;
				}(_threejs_game_module.Threejs_game_module);
});