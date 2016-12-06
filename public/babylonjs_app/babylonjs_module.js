define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Babylonjs_framework_module = exports.Babylonjs_framework_module = function () {
        function Babylonjs_framework_module(_self) {
            _classCallCheck(this, Babylonjs_framework_module);

            if (_self != null) {
                _self.Test = Test;
            }
        }

        _createClass(Babylonjs_framework_module, [{
            key: "Test",
            value: function Test() {
                console.log("test");
            }
        }]);

        return Babylonjs_framework_module;
    }();
});