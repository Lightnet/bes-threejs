define(['exports', './Babylonjs_game_module', '../rpg/RPGTerrain', '../rpg/RPGMesh', '../rpg/RPGCube', '../rpg/RPGSphere', '../rpg/RPGCylinder', '../rpg/RPGNPCCharacter'], function (exports, _Babylonjs_game_module, _RPGTerrain, _RPGMesh, _RPGCube, _RPGSphere, _RPGCylinder, _RPGNPCCharacter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_loadsave = undefined;

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

    var Babylonjs_game_loadsave = exports.Babylonjs_game_loadsave = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_loadsave, _Babylonjs_game_modul);

        function Babylonjs_game_loadsave(args) {
            _classCallCheck(this, Babylonjs_game_loadsave);

            return _possibleConstructorReturn(this, (Babylonjs_game_loadsave.__proto__ || Object.getPrototypeOf(Babylonjs_game_loadsave)).call(this, args));
        }

        //BABYLONJSAPI.SaveSceneMap();

        _createClass(Babylonjs_game_loadsave, [{
            key: 'check_gunsceneobj',
            value: function check_gunsceneobj(uuid, cb) {
                //console.log("------------------- start");
                var self = this;
                this.gun.get('scene').value(function (data) {

                    console.log("check scene?" + Object.keys(data).length);
                    var bfound = false;
                    var count = 0;
                    function checkid(state, id) {
                        if (Object.keys(data).length - 1 == count && state == false && bfound == false) {
                            console.log("not found object!");
                            cb(false);
                        }
                    }
                    for (var o in data) {
                        if (data[o] != null) {
                            if (data[o]['#'] != null) {
                                console.log(data[o]['#']);
                                self.gun.get(data[o]['#']).value(function (objdata) {
                                    console.log(objdata);
                                    if (objdata['uuid'] != null) {
                                        if (objdata['uuid'].toString() == String(uuid)) {
                                            console.log(objdata['uuid']);
                                            //return cb(true, data[o]['#']);
                                            bfound = true;
                                            //console.log("found!");
                                            //return checkid(true,data[o]['#']);
                                            return cb(true, data[o]['#']);
                                        }
                                    }
                                });
                            }
                        }
                        checkid(false);
                        count++;
                    }
                    //return cb(bfound);
                    //console.log("END GUN CHECK...");
                    //console.log(data[1]);
                });
                //return cb(false);
                //console.log("------------------- end");
            }

            //BABYLONJSAPI.SaveSceneMap();

        }, {
            key: 'SaveObject',
            value: function SaveObject(obj) {
                var _this2 = this;

                //console.log(typeof obj);
                //console.log(obj , ":" ,RPGTerrain);
                console.log(obj);

                if (obj instanceof _RPGMesh.RPGMesh) {
                    //console.log("match! RPGMesh");
                } else if (obj instanceof _RPGTerrain.RPGTerrain) {
                    //console.log("match! RPGTerrain");
                } else if (obj instanceof _RPGCube.RPGCube) {
                    //console.log("match! RPGCube");
                } else if (obj instanceof _RPGSphere.RPGSphere) {
                    //console.log("match! RPGSphere");
                } else if (obj instanceof _RPGCylinder.RPGCylinder) {
                    console.log("match! RPGCylinder");
                } else if (obj instanceof _RPGNPCCharacter.RPGNPCCharacter) {
                    console.log("match! RPGNPCCharacter");
                } else {
                    console.log("Not match getClass!");
                    return;
                }

                //console.log("saving object data????");
                this.check_gunsceneobj(obj['uuid'], function (bfind, id) {
                    //console.log("....CALLS");
                    var gscene = _this2.gun.get('scene');
                    //check child keys var is object to put var
                    function gunObjectAssign(_gun, _obj) {
                        for (var i in _obj) {
                            if (_typeof(_obj[i]) == 'object') {
                                console.log(i);
                                //pathing for object child of object
                                _gun.path(i).put(_obj[i]);
                                gunObjectAssign(_gun.path(i), _obj[i]);
                            }
                        }
                    }
                    if (bfind) {
                        console.log("set object scene[update]");
                        if (id != null) {
                            console.log(id);
                            gscene.path(id).put(obj);
                            gunObjectAssign(gscene.path(id), obj);
                        }
                    } else {
                        console.log("save object scene[insert]");
                        //console.log(obj);
                        gscene.set(obj);
                    }
                    console.log("object save?");
                });
            }
        }, {
            key: 'SaveCharacter',
            value: function SaveCharacter(args) {}

            //BABYLONJSAPI.SaveSceneMap();

        }, {
            key: 'SaveSceneMap',
            value: function SaveSceneMap() {
                //console.log(this.scene.meshes);
                for (var i = 0; i < this.scene.meshes.length; i++) {
                    if (this.scene.meshes[i].rpgobj != null) {
                        console.log("found! rpgobj");
                        //console.log(this.scene.meshes[i].rpgobj);
                        this.SaveObject(this.scene.meshes[i].rpgobj);
                    }
                    if (this.scene.meshes[i].status != null) {
                        console.log("found! status");
                        this.SaveCharacter(this.scene.meshes[i].status);
                    }
                }
            }
        }, {
            key: 'prase_gobject',
            value: function prase_gobject(obj) {
                //this.scene.meshes
                var bfound = false;
                for (var i = 0; i < this.scene.meshes.length; i++) {
                    if (this.scene.meshes[i].rpgobj != null) {
                        if (this.scene.meshes[i].rpgobj.uuid == obj['uuid']) {
                            bfound = true;
                            break;
                        }
                    }
                }
                if (bfound == false) {
                    //console.log(obj);
                    if (obj.nameClass != null) {
                        if (obj.nameClass == _RPGTerrain.RPGTerrain.getClass()) {
                            //console.log("found! RPGTerrain");
                            this.createterrain(obj);
                        }

                        if (obj.nameClass == _RPGMesh.RPGMesh.getClass()) {
                            //console.log("found! RPGMesh");
                        }

                        if (obj.nameClass == _RPGCube.RPGCube.getClass()) {
                            //console.log("found! RPGCube");
                            //console.log(obj);
                            this.parse_object(obj);
                        }

                        if (obj.nameClass == _RPGSphere.RPGSphere.getClass()) {
                            //console.log("found! RPGSphere");
                            this.parse_object(obj);
                        }

                        if (obj.nameClass == _RPGCylinder.RPGCylinder.getClass()) {
                            //console.log("found! RPGCylinder");
                            this.parse_object(obj);
                        }

                        if (obj.nameClass == _RPGNPCCharacter.RPGNPCCharacter.getClass()) {
                            //console.log("found! RPGCylinder");
                            this.create_character(obj);
                        }
                    }
                } else {
                    console.log("update object scene?");
                }
            }

            //BABYLONJSAPI.LoadSceneMap();

        }, {
            key: 'LoadSceneMap',
            value: function LoadSceneMap() {
                console.log("LOAD SCENE MAP");
                //this.gun.get('scene');
                var self = this;
                this.gun.get('scene').valueobj(function (data) {
                    for (var o in data) {
                        console.log(data[o]);
                        if (data[o] != null) {
                            self.prase_gobject(data[o]);
                        }
                    }
                });
                //load scene...
                this.ui_updatesceneobject();
            }

            //BABYLONJSAPI.DeleteSceneMap();

        }, {
            key: 'DeleteSceneMap',
            value: function DeleteSceneMap() {
                this.gun.get('scene').each(function (data) {
                    console.log(data);
                    //if(data)
                });

                var gscene = this.gun.get('scene');
                //gscene.get('EK3GlvzlK1Pi0Sg2hhhdZC5H').put(null);
            }
        }, {
            key: 'ClearSceneMap',
            value: function ClearSceneMap() {
                console.log("clear scene...");
                var delobjs = [];
                //console.log(this.scene.meshes.length);
                for (var i = 0; i < this.scene.meshes.length; i++) {
                    //console.log(this.scene.meshes[i]);
                    if (this.scene.meshes[i].rpgobj != null) {
                        //console.log(this.scene.meshes[i]);
                        //this.scene.meshes[i].dispose();
                        //console.log(this.scene.meshes[i].dispose());
                        delobjs.push(this.scene.meshes[i]);
                    }
                }
                for (var j = 0; j < delobjs.length; j++) {
                    delobjs[j].dispose();
                }
                delobjs = null;
                //console.log(this.scene.meshes.length);
            }
        }]);

        return Babylonjs_game_loadsave;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});