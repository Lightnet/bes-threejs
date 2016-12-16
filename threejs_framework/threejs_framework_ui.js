define(['exports', './threejs_framework_module'], function (exports, _threejs_framework_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_framework_ui = undefined;

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

    var Threejs_framework_ui = exports.Threejs_framework_ui = function (_Threejs_framework_mo) {
        _inherits(Threejs_framework_ui, _Threejs_framework_mo);

        function Threejs_framework_ui(args) {
            _classCallCheck(this, Threejs_framework_ui);

            return _possibleConstructorReturn(this, (Threejs_framework_ui.__proto__ || Object.getPrototypeOf(Threejs_framework_ui)).call(this, args));
        }

        return Threejs_framework_ui;
    }(_threejs_framework_module.Threejs_framework_module);
});