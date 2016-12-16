define(["exports", "./threejs_game_module"], function (exports, _threejs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_controller = undefined;

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

    var Threejs_game_controller = exports.Threejs_game_controller = function (_Threejs_game_module) {
        _inherits(Threejs_game_controller, _Threejs_game_module);

        function Threejs_game_controller(args) {
            _classCallCheck(this, Threejs_game_controller);

            return _possibleConstructorReturn(this, (Threejs_game_controller.__proto__ || Object.getPrototypeOf(Threejs_game_controller)).call(this, args));
        }

        _createClass(Threejs_game_controller, [{
            key: "create_input",
            value: function create_input() {
                var self = this;

                //this.keys={letft:0,right:0,forward:0,back:0};
                window.addEventListener("keydown", handleKeyDown, false);
                window.addEventListener("keyup", handleKeyUp, false);
                function handleKeyDown(evt) {
                    console.log(evt.keyCode);
                    //if (evt.keyCode==69){//E
                    if (evt.keyCode == 70) {
                        //E
                        if (self.character != null) {
                            //console.log(self.character);
                            if (typeof self.character.interact === 'function') {
                                self.character.interact();
                            }
                        }
                    }
                    if (evt.keyCode == 90) {
                        //Z
                        if (self.character != null) {
                            //console.log(self.character);
                            //if(typeof self.character.impulse === 'function'){
                            //self.character.impulse();
                            //}
                            //self.start_physics();
                            //self.create_sphere_physics();
                            self.character.movephysics();
                        }
                    }

                    if (evt.keyCode == 88) {
                        //X
                        if (self.character != null) {
                            //console.log(self.character);
                            //if(typeof self.character.impulse === 'function'){
                            //self.character.impulse();
                            //}
                            //self.start_physics();
                            self.create_sphere_physics();
                        }
                    }

                    if (evt.keyCode == 67) {
                        //C
                        if (self.character != null) {
                            //console.log(self.character);
                            //if(typeof self.character.impulse === 'function'){
                            //self.character.impulse();
                            //}
                            //self.start_physics();
                            self.create_sphere_physics();
                        }
                    }

                    if (evt.keyCode == 81) {
                        //Q
                        self.keys.rotate_left = 1;
                        //console.log("left");
                    }
                    if (evt.keyCode == 69) {
                        //E
                        self.keys.rotate_right = 1;
                    }

                    if (evt.keyCode == 65) {
                        //A
                        self.keys.left = 1;
                        //console.log("left");
                    }
                    if (evt.keyCode == 68) {
                        //D
                        self.keys.right = 1;
                        //console.log("right");
                    }
                    if (evt.keyCode == 87) {
                        //W
                        self.keys.forward = 1;
                        //console.log("up");
                    }
                    if (evt.keyCode == 83) {
                        //S
                        self.keys.back = 1;
                        //console.log("down");
                    }
                }

                function handleKeyUp(evt) {
                    if (evt.keyCode == 81) {
                        //Q
                        self.keys.rotate_left = 0;
                    }
                    if (evt.keyCode == 69) {
                        //E
                        self.keys.rotate_right = 0;
                    }
                    if (evt.keyCode == 65) {
                        self.keys.left = 0;
                    }
                    if (evt.keyCode == 68) {
                        self.keys.right = 0;
                    }
                    if (evt.keyCode == 87) {
                        self.keys.forward = 0;
                    }
                    if (evt.keyCode == 83) {
                        self.keys.back = 0;
                    }
                }
            }
        }]);

        return Threejs_game_controller;
    }(_threejs_game_module.Threejs_game_module);
});