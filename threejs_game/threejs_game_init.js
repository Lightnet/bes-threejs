define(['exports', './threejs_game_module'], function (exports, _threejs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_init = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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

    var Threejs_game_init = exports.Threejs_game_init = function (_Threejs_game_module) {
        _inherits(Threejs_game_init, _Threejs_game_module);

        function Threejs_game_init(args) {
            _classCallCheck(this, Threejs_game_init);

            return _possibleConstructorReturn(this, (Threejs_game_init.__proto__ || Object.getPrototypeOf(Threejs_game_init)).call(this, args));
        }

        return Threejs_game_init;
    }(_threejs_game_module.Threejs_game_module);
});