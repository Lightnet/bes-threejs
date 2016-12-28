define(['exports', './Babylonjs_game_module'], function (exports, _Babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_gundb = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var Babylonjs_game_gundb = exports.Babylonjs_game_gundb = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_gundb, _Babylonjs_game_modul);

        function Babylonjs_game_gundb(args) {
            _classCallCheck(this, Babylonjs_game_gundb);

            return _possibleConstructorReturn(this, (Babylonjs_game_gundb.__proto__ || Object.getPrototypeOf(Babylonjs_game_gundb)).call(this, args));
        }
        //BABYLONJSAPI.SaveSceneMap();

        _createClass(Babylonjs_game_gundb, [{
            key: 'init_gundb',
            value: function init_gundb() {

                Gun.chain.live = function (cb, opt) {
                    return this.on(function (val, field) {
                        delete val._;
                        cb.call(this, val, field);
                    }, opt);
                };

                Gun.chain.value = function (cb, opt) {
                    return this.val(function (val, field) {
                        delete val._;
                        cb.call(this, val, field);
                    }, opt);
                };

                Gun.chain.each = function () {
                    var each = this.map();
                    return this.val.apply(each, arguments);
                };

                function gunObjDataAssign(self, data) {
                    for (var i in data) {
                        if (_typeof(data[i]) === 'object') {
                            if (data[i] != null) {
                                var id = data[i]['#'];
                                data[i] = {}; //clear id hash
                                self.get(id).val(function (objdata) {
                                    delete objdata._;
                                    data[i] = objdata;
                                    gunObjDataAssign(self, objdata);
                                });
                            }
                        }
                    }
                }

                Gun.chain.valueobj = function (cb, opt) {
                    return this.val(function (val, field) {
                        if (val != null) {
                            delete val._;
                        }
                        gunObjDataAssign(this, val);
                        cb.call(this, val, field);
                    }, opt);
                };

                Gun.chain.liveobj = function (cb, opt) {
                    return this.on(function (val, field) {
                        delete val._;
                        gunObjDataAssign(this, val);
                        cb.call(this, val, field);
                    }, opt);
                };

                Gun.chain.eachobj = function () {
                    var each = this.map();
                    return this.valueobj.apply(each, arguments);
                };

                //this.peers = ['http://127.0.0.1/gun'];
                this.peers = ['https://hgdb.herokuapp.com/gun'];
                this.gun = Gun(this.peers);
                //var gun = this.gun;
                //gun.get('greetings').each(function (example) {
                //console.log(example)
                //});
            }
        }]);

        return Babylonjs_game_gundb;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});