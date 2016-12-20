define(["exports", "./threejs_framework_module"], function (exports, _threejs_framework_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_framework_loader = undefined;

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

    var Threejs_framework_loader = exports.Threejs_framework_loader = function (_Threejs_framework_mo) {
        _inherits(Threejs_framework_loader, _Threejs_framework_mo);

        function Threejs_framework_loader(args) {
            _classCallCheck(this, Threejs_framework_loader);

            return _possibleConstructorReturn(this, (Threejs_framework_loader.__proto__ || Object.getPrototypeOf(Threejs_framework_loader)).call(this, args));
        }

        _createClass(Threejs_framework_loader, [{
            key: "addListener",
            value: function addListener(event, obj, fn) {
                if (obj.addEventListener) {
                    obj.addEventListener(event, fn, false); // modern browsers
                } else {
                    obj.attachEvent("on" + event, fn); // older versions of IE
                }
            }
        }, {
            key: "loadjavascript",
            value: function loadjavascript(url, callback) {
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
                //console.log(this.jspath + url);
                script.src = this.jspath + url;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }, {
            key: "loadlibraries",
            value: function loadlibraries() {
                console.log("loadlibraries...");
                var self = this;
                var scriptcount = 0;
                var scriptlist = this.scriptlist;

                for (var i = 0; i < scriptlist.length; i++) {
                    //threejsapi.addScript(mappdata.scripts[i]);
                    console.log(scriptlist[i]);
                    this.loadjavascript(scriptlist[i], function () {
                        //initialization code
                        scriptcount++;
                        //console.log("script: "+scriptcount + ":" + (scriptlist.length));
                        if (scriptcount == scriptlist.length) {
                            //make sure the scripts are load else it can't used script components
                            console.log("script: " + scriptcount + ":" + scriptlist.length);
                            console.log('Finish load javascript libs!');
                            self.init();
                        }
                    });
                }
            }
        }, {
            key: "load",
            value: function load() {
                console.log("loading map file!");
                var self = this;
                var mappdata = self.mappdata;
                var scriptcount = self.scriptcount;
                //this.mapurl
                //loader.load( 'post-app.json', function ( text ) {
                this.loader.load(this.mapurl, function (text) {
                    var modelfiles = [];
                    var modelcount = 0;

                    mappdata = JSON.parse(text);
                    console.log(mappdata);
                    //threejsapi = new CLASSGAME({onload:false,bcanvasRatio:true,bfixedassetpath:false});//config
                    //threejsapi = new CLASSGAME(args);//config
                    threejsapi = self;
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
                                threejsapi.LoadModelFile(modelfiles[mi], function (object) {
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
                                });
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
                                threejsapi.parseObject(mappdata.entities[i]);
                            }
                            console.log('Finish loading!');

                            self.hideloadingscreen();

                            //self.loadScript("/assets/test1.js", function(){
                            //initialization code
                            //console.log("test? js");
                            //});
                            //console.log(threejsapi);
                        }
                    }

                    loadmodelfiles();
                });
            }

            //===============================================
            // Manager
            //===============================================

        }, {
            key: "initManger",
            value: function initManger() {
                this.manager = new THREE.LoadingManager();
                this.manager.onProgress = function (item, loaded, total) {
                    console.log(item, loaded, total);
                };
            }
        }, {
            key: "onProgressModel",
            value: function onProgressModel(xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                }
            }
        }, {
            key: "onErrorModel",
            value: function onErrorModel(xhr) {
                console.log(xhr);
            }
            //===============================================
            // Load File
            //===============================================

        }, {
            key: "getext",
            value: function getext(filename) {
                return filename.substr(filename.lastIndexOf('.'));
            }
        }, {
            key: "LoadFile",
            value: function LoadFile(filename) {
                console.log('file: ' + filename);
                var self = this;
                if (this.getext(filename) == '.fbx') {
                    this.LoadFBX(filename, function (object) {
                        self.scene.add(object);
                    });
                }
                if (this.getext(filename) == '.dae') {
                    this.LoadDAE(filename, function (object) {
                        self.scene.add(object);
                    });
                }
                if (this.getext(filename) == '.obj') {
                    this.LoadOBJ(filename, function (object) {
                        self.scene.add(object);
                    });
                }
                if (this.getext(filename) == '.js') {
                    this.LoadJSONObj(filename, function (object) {
                        self.scene.add(object);
                    });
                }
                if (this.getext(filename) == '.json') {
                    this.LoadJSONObj(filename, function (object) {
                        self.scene.add(object);
                    });
                }
            }
        }, {
            key: "LoadModelFile",
            value: function LoadModelFile(args, callback) {
                console.log('file: ' + args.path);
                var self = this;
                if (this.getext(args.path) == '.fbx') {
                    this.LoadFBX(args.path, function (object) {
                        //self.scene.add(object);
                        object.uuid = args.uuid;
                        callback(object);
                    });
                }
                if (this.getext(args.path) == '.dae') {
                    this.LoadDAE(args.path, function (object) {
                        //self.scene.add(object);
                        object.uuid = args.uuid;
                        callback(object);
                    });
                }
                if (this.getext(args.path) == '.obj') {
                    this.LoadOBJ(args.path, function (object) {
                        //self.scene.add(object);
                        //console.log("done object loading????");
                        object.uuid = args.uuid;
                        callback(object);
                    });
                }
                if (this.getext(args.path) == '.js') {
                    this.LoadJSONObj(args.path, function (object) {
                        //self.scene.add( object );
                        object.uuid = args.uuid;
                        callback(object);
                    });
                }
                if (this.getext(args.path) == '.json') {
                    this.LoadJSONObj(args.path, function (object) {
                        //self.scene.add( object );
                        object.uuid = args.uuid;
                        callback(object);
                    });
                }
            }
        }, {
            key: "LoadJSONObj",
            value: function LoadJSONObj(filename, callback) {
                var filepath;
                if (this.bfixedassetpath) {
                    filepath = "/assets/" + filename;
                } else {
                    filename;
                    filepath = filename;
                }
                var loader = new THREE.JSONLoader();
                var name = filename;
                var self = this;
                var name = filename;
                loader.load(filepath, function (geometry, materials) {
                    var material = materials[0];
                    material.morphTargets = true;
                    material.color.setHex(0xffaaaa);
                    var faceMaterial = new THREE.MultiMaterial(materials);
                    var mesh = new THREE.Mesh(geometry, faceMaterial);
                    mesh.name = name;
                    callback(mesh);
                    //self.scene.add( mesh );
                    name = null;
                    loader = null;
                }, this.onProgressModel, this.onErrorModel);
            }
        }, {
            key: "LoadFBX",
            value: function LoadFBX(filename, callback) {
                var filepath;
                if (this.bfixedassetpath) {
                    filepath = "/assets/" + filename;
                } else {
                    filename;
                    filepath = filename;
                }
                var name = filename;
                //console.log(filepath);
                var loader = new THREE.FBXLoader(this.manager);
                var self = this;
                loader.load(filepath, function (object) {
                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {}
                        if (child instanceof THREE.SkinnedMesh) {
                            if (child.geometry.animations !== undefined || child.geometry.morphAnimations !== undefined) {
                                child.mixer = new THREE.AnimationMixer(child);
                                //mixers.push( child.mixer );
                                var action = child.mixer.clipAction(child.geometry.animations[0]);
                                action.play();
                            }
                        }
                    });
                    //self.scene.add( object );
                    object.name = filename;
                    //console.log("///////////////////////////////");
                    //console.log(object.name);
                    callback(object);
                    name = null;
                    loader = null;
                }, this.onProgressModel, this.onErrorModel);
            }
        }, {
            key: "LoadDAE",
            value: function LoadDAE(filename, callback) {
                var filepath;
                if (this.bfixedassetpath) {
                    filepath = "/assets/" + filename;
                } else {
                    filename;
                    filepath = filename;
                }
                var loader = new THREE.ColladaLoader(this.manager);
                var self = this;
                loader.options.convertUpAxis = true;
                loader.load(filepath, function (collada) {
                    var dae = collada.scene;
                    dae.traverse(function (child) {
                        if (child instanceof THREE.SkinnedMesh) {
                            var animation = new THREE.Animation(child, child.geometry.animation);
                            animation.play();
                        }
                    });
                    //dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
                    dae.updateMatrix();
                    //init();
                    //animate();
                    //self.scene.add( dae );
                    dae.name = filepath;
                    callback(dae);
                    console.log("added");
                    //name = null;
                    loader = null;
                }, this.onProgressModel, this.onErrorModel);
            }
        }, {
            key: "LoadOBJ",
            value: function LoadOBJ(filename, callback) {
                var self = this;
                //var name = filename;
                var filepath;
                if (this.bfixedassetpath) {
                    filepath = "/assets/" + filename;
                } else {
                    filename;
                    filepath = filename;
                }
                var loader = new THREE.OBJLoader(this.manager);
                //var loader = new THREE.OBJLoader();
                loader.load(filepath, function (object) {
                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {}
                    });
                    //object.position.y = - 95;
                    //self.scene.add( object );
                    object.name = filename;
                    callback(object);
                    //name = null;
                    loader = null;
                }, this.onProgressModel, this.onErrorModel);
            }
        }]);

        return Threejs_framework_loader;
    }(_threejs_framework_module.Threejs_framework_module);
});