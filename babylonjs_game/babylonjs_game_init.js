define(['exports', '../system/babylonjs_game_module'], function (exports, _babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_init = undefined;

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

    var Babylonjs_game_init = exports.Babylonjs_game_init = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_init, _Babylonjs_game_modul);

        function Babylonjs_game_init(args) {
            _classCallCheck(this, Babylonjs_game_init);

            return _possibleConstructorReturn(this, (Babylonjs_game_init.__proto__ || Object.getPrototypeOf(Babylonjs_game_init)).call(this, args));
        }

        return Babylonjs_game_init;
    }(_babylonjs_game_module.Babylonjs_game_module);
});