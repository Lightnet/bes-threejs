define(['exports', './threejs_game_module'], function (exports, _threejs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_css3d = undefined;

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

    var Threejs_game_css3d = exports.Threejs_game_css3d = function (_Threejs_game_module) {
        _inherits(Threejs_game_css3d, _Threejs_game_module);

        function Threejs_game_css3d(args) {
            _classCallCheck(this, Threejs_game_css3d);

            return _possibleConstructorReturn(this, (Threejs_game_css3d.__proto__ || Object.getPrototypeOf(Threejs_game_css3d)).call(this, args));
        }

        _createClass(Threejs_game_css3d, [{
            key: 'createinterface',
            value: function createinterface() {
                var html = '<div method="click">Click Me</div>';
                var methods = {
                    click: function click(elem) {
                        console.log('element clicked!', elem);
                    }
                };
                var options = {
                    throttle: 250, // throttle for the renderer in milliseconds, can be disabled with false (default 250ms)
                    observe: true, // watches the element for changes and re-renders (default true)
                    alwaysOnTop: false, // ensures the UI is always on top of everything in the scene (default false)
                    debug: false // places a small sphere at the click point (default false)
                };
                var ui = new THREE.Interface(html, methods, options);
                this.scene.add(ui);
            }
        }]);

        return Threejs_game_css3d;
    }(_threejs_game_module.Threejs_game_module);
});