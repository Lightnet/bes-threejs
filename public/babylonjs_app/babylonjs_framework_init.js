define(['exports', './babylonjs_framework_scene', './babylonjs_framework_gui'], function (exports, _babylonjs_framework_scene, _babylonjs_framework_gui) {
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

    var Babylonjs_framework_init = exports.Babylonjs_framework_init = function Babylonjs_framework_init(args) {
        _classCallCheck(this, Babylonjs_framework_init);

        console.log("init framework... ");
        if (args == null) {
            args = {};
        }
        new _babylonjs_framework_scene.Babylonjs_framework_scene(this);
        new _babylonjs_framework_gui.Babylonjs_framework_gui(this);
    };
});