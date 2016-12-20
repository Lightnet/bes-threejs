define(["exports", "../system/Babylonjs_game_module"], function (exports, _Babylonjs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_scene = undefined;

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

    var Babylonjs_game_scene = exports.Babylonjs_game_scene = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_scene, _Babylonjs_game_modul);

        function Babylonjs_game_scene(args) {
            _classCallCheck(this, Babylonjs_game_scene);

            return _possibleConstructorReturn(this, (Babylonjs_game_scene.__proto__ || Object.getPrototypeOf(Babylonjs_game_scene)).call(this, args));
        }

        _createClass(Babylonjs_game_scene, [{
            key: "simple_scene",
            value: function simple_scene() {
                var scene = this.scene;
                //===============================================
                // simple scene
                //===============================================
                var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scenes[this.scenename]);

                var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
                var boxMaterial = new BABYLON.StandardMaterial("material", this.scenes[this.scenename]);
                boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
                box.material = boxMaterial;
                box.position.y = 10;
                box.position.x = -3;

                this.camera.setTarget(BABYLON.Vector3.Zero());
                //var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
                //box.position.y = 10;
                //box.position.x = -3;

                var box1 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
                box1.position.x = -5;
                box1.position.y = 1;
                //box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move: false, restitution: 1, mass: 0, friction: 0.5 });
                box1.showBoundingBox = true;
                var box2 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
                box2.position.x = 5;
                box2.position.y = 1;
                //box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move: false, restitution: 1, mass: 0, friction: 0.5 });
                box2.showBoundingBox = true;
                //https://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter#box
                // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
                //var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, this.scene);
                var ground = BABYLON.MeshBuilder.CreateBox("ground", { height: 1, width: 20, depth: 20 }, scene);
                //ground.scale.x = 100;
                //ground.scale.y = 100;
                ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move: false, restitution: 0, mass: 0, friction: 10 });
                ground.showBoundingBox = true;
            }
        }]);

        return Babylonjs_game_scene;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});