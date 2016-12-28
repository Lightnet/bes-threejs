define(['exports', '../system/Babylonjs_game_module'], function (exports, _Babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_load = undefined;

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

    var Babylonjs_game_load = exports.Babylonjs_game_load = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_load, _Babylonjs_game_modul);

        function Babylonjs_game_load(args) {
            _classCallCheck(this, Babylonjs_game_load);

            return _possibleConstructorReturn(this, (Babylonjs_game_load.__proto__ || Object.getPrototypeOf(Babylonjs_game_load)).call(this, args));
        }

        _createClass(Babylonjs_game_load, [{
            key: 'loadmap_requestXML',
            value: function loadmap_requestXML() {
                console.log("init map json load...");
                var self = this;
                var req = new XMLHttpRequest();
                req.open('GET', 'http://127.0.0.1/prototype.json');
                req.onreadystatechange = function () {
                    //alert(req.responseText);
                    //console.log(req.responseText);
                    if (req.readyState == 4) {
                        if (req.status == 200) {
                            //alert(req.responseText);
                            //console.log(req.responseText);
                            self.prase_mapjson(req.responseText);
                            //console.log("done loading?");
                        }
                    } else {
                            //alert("Error loading page\n");
                            //console.log("Error loading page\n");
                        }
                };
                req.send();
            }
        }]);

        return Babylonjs_game_load;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});