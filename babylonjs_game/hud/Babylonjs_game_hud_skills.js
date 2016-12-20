define(["exports", "../system/Babylonjs_game_module"], function (exports, _Babylonjs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_hud_skills = undefined;

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

    var Babylonjs_game_hud_skills = exports.Babylonjs_game_hud_skills = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_hud_skills, _Babylonjs_game_modul);

        function Babylonjs_game_hud_skills(args) {
            _classCallCheck(this, Babylonjs_game_hud_skills);

            return _possibleConstructorReturn(this, (Babylonjs_game_hud_skills.__proto__ || Object.getPrototypeOf(Babylonjs_game_hud_skills)).call(this, args));
        }

        _createClass(Babylonjs_game_hud_skills, [{
            key: "createskillsHUD",
            value: function createskillsHUD() {
                console.log("createinventoryHUD();");
                var self = this;
                var skills_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "inventory_group2d" + "test",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(skills_group2d, { text: 'Drag Skills', x: 10, y: -142 });

                this.create_R2D_Text01(panel, { text: "Items", balign: true, x: 10, y: -32 * 1, width: 70 });

                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 2 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 3 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 4 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 5 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 6 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 7 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 8 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 9 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 10 });
                this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 11 });
                this.skills_ui = skills_group2d;
            }
        }]);

        return Babylonjs_game_hud_skills;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});