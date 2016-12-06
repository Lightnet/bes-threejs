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

    var Babylonjs_framework_gui = exports.Babylonjs_framework_gui = function () {
        function Babylonjs_framework_gui(self) {
            _classCallCheck(this, Babylonjs_framework_gui);

            if (self != null) {
                self.createui = this.createui;
            }
        }

        _createClass(Babylonjs_framework_gui, [{
            key: "createui",
            value: function createui() {
                console.log("createui");
            }
        }]);

        return Babylonjs_framework_gui;
    }();
});