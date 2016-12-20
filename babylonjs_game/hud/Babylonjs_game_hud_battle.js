define(['exports', '../system/Babylonjs_game_module'], function (exports, _Babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_hud_battle = undefined;

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

    var Babylonjs_game_hud_battle = exports.Babylonjs_game_hud_battle = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_hud_battle, _Babylonjs_game_modul);

        function Babylonjs_game_hud_battle(args) {
            _classCallCheck(this, Babylonjs_game_hud_battle);

            return _possibleConstructorReturn(this, (Babylonjs_game_hud_battle.__proto__ || Object.getPrototypeOf(Babylonjs_game_hud_battle)).call(this, args));
        }

        _createClass(Babylonjs_game_hud_battle, [{
            key: 'create2D_BattleHUD',
            value: function create2D_BattleHUD() {
                var self = this;
                //button
                this.AddButton(this.screencanvas, { id: 'button_escape', text: 'Escape', x: 10, y: 22 * 0 + 10 }, function () {
                    self.actionescape();
                });
                this.AddButton(this.screencanvas, { id: 'button_item', text: 'Items', x: 10, y: 22 * 1 + 10 }, function () {
                    self.openitem();
                });
                this.AddButton(this.screencanvas, { id: 'button_skills', text: 'Skills', x: 10, y: 22 * 2 + 10 }, function () {
                    self.openskills();
                });
                this.AddButton(this.screencanvas, { id: 'button_move', text: 'Move', x: 10, y: 22 * 3 + 10 }, function () {
                    self.openitem();
                });
                this.AddButton(this.screencanvas, { id: 'button_attack', text: 'Attack', x: 10, y: 22 * 4 + 10 }, function () {
                    self.actionattack();
                });
                this.AddButton(this.screencanvas, { id: 'button_attack', text: 'Enemy Attack', x: 150, y: 22 * 4 + 10 }, function () {
                    self.actionenemyattack();
                });
                this.AddButton(this.screencanvas, { id: 'button_battle', text: 'Battle', x: 10, y: 22 * 5 + 10 }, function () {
                    self.actionbattle();
                });
            }
        }]);

        return Babylonjs_game_hud_battle;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});