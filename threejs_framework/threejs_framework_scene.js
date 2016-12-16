define(['exports', './threejs_framework_module'], function (exports, _threejs_framework_module) {
				'use strict';

				Object.defineProperty(exports, "__esModule", {
								value: true
				});
				exports.Threejs_framework_scene = undefined;

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

				var Threejs_framework_scene = exports.Threejs_framework_scene = function (_Threejs_framework_mo) {
								_inherits(Threejs_framework_scene, _Threejs_framework_mo);

								function Threejs_framework_scene(args) {
												_classCallCheck(this, Threejs_framework_scene);

												return _possibleConstructorReturn(this, (Threejs_framework_scene.__proto__ || Object.getPrototypeOf(Threejs_framework_scene)).call(this, args));
								}

								_createClass(Threejs_framework_scene, [{
												key: 'setup_css3d',
												value: function setup_css3d() {
																var container = document.getElementById('container');
																this.cameracss3d = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
																//this.cameracss3d.position.set( 500, 350, 750 );
																//this.cameracss3d.position.set( 0, 0, 1024+128 );
																this.cameracss3d.position.set(0, 0, screen.width + 32);
																this.scenecss3d = new THREE.Scene();
																this.renderercss3d = new THREE.CSS3DRenderer();
																this.renderercss3d.setSize(window.innerWidth, window.innerHeight);
																this.renderercss3d.domElement.style.position = 'absolute';
																this.renderercss3d.domElement.style.top = 0;
																container.appendChild(this.renderercss3d.domElement);

																var self = this;
																function onWindowResize() {
																				self.cameracss3d.aspect = window.innerWidth / window.innerHeight;
																				self.cameracss3d.updateProjectionMatrix();
																				self.renderercss3d.setSize(window.innerWidth, window.innerHeight);
																}
																window.addEventListener('resize', onWindowResize, false);
												}

												//css3d

								}, {
												key: 'setup_trackcamera_css3d',
												value: function setup_trackcamera_css3d() {
																var trackcontrolcss3d = new THREE.TrackballControls(this.cameracss3d);
																trackcontrolcss3d.rotateSpeed = 4;
																trackcontrolcss3d.zoomSpeed = 0.01;
																this.trackcontrolcss3d = trackcontrolcss3d;
												}

												//webgl

								}, {
												key: 'setup_trackcamera',
												value: function setup_trackcamera() {
																var controls = new THREE.TrackballControls(this.camera);
																controls.rotateSpeed = 4;
																controls.zoomSpeed = 0.01;
																this.trackcamera = controls;
																controls = null;
												}
								}, {
												key: 'setup_webgl',
												value: function setup_webgl() {
																var self = this;
																if (this.mode == "editor" || this.mode == "css3dwebgl") {
																				var webgldiv = document.createElement('div');
																				//webgldiv.style.width = '800px';
																				//webgldiv.style.height = '600px';
																				//console.log("WINDOW.WIDTH: " + window.width);
																				webgldiv.style.width = screen.width + 'px';
																				webgldiv.style.height = screen.height + 'px';
																				webgldiv.style.backgroundColor = '#000';
																}
																console.log("setup scene webgl");

																this.scene = new THREE.Scene();
																this.scene.name = "scene";
																this.scene.uuid = 'B1E79603-A80E-4CE5-9C5E-34B223CEECF9';
																this.scenenodes.push(this.scene);
																//this.scene.background = new THREE.Color( 0xff0000 );
																this.scene.background = new THREE.Color(0xEEEEEE);
																this.camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
																//renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
																if (this.mode == "editor" || this.mode == "css3dwebgl") {
																				console.log("editor | csswebgl");
																				this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
																				this.renderer.domElement.style.position = 'absolute';
																				this.renderer.domElement.style.top = 0;
																				//this.renderer.setSize( 800, 600 );
																				this.renderer.setSize(screen.width, screen.height);
																} else {
																				var onWindowResize = function onWindowResize() {
																								//console.log(window.innerWidth);
																								self.camera.aspect = window.innerWidth / window.innerHeight;
																								self.camera.updateProjectionMatrix();
																								self.renderer.setSize(window.innerWidth, window.innerHeight);
																				};

																				console.log("default");
																				this.canvas = document.getElementById("container");
																				this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
																				this.renderer.domElement.style.position = 'absolute';
																				this.renderer.domElement.style.top = 0;
																				this.renderer.setSize(window.innerWidth, window.innerHeight);
																				//this.renderer.setSize( 800, 600 );
																				//console.log(window.innerWidth);
																				//console.log(window.innerHeight);
																				this.canvas.appendChild(this.renderer.domElement);

																				window.addEventListener('resize', onWindowResize, false);
																}
																//this.renderer.setClearColor( 0xffffff, 0);
																//this.renderer.setClearColor(0xEEEEEE);
																this.renderer.autoClear = false;
																//this.renderer.shadowMap.enabled = true;
																//this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;

																if (this.mode == "editor" || this.mode == "css3dwebgl") {
																				console.log("editor", ":", "css3dwebgl");
																				webgldiv.appendChild(this.renderer.domElement);
																				var object = new THREE.CSS3DObject(webgldiv);
																				object.position.set(0, 0, 0);
																				object.rotation.y = 0;
																				var group = new THREE.Group();
																				group.add(object);
																				if (this.mode == "editor") {
																								this.setup_editor(group);
																				}
																				this.scenecss3d.add(group);
																}
																//this.setup_webgl_basics();
																//this.setup_trackcamera();
												}
								}, {
												key: 'setup_renderpass',
												value: function setup_renderpass() {
																var copyPass = new THREE.ShaderPass(THREE.CopyShader);
																copyPass.renderToScreen = true;
																var renderpass1 = new THREE.RenderPass(this.scene, this.camera);
																renderpass1.renderToScreen = false;
																if (this.scenehud != null && this.camerahud != null) {
																				var renderpass2 = new THREE.RenderPass(this.scenehud, this.camerahud);
																				renderpass2.clear = false;
																}
																this.effectComposer = new THREE.EffectComposer(this.renderer);
																this.effectComposer.addPass(renderpass1);
																if (this.scenehud != null && this.camerahud != null) {
																				this.effectComposer.addPass(renderpass2);
																}
																this.effectComposer.addPass(copyPass);
												}
								}, {
												key: 'render',
												value: function render() {
																var _this2 = this;

																requestAnimationFrame(function () {
																				_this2.render();
																});
																//console.log("update?");
																//this.cube.rotation.x += 0.1;
																//this.cube.rotation.y += 0.1;
																this.update();
																if (this.trackcamera != null) {
																				this.trackcamera.update();
																}

																if (this.trackcontrolcss3d != null) {
																				this.trackcontrolcss3d.update();
																}

																//custom update function check
																if (this.scene != null) {
																				if (this.bupdateobjects == true) {
																								this.scene.traverse(function (object) {
																												if (typeof object.update != 'undefined') {
																																object.update();
																												}
																												if (typeof object.script != 'undefined') {
																																for (var obs in object.script) {
																																				if (object.script[obs].update != null) {
																																								object.script[obs].update();
																																				}
																																}
																												}
																								});
																				}
																}

																//if (this.bablephysics == true) {
																//this.updatePhysics();
																//}

																if (this.renderercss3d != null) {
																				this.renderercss3d.render(this.scenecss3d, this.cameracss3d);
																				//console.log("render?");
																}

																//this.renderer.render(this.scene, this.camera);
																if (this.effectComposer != null) {
																				this.effectComposer.render();
																}
												}
								}]);

								return Threejs_framework_scene;
				}(_threejs_framework_module.Threejs_framework_module);
});