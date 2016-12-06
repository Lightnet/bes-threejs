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

    var Babylonjs_framework = exports.Babylonjs_framework = function () {
        function Babylonjs_framework(args) {
            _classCallCheck(this, Babylonjs_framework);

            //super(args);
            this.test = "test";
            console.log("init framework");
            //return this;
        }

        _createClass(Babylonjs_framework, [{
            key: "init",
            value: function init() {
                console.log("testing...");
            }
        }, {
            key: "setup",
            value: function setup() {
                console.log("setup..");
            }
        }, {
            key: "setup_user",
            value: function setup_user() {
                console.log("setup user..");
            }
        }]);

        return Babylonjs_framework;
    }();
});