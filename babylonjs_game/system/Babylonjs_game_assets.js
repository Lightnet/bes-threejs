define(["exports", "./Babylonjs_game_module"], function (exports, _Babylonjs_game_module) {
				"use strict";

				Object.defineProperty(exports, "__esModule", {
								value: true
				});
				exports.Babylonjs_game_assets = undefined;

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

				var Babylonjs_game_assets = exports.Babylonjs_game_assets = function (_Babylonjs_game_modul) {
								_inherits(Babylonjs_game_assets, _Babylonjs_game_modul);

								function Babylonjs_game_assets(args) {
												_classCallCheck(this, Babylonjs_game_assets);

												return _possibleConstructorReturn(this, (Babylonjs_game_assets.__proto__ || Object.getPrototypeOf(Babylonjs_game_assets)).call(this, args));
								}

								_createClass(Babylonjs_game_assets, [{
												key: "createscene_assets",
												value: function createscene_assets() {
																var self = this;
																//console.log("adding preload assets...");
																this.assetsManager = new BABYLON.AssetsManager(this.scene);

																var filepath = "block_character03.babylon";
																var objectname = "CubeBody";

																var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
																meshTask.onSuccess = function (task) {
																				//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
																				task.loadedMeshes[0].position = new BABYLON.Vector3(0, 2, 3);
																				//console.log(task.loadedMeshes[0].position);
																				task.loadedMeshes[0].isVisible = false;
																				self.meshes.push(task.loadedMeshes[0]);
																				self.models.push({ mesh: task.loadedMeshes[0], skeleton: null });
																};

																filepath = "arm_cube.babylon";
																objectname = "Cube";

																var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
																meshTask2.onSuccess = function (task) {
																				//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
																				task.loadedMeshes[0].isVisible = false;
																				self.meshes.push(task.loadedMeshes[0]);
																				self.models.push({ mesh: task.loadedMeshes[0], skeleton: null });
																};

																this.assetsManager.onFinish = function (tasks) {
																				//console.log('assets loaded!');
																				self.setup_game();
																				//self.engine.hideLoadingUI();
																				//self.loadmap_requestXML();
																};
																this.assetsManager.load();

																/*
                //self.setup_game();
                var filepath = "block_character03.babylon";
                var objectname = "CubeBody";
                //var filepath = "arm_cube.babylon";
                //var objectname = "Cube";
                BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, function (newMeshes, particleSystems, skeletons) {
                	console.log(newMeshes[0]);
                	newMeshes[0].isVisible = false;
                	//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5); //works
                	//self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5); //works
                	self.meshes.push(newMeshes[0]);
                	self.models.push({mesh:newMeshes[0],skeleton:skeletons[0]});
                	self.setup_game();
                });
                */
												}
								}, {
												key: "getmesh",
												value: function getmesh(_name) {
																//console.log("get mesh?");
																var model = null;
																for (var i = 0; i < this.models.length; i++) {
																				//console.log(this.models[i].mesh.name," : ",_name);
																				if (this.models[i].mesh.name == _name) {
																								//console.log("match????");
																								var mid = this.uuid(); //random id generator
																								//model = this.meshes[i].clone(mid,null,true);
																								model = this.models[i].mesh.clone("mesh" + mid);
																								var mid = this.uuid(); //random id generator
																								model.position = new BABYLON.Vector3(0, 0, 3);
																								model.skeleton = this.models[i].mesh.skeleton.clone("skeleton" + mid);
																								//model.skeleton = this.models[i].skeleton.clone("skeleton"+mid);
																								//this.scene.beginAnimation(model.skeleton, 40, 60, true, 0.5); //works /// works
																								//console.log("done?");
																								break;
																				}
																}
																/*
                for(var i = 0 ; i < this.meshes.length;i++){
                	if(this.meshes[i].name == _name){
                		var mid = uuid();//random id generator
                		//model = this.meshes[i].clone(mid,null,true);
                		model = this.meshes[i].clone(mid);
                		var mid = uuid();//random id generator
                		model.skeleton = this.meshes[i].skeleton.clone(mid);
                		this.scene.beginAnimation(model, 40, 60, true, 0.5); //works /// works
                		break;
                	}
                }
                */
																return model; //null or object
												}
								}]);

								return Babylonjs_game_assets;
				}(_Babylonjs_game_module.Babylonjs_game_module);
});