define(['exports', './threejs_game_module'], function (exports, _threejs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_scene = undefined;

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

    var Threejs_game_scene = exports.Threejs_game_scene = function (_Threejs_game_module) {
        _inherits(Threejs_game_scene, _Threejs_game_module);

        function Threejs_game_scene(args) {
            _classCallCheck(this, Threejs_game_scene);

            return _possibleConstructorReturn(this, (Threejs_game_scene.__proto__ || Object.getPrototypeOf(Threejs_game_scene)).call(this, args));
        }

        _createClass(Threejs_game_scene, [{
            key: 'createbasescene',
            value: function createbasescene() {
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                var cube = new THREE.Mesh(geometry, material);
                cube.update = function () {
                    cube.rotation.x += 0.1;
                    cube.rotation.y += 0.1;
                };
                this.scene.add(cube);
                this.camera.position.z = 5;
                //console.log(this.scene);
            }
        }, {
            key: 'createbasescene02',
            value: function createbasescene02() {
                var geometry = new THREE.BufferGeometry();
                // create a simple square shape. We duplicate the top left and bottom right
                // vertices because each vertex needs to appear once per triangle.
                var vertices = new Float32Array([-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0]);

                // itemSize = 3 because there are 3 values (components) per vertex
                geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                var mesh = new THREE.Mesh(geometry, material);
                mesh.update = function () {
                    //mesh.rotation.x += 0.1;
                    //mesh.rotation.y += 0.1;
                };
                this.scene.add(mesh);
                this.camera.position.z = 5;
                //console.log(this.scene);
            }
        }, {
            key: 'createbasescene03',
            value: function createbasescene03() {
                var geometry = new THREE.Geometry();
                var point = new THREE.Vector3(-1, 1, 0);
                geometry.vertices.push(point, new THREE.Vector3(-1, -1, 0), new THREE.Vector3(1, -1, 0));
                geometry.faces.push(new THREE.Face3(0, 1, 2));
                geometry.verticesNeedUpdate = true;
                geometry.computeBoundingSphere();

                var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                var mesh = new THREE.Mesh(geometry, material);
                console.log(mesh);
                mesh.update = function () {
                    //mesh.geometry.verticesNeedUpdate = true;
                    //mesh.rotation.x += 0.1;
                    //point.x += 0.1;
                    //if(point.x > 1){
                    //point.x = -1;
                    //}
                    //mesh.rotation.y += 0.1;
                };
                this.scene.add(mesh);
                this.camera.position.z = 10;
                //console.log(this.scene);
            }
        }]);

        return Threejs_game_scene;
    }(_threejs_game_module.Threejs_game_module);
});