define(['exports', './babylonjs_game_module'], function (exports, _babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_terrain = undefined;

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

    var Babylonjs_game_terrain = exports.Babylonjs_game_terrain = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_terrain, _Babylonjs_game_modul);

        function Babylonjs_game_terrain(args) {
            _classCallCheck(this, Babylonjs_game_terrain);

            return _possibleConstructorReturn(this, (Babylonjs_game_terrain.__proto__ || Object.getPrototypeOf(Babylonjs_game_terrain)).call(this, args));
        }

        _createClass(Babylonjs_game_terrain, [{
            key: 'simpleterrain_load_hieghtmap',
            value: function simpleterrain_load_hieghtmap() {
                var ground = BABYLON.Mesh.CreateGroundFromHeightMap('your-mesh-name', '/path/to/heightmap.png', 100, // width of the ground mesh (x axis)
                100, // depth of the ground mesh (z axis)
                40, // number of subdivisions
                0, // min height
                50, // max height
                this.scene, false, // updateable?
                null // callback when mesh is ready
                );
            }
        }, {
            key: 'simpleterrain01',
            value: function simpleterrain01() {
                //http://www.babylonjs-playground.com/#PF032
                //http://www.html5gamedevs.com/topic/23973-editing-height-map-terrain/
                var ground = BABYLON.Mesh.CreateGround("ground", 128, 128, 2, this.scene, true);
                var material = new BABYLON.StandardMaterial("mat", this.scene);
                material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                ground.material = material;
                ground.material.wireframe = true;

                console.log(ground);

                var vp = ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                //var nm = ground.getVerticesData(BABYLON.VertexBuffer.NormalKind);
                //console.log(vp.length);
                //console.log(vp);
                //console.log(nm);
                //ground.geometry.
                //for (var i =0; i  < vp.length-3; i += 3) {
                //vp[i - 1] = Math.floor(Math.random() * 16);
                //console.log(vp[i - 2]);
                //}
                //console.log(JSON);

                this.engine.runRenderLoop(function () {
                    var vp = ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                    for (var i = 0; i < vp.length - 3; i += 3) {
                        vp[i + 1] = Math.floor(Math.random() * 32);
                    }

                    ground.setVerticesData(BABYLON.VertexBuffer.PositionKind, vp, false); //this is correct function params height set
                    /*
                    var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
                    width:128, height: 128,
                    subdivisions: 2,
                    minHeight: 0, maxHeight: 10,
                    buffer: vp, bufferWidth: 6, bufferHeight: 6
                    });
                    vertexData.applyToMesh(ground, true);
                    */
                });

                //for (var i =0; i  < vp.length; i += 3) {
                //vp[i + 3] = Math.floor(Math.random() * 16);
                //buffer.push(0, 0, 0);
                //}


                /*
                var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
                width:128, height: 128,
                subdivisions: 2,
                minHeight: 0, maxHeight: 10,
                buffer: vp, bufferWidth: 6, bufferHeight: 6
                });
                vertexData.applyToMesh(ground, true);
                */

                /*
                var buffer = [];
                for (var i = 26; i > 0; i--) {
                buffer.push(i, i, i);
                    //buffer.push(0, 0, 0);
                }
                var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
                width:32, height: 32,
                subdivisions: 2,
                minHeight: 0, maxHeight: 10,
                buffer: buffer, bufferWidth: 6, bufferHeight: 6
                });
                vertexData.applyToMesh(ground, true);
                */

                /*
                this.engine.runRenderLoop(function() {
                    //console.log(Math.random(0,256));
                    //console.log("main render!");
                    Math.floor(Math.random() * 255)
                    var buffer = [];
                    //buffer.push(128, 0, 0);
                    //buffer.push(0, 0, 0);
                    //buffer.push(0, 0, 0);
                	for (var i = 64; i > 0; i--) {
                        //buffer.push(0, 0, 0);
                		//buffer.push(Math.floor(Math.random() * 16),Math.floor(Math.random() * 16) , Math.floor(Math.random() * 16));
                        buffer.push(Math.floor(Math.random() * 16),0,0);
                        //buffer.push(0, 10, 0);
                          //if(64%2){
                            //buffer.push(0, 10, 0);
                        //}else{
                            //buffer.push(0, 0, 0);
                        //}
                  	}
                  	var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
                        width:32, height: 32,
                		subdivisions: 8,
                		minHeight: 0, maxHeight: 200,
                		buffer: buffer, bufferWidth: 6, bufferHeight: 6
                	});
                	vertexData.applyToMesh(ground, true);
                });
                */
            }
        }, {
            key: 'simpleterrain02',
            value: function simpleterrain02() {
                //http://www.babylonjs-playground.com/#1ED5OQ#5
                //http://www.html5gamedevs.com/topic/23973-editing-height-map-terrain/
                //http://www.html5gamedevs.com/topic/23973-editing-height-map-terrain/
                var sections = 6;

                var ground = BABYLON.Mesh.CreateGround("ground", 4, 4, sections, this.scene, true);
                ground.material = new BABYLON.StandardMaterial("gmat", this.scene);
                ground.material.wireframe = true;
                ground.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
                ground.material.backFaceCulling = false;

                var buffer = [];

                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);

                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);
                buffer.push(255, 255, 255);

                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);

                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);
                buffer.push(127, 127, 127);

                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);

                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                buffer.push(0, 0, 0);
                console.log(buffer.length);
                console.log((sections + 1) * (sections + 1) * 3);
                var minHeight = 0;
                var maxHeight = 2;
                // ground.applyDisplacementMapFromBuffer(buffer, sections, sections, minHeight, maxHeight);
                var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
                    width: 4, height: 4,
                    subdivisions: sections,
                    minHeight: 0, maxHeight: 2,
                    buffer: buffer, bufferWidth: 6, bufferHeight: 6
                });
                vertexData.applyToMesh(ground, true);
                // scene.debugLayer.show();
            }
        }, {
            key: 'simpleterrain03',
            value: function simpleterrain03() {
                //http://www.babylonjs-playground.com/#PF032
                //http://www.html5gamedevs.com/topic/23973-editing-height-map-terrain/
                var ground = BABYLON.Mesh.CreateGround("ground", 128, 128, 2, this.scene, false);
                var material = new BABYLON.StandardMaterial("mat", this.scene);
                material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                ground.material = material;
                ground.material.wireframe = true;
                //console.log(ground);
                var vp = ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                for (var i = 0; i < vp.length - 3; i += 3) {
                    vp[i + 1] = Math.floor(Math.random() * 8);
                }

                ground.setVerticesData(BABYLON.VertexBuffer.PositionKind, vp, false); //this is correct function params height set
                ground.showBoundingBox = true;
                //ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.HeightmapImpostor, restitution: 0, mass:0, friction:1});
                //ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, restitution: 0.9, mass:0, friction:1});
                //ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, restitution: 0.9, mass:0, friction:1});
                ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.MeshImpostor, restitution: 0.9, mass: 0, friction: 1 });

                /*
                this.engine.runRenderLoop(function() {
                    var vp = ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                    for (var i =0; i  < vp.length - 3; i += 3) {
                        vp[i + 1] = Math.floor(Math.random() * 32);
                	}
                      ground.setVerticesData(BABYLON.VertexBuffer.PositionKind,vp, false); //this is correct function params height set
                });
                */
            }
        }, {
            key: 'simpleterrain04',
            value: function simpleterrain04() {
                // Ground
                var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "assets/heightMap.png", 100, 100, 100, 0, 10, this.scene, false);
                //var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
                //groundMaterial.diffuseTexture = new BABYLON.Texture("assets/ground.jpg", this.scene);
                ground.showBoundingBox = true;
                //ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.HeightmapImpostor, restitution: 0, mass:0, friction:1});
                //ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, restitution: 0.9, mass:0, friction:1});
            }
        }]);

        return Babylonjs_game_terrain;
    }(_babylonjs_game_module.Babylonjs_game_module);
});