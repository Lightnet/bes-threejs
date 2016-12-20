define(['exports', '../system/Babylonjs_game_module'], function (exports, _Babylonjs_game_module) {
				'use strict';

				Object.defineProperty(exports, "__esModule", {
								value: true
				});
				exports.Babylonjs_game_load = undefined;

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

				var Babylonjs_game_load = exports.Babylonjs_game_load = function (_Babylonjs_game_modul) {
								_inherits(Babylonjs_game_load, _Babylonjs_game_modul);

								function Babylonjs_game_load(args) {
												_classCallCheck(this, Babylonjs_game_load);

												return _possibleConstructorReturn(this, (Babylonjs_game_load.__proto__ || Object.getPrototypeOf(Babylonjs_game_load)).call(this, args));
								}

								_createClass(Babylonjs_game_load, [{
												key: 'loadmap_requestXML',
												value: function loadmap_requestXML() {
																console.log("init map json load...");
																var self = this;
																var req = new XMLHttpRequest();
																req.open('GET', 'http://127.0.0.1/prototype.json');
																req.onreadystatechange = function () {
																				//alert(req.responseText);
																				//console.log(req.responseText);
																				if (req.readyState == 4) {
																								if (req.status == 200) {
																												//alert(req.responseText);
																												//console.log(req.responseText);
																												self.prase_mapjson(req.responseText);
																												//console.log("done loading?");
																								}
																				} else {
																												//alert("Error loading page\n");
																												//console.log("Error loading page\n");
																								}
																};
																req.send();
												}
								}, {
												key: 'prase_mapjson',
												value: function prase_mapjson(stringdata) {
																console.log("init string map");
																var self = this;
																var mappdata = self.mappdata;
																var scriptcount = self.scriptcount;

																var modelfiles = [];
																var modelcount = 0;

																mappdata = JSON.parse(stringdata);
																if (mappdata == null) {
																				console.log("error!");
																				return;
																}
																//console.log(mappdata);
																scriptcount = 0;

																loadentities();

																//load 3d models and texture a
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
																												/*
                            threejsapi.LoadModelFile(modelfiles[mi],(object)=>{
                            console.log('//========================================');
                            //console.log(object.name);//console.log(object.uuid);
                            console.log(object);
                            modelcount++;
                            console.log("models: "+modelcount + ":" +(modelfiles.length));
                            if(modelcount == modelfiles.length){
                            //console.log('Finish loading file models!');
                            //console.log('init scripts!');
                            loadscriptfiles();
                            }
                            });
                            */
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
																												loadScript(mappdata.scripts[i], function () {
																																//initialization code
																																scriptcount++;
																																//console.log("script: "+scriptcount + ":" + (mappdata.scripts.length));
																																if (scriptcount == mappdata.scripts.length) {
																																				//make sure the scripts are load else it can't used script components
																																				//console.log('Finish script components!');
																																				//console.log('init load entities!');
																																				loadentities();
																																}
																												});
																								}
																				}
																}
																//load entities
																function loadentities() {
																				console.log('loading entities?');
																				if (mappdata.entities != null) {
																								console.log("Entities count:" + mappdata.entities.length);
																								for (var i = 0; i < mappdata.entities.length; i++) {
																												//threejsapi.parseObject(mappdata.entities[i]);
																												self.parse_object(mappdata.entities[i]);
																								}
																								console.log('Finish loading!');

																								//self.hideloadingscreen();

																								//self.loadScript("/assets/test1.js", function(){
																								//initialization code
																								//console.log("test? js");
																								//});
																								//console.log(threejsapi);
																				}
																				self.setup_game();
																}
												}
								}]);

								return Babylonjs_game_load;
				}(_Babylonjs_game_module.Babylonjs_game_module);
});