define(['exports', './babylonjs_game_module'], function (exports, _babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_network = undefined;

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

    var Babylonjs_game_network = exports.Babylonjs_game_network = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_network, _Babylonjs_game_modul);

        function Babylonjs_game_network(args) {
            _classCallCheck(this, Babylonjs_game_network);

            return _possibleConstructorReturn(this, (Babylonjs_game_network.__proto__ || Object.getPrototypeOf(Babylonjs_game_network)).call(this, args));
            //var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
            //var propertyNames = Object.getOwnPropertyNames(this);
            //propertyNames.forEach(function(key) {
            //console.log(key);
            //if(key != constructor){
            //var desc = Object.getOwnPropertyDescriptor(this, key);
            //console.log(desc);
            //Object.defineProperty(clone, key, desc);
            //}
            //});
            /*
            for(var fun in propertyNames){
                //console.log(fun);
                //console.log(propertyNames[fun]);
                if(propertyNames[fun] != "constructor"){
                    args[propertyNames[fun]] = this[propertyNames[fun]];
                }else{
                    //console.log('ignore ' + propertyNames[fun] );
                }
            }
            */
        }

        _createClass(Babylonjs_game_network, [{
            key: 'setup_network',
            value: function setup_network() {
                var self = this;
                this.socket = io();
                this.socket.on('connect', function () {
                    console.log('server connected');
                    if (this.reload) {
                        location.reload();
                    }
                });

                this.socket.on('disconnect', function () {
                    console.log('server disconnected');
                    this.reload = true;
                });
            }
        }]);

        return Babylonjs_game_network;
    }(_babylonjs_game_module.Babylonjs_game_module);
});