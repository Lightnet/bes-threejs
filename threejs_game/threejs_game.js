define(['exports', '../threejs_framework/threejs_framework', './threejs_game_css3d', './threejs_game_terrain', './threejs_game_scene', './threejs_game_hud', './threejs_game_controller', './threejs_game_character', './threejs_game_physics'], function (exports, _threejs_framework, _threejs_game_css3d, _threejs_game_terrain, _threejs_game_scene, _threejs_game_hud, _threejs_game_controller, _threejs_game_character, _threejs_game_physics) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game = undefined;

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    // Converts from degrees to radians.
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    Math.degrees = function (radians) {
        return radians * 180 / Math.PI;
    };

    //RFC Type 4 (random) schema
    /*
    var uuid = function() {
        var buf = new Uint32Array(4);
        window.crypto.getRandomValues(buf);
        var idx = -1;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            idx++;
            var r = (buf[idx>>3] >> ((idx%8)*4))&15;
            var v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
    */

    var Threejs_game = exports.Threejs_game = function (_Threejs_framework) {
        _inherits(Threejs_game, _Threejs_framework);

        function Threejs_game(args) {
            _classCallCheck(this, Threejs_game);

            var _this = _possibleConstructorReturn(this, (Threejs_game.__proto__ || Object.getPrototypeOf(Threejs_game)).call(this, args));

            console.log("init Threejs_game...");
            if (!args) {
                args = {};
            }

            _this.character = null;
            _this.controllerid = 0;
            _this.keys = { left: 0, right: 0, forward: 0, back: 0, rotate_right: 0, rotate_left: 0 };
            _this.moveVector = THREE.Vector3(0, 0, 0);
            _this.tbv30 = new Ammo.btVector3();
            _this.transformAux1 = new Ammo.btTransform();
            //console.log(this.tbv30);

            new _threejs_game_css3d.Threejs_game_css3d(_this);
            new _threejs_game_terrain.Threejs_game_terrain(_this);
            new _threejs_game_scene.Threejs_game_scene(_this);
            new _threejs_game_hud.Threejs_game_hud(_this);
            new _threejs_game_controller.Threejs_game_controller(_this);
            new _threejs_game_character.Threejs_game_character(_this);
            new _threejs_game_physics.Threejs_game_physics(_this);

            return _this;
        }

        _createClass(Threejs_game, [{
            key: 'init',
            value: function init() {
                _get(Threejs_game.prototype.__proto__ || Object.getPrototypeOf(Threejs_game.prototype), 'init', this).call(this);
                this.setup();
            }
        }, {
            key: 'update',
            value: function update() {
                _get(Threejs_game.prototype.__proto__ || Object.getPrototypeOf(Threejs_game.prototype), 'update', this).call(this);
                //console.log("update?");
                if (this.controlOrbit != null) {
                    this.controlOrbit.update();
                    //console.log("update??");
                }
            }
        }, {
            key: 'simulate',
            value: function simulate(dt) {
                this.updatePhysics(dt);
            }
        }, {
            key: 'start_physics',
            value: function start_physics() {
                console.log("start_physics");
                var self = this;
                var last = Date.now();
                function mainLoop() {
                    var now = Date.now();
                    self.simulate(now - last);
                    last = now;
                }

                if (this.interval) clearInterval(this.interval);
                this.interval = setInterval(mainLoop, 1000 / 60);
            }
        }, {
            key: 'create_sphere_physics',
            value: function create_sphere_physics() {
                var self = this;
                var geometry = new THREE.SphereBufferGeometry(1, 4, 4);
                var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                var sphere = new THREE.Mesh(geometry, material);
                this.scene.add(sphere);
                sphere.position.set(0, 10, 0);
                //var body = this.create_playershape({obj:threeObject});
                var body = this.create_boxshape({ obj: sphere });
                sphere.userData.physicsBody = body;

                sphere.update = function () {
                    var objPhys = sphere.userData.physicsBody;
                    var ms = objPhys.getMotionState();
                    if (ms) {
                        ms.getWorldTransform(self.transformAux1);
                        var p = self.transformAux1.getOrigin();
                        var q = self.transformAux1.getRotation();
                        sphere.position.set(p.x(), p.y(), p.z());
                        //sphere.quaternion.set( q.x(), q.y(), q.z(), q.w() );
                        //console.log("update?");
                    }
                };
                this.world.addRigidBody(body);
            }
        }, {
            key: 'setup',
            value: function setup() {
                this.bablephysics = true;
                this.initPhysics();
                this.create_input();
                this.camera.position.set(0, 20, 512);
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                this.start_physics();
                //this.controlOrbit = new THREE.OrbitControls( this.camera );
                this.hideloadingscreen();
                //console.log(window.width);
                //console.log(screen.width);
                console.log("setup");
                //this.createBaseHUD();
                //this.createbasescene();
                //this.create_terrain03();
                this.create_terrain04();
                this.simple_pawn();
                //this.createinterface();
                var geometry = new THREE.BoxGeometry(2, 2, 2);
                var material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
                var cube = new THREE.Mesh(geometry, material);
                cube.position.set(0, 13, 5);
                //cube.update =function(){
                //cube.rotation.x += 0.1;
                //cube.rotation.y += 0.1;
                //};
                this.scene.add(cube);
                this.create_sphere_physics();

                //console.log(this.world);
            }
        }]);

        return Threejs_game;
    }(_threejs_framework.Threejs_framework);
});