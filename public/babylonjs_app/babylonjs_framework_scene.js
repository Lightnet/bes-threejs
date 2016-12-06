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

    var Babylonjs_framework_scene = exports.Babylonjs_framework_scene = function () {
        function Babylonjs_framework_scene(self) {
            _classCallCheck(this, Babylonjs_framework_scene);

            if (self != null) {
                self.CreateScene = this.CreateScene;
            }
        }

        _createClass(Babylonjs_framework_scene, [{
            key: "CreateScene",
            value: function CreateScene() {
                console.log("CreateScene");
            }
        }]);

        return Babylonjs_framework_scene;
    }();
});