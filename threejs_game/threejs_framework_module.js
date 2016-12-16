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

    var Threejs_framework_module = exports.Threejs_framework_module = function Threejs_framework_module(args) {
        _classCallCheck(this, Threejs_framework_module);

        if (!args) {
            args = {};
            console.log("no args...");
        }
        var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for (var fun in propertyNames) {
            //console.log(fun);
            //console.log(propertyNames[fun]);
            if (propertyNames[fun] != "constructor") {
                args[propertyNames[fun]] = this[propertyNames[fun]];
            } else {
                //console.log('ignore ' + propertyNames[fun] );
            }
        }
    };
});