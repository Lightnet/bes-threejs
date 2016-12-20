define(["exports", "../system/Babylonjs_game_module"], function (exports, _Babylonjs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_editor = undefined;

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

    var Babylonjs_game_editor = exports.Babylonjs_game_editor = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_editor, _Babylonjs_game_modul);

        function Babylonjs_game_editor(args) {
            _classCallCheck(this, Babylonjs_game_editor);

            return _possibleConstructorReturn(this, (Babylonjs_game_editor.__proto__ || Object.getPrototypeOf(Babylonjs_game_editor)).call(this, args));
        }

        _createClass(Babylonjs_game_editor, [{
            key: "getGroundPosition",
            value: function getGroundPosition() {
                var scene = this.scene;
                // Use a predicate to get position on the ground
                //var pickinfo = scene.pick(scene.pointerX, scene.pointerY);
                //return pickinfo.pickedPoint;
                return new BABYLON.Vector2(scene.pointerX, scene.pointerY);
            }
        }, {
            key: "clickMesh",
            value: function clickMesh(lastMesh, currentMesh) {
                // If we click again the already selected mesh then there is no reason to remove axis and add them again
                if (lastMesh == currentMesh) return;

                // Show axis for the current mesh
                for (var i = 0; i < currentMesh.getChildren().length; i++) {
                    currentMesh.getChildren()[i].isVisible = true;
                } // Remove axis for the previous mesh
                if (lastMesh != null) {
                    if (lastMesh.getChildren().length > 0) for (var i = 0; i < lastMesh.getChildren().length; i++) {
                        lastMesh.getChildren()[i].isVisible = false;
                    }
                }
            }
        }, {
            key: "scenepick_editor",
            value: function scenepick_editor() {
                var self = this;
                // Events
                var startingPoint;
                var currentMesh;
                var lastMesh;
                var pickedAxis = "";
                //When pointer down event is raised
                this.scene.onPointerDown = function (evt, pickInfo) {
                    // if the click hits the ground object, we change the impact position
                    if (pickInfo.hit) {
                        //console.log(pickInfo);
                        self.selectobject = pickInfo.pickedMesh;
                        self.updateselectobject();

                        // Check if an axis is clicked
                        if (pickInfo.pickedMesh.name == "X" || pickInfo.pickedMesh.name == "Y" || pickInfo.pickedMesh.name == "Z") {
                            pickedAxis = pickInfo.pickedMesh.name;
                            currentMesh = pickInfo.pickedMesh.parent;
                            startingPoint = self.getGroundPosition(evt);

                            if (startingPoint) {
                                // we need to disconnect camera from canvas
                                setTimeout(function () {
                                    self.camera.detachControl(self.canvas);
                                }, 0);
                            }
                        } else {
                            // Show axis for the clicked mesh. I think the meshes with axis should have some flag that should be checked here
                            self.clickMesh(lastMesh, pickInfo.pickedMesh);
                            lastMesh = pickInfo.pickedMesh;
                        }
                        //impact.position.x = pickResult.pickedPoint.x;
                        //impact.position.y = pickResult.pickedPoint.y;
                        //console.log("HIT"+pickResult.pickedPoint);
                    }
                };

                var onPointerDown = function onPointerDown(evt) {
                    if (evt.button !== 0) {
                        return;
                    }

                    // check if we clicked a mesh
                    var pickInfo = self.scene.pick(self.scene.pointerX, self.scene.pointerY);

                    if (pickInfo.hit) {
                        // Check if an axis is clicked
                        if (pickInfo.pickedMesh.name == "X" || pickInfo.pickedMesh.name == "Y" || pickInfo.pickedMesh.name == "Z") {
                            pickedAxis = pickInfo.pickedMesh.name;
                            currentMesh = pickInfo.pickedMesh.parent;
                            startingPoint = getGroundPosition(evt);

                            if (startingPoint) {
                                // we need to disconnect camera from canvas
                                setTimeout(function () {
                                    self.camera.detachControl(self.canvas);
                                }, 0);
                            }
                        } else {
                            // Show axis for the clicked mesh. I think the meshes with axis should have some flag that should be checked here
                            self.clickMesh(lastMesh, pickInfo.pickedMesh);
                            lastMesh = pickInfo.pickedMesh;
                        }
                    }
                };

                var onPointerUp = function onPointerUp() {
                    if (startingPoint) {
                        self.camera.attachControl(self.canvas, true);
                        startingPoint = null;
                        return;
                    }
                };

                var onPointerMove = function onPointerMove(evt) {
                    if (!startingPoint) {
                        return;
                    }

                    var current = self.getGroundPosition(evt);
                    console.log(current);
                    if (!current) {
                        return;
                    }

                    var compensationFactor = 50;
                    switch (pickedAxis) {
                        case "X":
                            var diff = current.subtract(startingPoint);
                            currentMesh.position.x -= diff.x / compensationFactor;
                            break;
                        case "Y":
                            var diff = current.subtract(startingPoint);
                            currentMesh.position.y -= diff.y / compensationFactor;
                            break;
                        case "Z":
                            var diff = current.subtract(startingPoint);
                            currentMesh.position.z += diff.x / compensationFactor;
                            break;
                    }
                    startingPoint = current;
                };

                self.canvas.addEventListener("pointerdown", onPointerDown, false);
                self.canvas.addEventListener("pointerup", onPointerUp, false);
                self.canvas.addEventListener("pointermove", onPointerMove, false);
            }
        }, {
            key: "showAxis",
            value: function showAxis(size, mesh) {
                //http://www.babylonjs-playground.com/#11AOBV#2
                //http://www.html5gamedevs.com/topic/16687-axis-dragging/
                var scene = this.scene;
                var makeTextPlane = function makeTextPlane(text, color, size, name) {
                    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
                    dynamicTexture.hasAlpha = true;
                    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
                    var plane = BABYLON.Mesh.CreatePlane(name, size * 3, scene, true);
                    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
                    plane.material.backFaceCulling = false;
                    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
                    plane.material.diffuseTexture = dynamicTexture;
                    return plane;
                };

                // X AXIS
                var axisX = BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0)], scene);
                axisX.isVisible = false;
                axisX.parent = mesh;
                axisX.color = new BABYLON.Color3(1, 0, 0);
                var xChar = makeTextPlane("X", "red", size / 10, "X");
                xChar.isVisible = false;
                xChar.parent = mesh;
                xChar.position = new BABYLON.Vector3(0.9 * size, 0, 0);

                // Y AXIS
                var axisY = BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0)], scene);
                axisY.isVisible = false;
                axisY.parent = mesh;
                axisY.color = new BABYLON.Color3(0, 1, 0);
                var yChar = makeTextPlane("Y", "green", size / 10, "Y");
                yChar.isVisible = false;
                yChar.parent = mesh;
                yChar.position = new BABYLON.Vector3(0, 1.1 * size, 0);

                // Z AXIS
                var axisZ = BABYLON.Mesh.CreateLines("axisZ", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size)], scene);
                axisZ.isVisible = false;
                axisZ.parent = mesh;
                axisZ.color = new BABYLON.Color3(0, 0, 1);
                var zChar = makeTextPlane("Z", "blue", size / 10, "Z");
                zChar.isVisible = false;
                zChar.parent = mesh;
                zChar.position = new BABYLON.Vector3(0, 0, 0.9 * size);
            }
        }, {
            key: "setupeditor",
            value: function setupeditor() {
                //console.log("setupeditor");
                var self = this;
                var editor_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "screencanvas_group2d",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(editor_group2d, { text: 'Drag Panel', x: 10, y: -142 });

                //tab
                this.create_R2D_Text01(panel, { text: "Object", balign: true, x: 10, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Transform", balign: true, x: 84, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Materials", balign: true, x: 158, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Scripts", balign: true, x: 234, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Animations", balign: true, x: 308, y: -32 * 1, width: 70 });

                //props
                var _obj = null;
                this.create_R2D_Text01(panel, { text: "ID:", x: 10, y: -32 * 2 });
                _obj = this.create_R2D_TextInput01(panel, { text: "None", x: 34, y: -32 * 2, returnarray: true });
                this.selectobject_text_id = _obj[1];

                this.create_R2D_Text01(panel, { text: "px", x: 10, y: -32 * 3 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 3, returnarray: true });
                this.selectobject_text_px = _obj[1];
                this.create_R2D_Text01(panel, { text: "py", x: 10, y: -32 * 4 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 4, returnarray: true });
                this.selectobject_text_py = _obj[1];
                this.create_R2D_Text01(panel, { text: "pz", x: 10, y: -32 * 5 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 5, returnarray: true });
                this.selectobject_text_pz = _obj[1];

                this.create_R2D_Text01(panel, { text: "rx", x: 10, y: -32 * 6 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 6, returnarray: true });
                this.selectobject_text_rx = _obj[1];
                this.create_R2D_Text01(panel, { text: "ry", x: 10, y: -32 * 7 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 7, returnarray: true });
                this.selectobject_text_ry = _obj[1];
                this.create_R2D_Text01(panel, { text: "rz", x: 10, y: -32 * 8 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 8, returnarray: true });
                this.selectobject_text_rz = _obj[1];

                this.create_R2D_Text01(panel, { text: "sx", x: 10, y: -32 * 9 });
                _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 9, returnarray: true });
                this.selectobject_text_sx = _obj[1];
                this.create_R2D_Text01(panel, { text: "sy", x: 10, y: -32 * 10 });
                _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 10, returnarray: true });
                this.selectobject_text_sy = _obj[1];
                this.create_R2D_Text01(panel, { text: "sz", x: 10, y: -32 * 11 });
                _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 11, returnarray: true });
                this.selectobject_text_sz = _obj[1];

                this.editor_ui = editor_group2d;
            }
        }, {
            key: "updateselectobject",
            value: function updateselectobject() {
                var self = this;
                if (self.selectobject != null) {
                    if (self.selectobject_text_id != null) {
                        self.selectobject_text_id.text = self.selectobject.id;
                    }
                    //===
                    if (self.selectobject_text_px != null) {
                        self.selectobject_text_px.text = self.selectobject.position.x.toString();
                        //console.log("found x",self.selectobject.position.x);
                    }
                    if (self.selectobject_text_py != null) {
                        self.selectobject_text_py.text = self.selectobject.position.y.toString();
                    }
                    if (self.selectobject_text_pz != null) {
                        self.selectobject_text_pz.text = self.selectobject.position.z.toString();
                    }
                    //===
                    if (self.selectobject_text_rx != null) {
                        self.selectobject_text_rx.text = self.selectobject.rotation.x.toString();
                    }
                    if (self.selectobject_text_ry != null) {
                        self.selectobject_text_ry.text = self.selectobject.rotation.y.toString();
                    }
                    if (self.selectobject_text_rz != null) {
                        self.selectobject_text_rz.text = self.selectobject.rotation.z.toString();
                    }
                    //===
                    if (self.selectobject_text_sx != null) {
                        self.selectobject_text_sx.text = self.selectobject.scaling.x.toString();
                    }
                    if (self.selectobject_text_sy != null) {
                        self.selectobject_text_sy.text = self.selectobject.scaling.y.toString();
                    }
                    if (self.selectobject_text_sz != null) {
                        self.selectobject_text_sz.text = self.selectobject.scaling.z.toString();
                    }
                }
            }
        }]);

        return Babylonjs_game_editor;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});