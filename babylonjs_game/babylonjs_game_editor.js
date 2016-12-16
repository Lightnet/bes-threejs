define(['exports', './babylonjs_game_module'], function (exports, _babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_editor = undefined;

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

    var Babylonjs_game_editor = exports.Babylonjs_game_editor = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_editor, _Babylonjs_game_modul);

        function Babylonjs_game_editor(args) {
            _classCallCheck(this, Babylonjs_game_editor);

            return _possibleConstructorReturn(this, (Babylonjs_game_editor.__proto__ || Object.getPrototypeOf(Babylonjs_game_editor)).call(this, args));
        }

        _createClass(Babylonjs_game_editor, [{
            key: 'updateselectobject',
            value: function updateselectobject() {
                var self = this;
                if (self.selectobject != null) {
                    if (self.selectobject_text_id != null) {
                        self.selectobject_text_id.text = self.selectobject.id;
                    }
                    //===
                    if (self.selectobject_text_px != null) {
                        self.selectobject_text_px.text = self.selectobject.position.x.toString();
                        //console.log("found x",self.selectobject.position.x);
                    }
                    if (self.selectobject_text_py != null) {
                        self.selectobject_text_py.text = self.selectobject.position.y.toString();
                    }
                    if (self.selectobject_text_pz != null) {
                        self.selectobject_text_pz.text = self.selectobject.position.z.toString();
                    }
                    //===
                    if (self.selectobject_text_rx != null) {
                        self.selectobject_text_rx.text = self.selectobject.rotation.x.toString();
                    }
                    if (self.selectobject_text_ry != null) {
                        self.selectobject_text_ry.text = self.selectobject.rotation.y.toString();
                    }
                    if (self.selectobject_text_rz != null) {
                        self.selectobject_text_rz.text = self.selectobject.rotation.z.toString();
                    }
                    //===
                    if (self.selectobject_text_sx != null) {
                        self.selectobject_text_sx.text = self.selectobject.scaling.x.toString();
                    }
                    if (self.selectobject_text_sy != null) {
                        self.selectobject_text_sy.text = self.selectobject.scaling.y.toString();
                    }
                    if (self.selectobject_text_sz != null) {
                        self.selectobject_text_sz.text = self.selectobject.scaling.z.toString();
                    }
                }
            }
        }]);

        return Babylonjs_game_editor;
    }(_babylonjs_game_module.Babylonjs_game_module);
});