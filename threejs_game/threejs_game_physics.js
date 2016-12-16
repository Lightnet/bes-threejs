define(['exports', './threejs_game_module'], function (exports, _threejs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_physics = undefined;

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

    var Threejs_game_physics = exports.Threejs_game_physics = function (_Threejs_game_module) {
        _inherits(Threejs_game_physics, _Threejs_game_module);

        function Threejs_game_physics(args) {
            _classCallCheck(this, Threejs_game_physics);

            return _possibleConstructorReturn(this, (Threejs_game_physics.__proto__ || Object.getPrototypeOf(Threejs_game_physics)).call(this, args));
        }

        _createClass(Threejs_game_physics, [{
            key: 'create_boxshape',
            value: function create_boxshape(args) {
                args = args || {};
                var shape;
                var margin = 0.05;
                //console.log(args);
                var _obj = args['obj'] || {};
                //console.log(_obj);
                var objectSize = args['objsize'] || 3;
                //console.log(objectSize);

                var radius = 1 + Math.random() * objectSize;

                var mass = objectSize * 5;
                var localInertia = new Ammo.btVector3(0, 0, 0);
                shape = new Ammo.btSphereShape(radius);
                shape.setMargin(margin);
                shape.calculateLocalInertia(mass, localInertia);
                //console.log(shape);
                var transform = new Ammo.btTransform();
                transform.setIdentity();
                var pos = _obj.position;
                transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
                var motionState = new Ammo.btDefaultMotionState(transform);
                var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
                var body = new Ammo.btRigidBody(rbInfo);
                //console.log(body);
                body.setFriction(1);
                body.setDamping(0.2, 1.0);

                return body;
            }

            //SPHERE

        }, {
            key: 'create_playershape',
            value: function create_playershape(args) {
                args = args || {};
                var shape;
                var margin = 0.05;
                //console.log(args);
                var _obj = args['obj'] || {};
                //console.log(_obj);
                var objectSize = args['objsize'] || 3;
                //console.log(objectSize);

                var radius = 1 + Math.random() * objectSize;

                var mass = objectSize * 5;
                var localInertia = new Ammo.btVector3(0, 0, 0);
                shape = new Ammo.btSphereShape(radius);
                shape.setMargin(margin);
                shape.calculateLocalInertia(mass, localInertia);
                //console.log(shape);
                var transform = new Ammo.btTransform();
                transform.setIdentity();
                var pos = _obj.position;
                transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
                var motionState = new Ammo.btDefaultMotionState(transform);
                var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
                var body = new Ammo.btRigidBody(rbInfo);
                //console.log(body);
                body.setFriction(1);
                body.setDamping(0.2, 1.0);

                return body;
            }
        }]);

        return Threejs_game_physics;
    }(_threejs_game_module.Threejs_game_module);
});