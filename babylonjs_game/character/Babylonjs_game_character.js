define(['exports', '../system/Babylonjs_game_module', '../rpg/RPGCharacter', '../rpg/RPGNPCCharacter'], function (exports, _Babylonjs_game_module, _RPGCharacter, _RPGNPCCharacter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_character = undefined;

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

    var Babylonjs_game_character = exports.Babylonjs_game_character = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_character, _Babylonjs_game_modul);

        function Babylonjs_game_character(args) {
            _classCallCheck(this, Babylonjs_game_character);

            return _possibleConstructorReturn(this, (Babylonjs_game_character.__proto__ || Object.getPrototypeOf(Babylonjs_game_character)).call(this, args));
        }

        _createClass(Babylonjs_game_character, [{
            key: 'create_character',
            value: function create_character(args) {
                //console.log('create_character');
                args = args || {};
                var self = this;
                var tmpmodel = this.getmesh("CubeBody");
                //console.log("here tmp model?");
                tmpmodel.isVisible = true;
                //var objphysics = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, this.scene);
                var objphysics = BABYLON.MeshBuilder.CreateSphere("indicator", { diameter: 1, diameterX: 1 }, this.scene);
                objphysics.isVisible = false;
                tmpmodel.objphysics = objphysics;
                tmpmodel.objtype = "npc";

                //console.log(tmpmodel.id);
                //console.log(tmpmodel.uniqueId);

                objphysics.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, move: true, restitution: 0, mass: 1, friction: 10 });
                //console.log(typeof args['x']);
                //console.log(args['x'],args['y'],args['z']);
                //var px = Number( args['x'] ) ;
                //console.log(px);

                objphysics.position.x = Number(args['x']);
                objphysics.position.y = Number(args['y']);
                objphysics.position.z = Number(args['z']);

                //console.log(objphysics.position);


                //console.log(args['x'],":",args['y'],":",args['z']);
                //console.log(objphysics.position.x,":",objphysics.position.y,":",objphysics.position.z);
                objphysics.showBoundingBox = true;

                var keys = self.keys;
                tmpmodel.facedir = 0;
                var currentAngle = 0;

                var Material = new BABYLON.StandardMaterial("material", this.scene);
                Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

                var hit = BABYLON.Mesh.CreateBox("hit", 0.5, this.scene);
                hit.material = Material;

                tmpmodel.update = function () {
                    //console.log(leftstickmove);
                    //console.log(this.uniqueId);
                    var needMove = false;
                    if (self.controllerid == this.id) {
                        //vector forward direction
                        //this breaks
                        var forward = self.scene.activeCamera.getFrontPosition(1).subtract(self.scene.activeCamera.position).normalize();
                        forward.y = 0;
                        //get rotation dir
                        //var diffAngle = Math.atan2(-forward.x,-forward.z);
                        var diffAngle = Math.atan2(forward.x, forward.z);
                        //var currentAngle = 0;
                        //console.log(keys.left);
                        if (keys.left) {
                            //console.log("left");
                            currentAngle = diffAngle + Math.PI / 2;
                            needMove = true;
                        }
                        if (keys.right) {
                            currentAngle = diffAngle - Math.PI / 2;
                            needMove = true;
                        }
                        if (keys.forward) {
                            currentAngle = diffAngle + Math.PI;;
                            needMove = true;
                        }
                        if (keys.back) {
                            currentAngle = diffAngle;
                            needMove = true;
                        }

                        //gamepad
                        if (self.leftstickmove) {
                            var joyangle = Math.atan2(self.joyleftdir.x, -self.joyleftdir.z);
                            currentAngle = diffAngle + joyangle + Math.PI;
                            tmpmodel.rotation.y = currentAngle;
                            var rot = diffAngle + joyangle;
                            var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 10), BABYLON.Matrix.RotationY(rot));
                            tmpmodel.objphysics.physicsImpostor.setLinearVelocity(v2);
                        }

                        if (needMove) {
                            var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -10), BABYLON.Matrix.RotationY(currentAngle));
                            tmpmodel.objphysics.physicsImpostor.setLinearVelocity(v2);
                            tmpmodel.rotation.y = currentAngle;
                            v2 = null;
                            tmpmodel.facedir = currentAngle;
                        }

                        var objpos = tmpmodel.objphysics.position.clone();
                        objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                        tmpmodel.position = objpos;

                        if (needMove == false) {
                            tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                        }

                        diffAngle = null;
                        currentAngle = null;
                        forward = null;
                    } else {
                        if (needMove == false) {
                            tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                        }

                        var objpos = tmpmodel.objphysics.position.clone();
                        objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                        tmpmodel.position = objpos;
                    }
                };

                tmpmodel.interact = function () {
                    console.log("interact");
                    //console.log("???" + model.facedir);
                    var fdir = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -2), BABYLON.Matrix.RotationY(tmpmodel.facedir));
                    var rayPick = new BABYLON.Ray(tmpmodel.objphysics.position, fdir, 2);
                    var meshFound = self.scene.pickWithRay(rayPick, function (item) {
                        //console.log(item.name);
                        //console.log(item.objtype);
                        if (item.objtype == null) {
                            return false;
                        }
                        if (item.objtype.indexOf("npc") == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (meshFound != null && meshFound.pickedPoint != null) {
                        console.log("found!");
                        //meshFound
                        console.log(meshFound.pickedMesh);
                        if (typeof meshFound.pickedMesh.interactmenu === 'function') {
                            meshFound.pickedMesh.interactmenu();
                        }

                        hit.position = meshFound.pickedPoint;
                    } else {
                        //console.log("not found!");
                    }
                    rayPick = null;
                    fdir = null;
                };

                tmpmodel.interactmenu = function () {
                    //console.log(this);
                    if (this.status != null) {
                        self.npc = this.status;
                        if (this.status.bshop) {
                            self.checkshop();
                        }
                    }
                };

                //var name = args['name'] || "none";
                //console.log(name)
                return tmpmodel;
            }
        }]);

        return Babylonjs_game_character;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});