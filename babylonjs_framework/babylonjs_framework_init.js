define(['exports', './babylonjs_framework_module'], function (exports, _babylonjs_framework_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_framework_init = undefined;

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

    var Babylonjs_framework_init = exports.Babylonjs_framework_init = function (_Babylonjs_framework_) {
        _inherits(Babylonjs_framework_init, _Babylonjs_framework_);

        function Babylonjs_framework_init(args) {
            _classCallCheck(this, Babylonjs_framework_init);

            return _possibleConstructorReturn(this, (Babylonjs_framework_init.__proto__ || Object.getPrototypeOf(Babylonjs_framework_init)).call(this, args));
        }

        return Babylonjs_framework_init;
    }(_babylonjs_framework_module.Babylonjs_framework_module);
});