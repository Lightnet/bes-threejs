define(['exports', './babylonjs_game_module'], function (exports, _babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_hud = undefined;

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

    var Babylonjs_game_hud = exports.Babylonjs_game_hud = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_hud, _Babylonjs_game_modul);

        function Babylonjs_game_hud(args) {
            _classCallCheck(this, Babylonjs_game_hud);

            return _possibleConstructorReturn(this, (Babylonjs_game_hud.__proto__ || Object.getPrototypeOf(Babylonjs_game_hud)).call(this, args));
        }

        _createClass(Babylonjs_game_hud, [{
            key: 'createspacecavnas2D',
            value: function createspacecavnas2D() {
                //screenCanvas
                this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
                    id: "ScreenCanvas",
                    enableInteraction: true //,
                });
                //console.log(this.screencanvas);
            }
        }, {
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
        }, {
            key: 'createinventoryHUD',
            value: function createinventoryHUD() {
                console.log("createinventoryHUD();");

                var self = this;
                var inventory_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "inventory_group2d" + "test",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(inventory_group2d, { text: 'Drag Inventory', x: 10, y: -142 });

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

                this.inventory_ui = inventory_group2d;
            }
        }, {
            key: 'createshopHUD',
            value: function createshopHUD() {
                console.log("createinventoryHUD();");

                var self = this;
                var shop_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "shop_group2d" + "test",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(shop_group2d, { text: 'Drag Skills', x: 10, y: -142 });

                this.create_R2D_Text01(panel, { text: "Shop", balign: true, x: 10, y: -32 * 1, width: 70 });

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
        }, {
            key: 'createskillsHUD',
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
        }, {
            key: 'createlootUI',
            value: function createlootUI() {
                console.log("createlootUI();");
                var self = this;
                var loot_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "loot_group2d",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(loot_group2d, { text: 'Drag Loot', x: 10, y: -142 });
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
            }
        }, {
            key: 'createstorageUI',
            value: function createstorageUI() {
                console.log("createstorageUI();");
                var self = this;
                var storage_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "loot_group2d",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(storage_group2d, { text: 'Drag Storage', x: 10, y: -142 });
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
            }
        }, {
            key: 'setupeditor',
            value: function setupeditor() {
                //console.log("setupeditor");
                var self = this;
                var editor_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "screencanvas_group2d",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                var panel = this.create_R2D_Drag01(editor_group2d, { text: 'Drag Panel', x: 10, y: -142 });

                //tab
                this.create_R2D_Text01(panel, { text: "Object", balign: true, x: 10, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Transform", balign: true, x: 84, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Materials", balign: true, x: 158, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Scripts", balign: true, x: 234, y: -32 * 1, width: 70 });
                this.create_R2D_Text01(panel, { text: "Animations", balign: true, x: 308, y: -32 * 1, width: 70 });

                //props
                var _obj = null;
                this.create_R2D_Text01(panel, { text: "ID:", x: 10, y: -32 * 2 });
                _obj = this.create_R2D_TextInput01(panel, { text: "None", x: 34, y: -32 * 2, returnarray: true });
                this.selectobject_text_id = _obj[1];

                this.create_R2D_Text01(panel, { text: "px", x: 10, y: -32 * 3 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 3, returnarray: true });
                this.selectobject_text_px = _obj[1];
                this.create_R2D_Text01(panel, { text: "py", x: 10, y: -32 * 4 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 4, returnarray: true });
                this.selectobject_text_py = _obj[1];
                this.create_R2D_Text01(panel, { text: "pz", x: 10, y: -32 * 5 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 5, returnarray: true });
                this.selectobject_text_pz = _obj[1];

                this.create_R2D_Text01(panel, { text: "rx", x: 10, y: -32 * 6 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 6, returnarray: true });
                this.selectobject_text_rx = _obj[1];
                this.create_R2D_Text01(panel, { text: "ry", x: 10, y: -32 * 7 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 7, returnarray: true });
                this.selectobject_text_ry = _obj[1];
                this.create_R2D_Text01(panel, { text: "rz", x: 10, y: -32 * 8 });
                _obj = this.create_R2D_TextInput01(panel, { text: "0", x: 34, y: -32 * 8, returnarray: true });
                this.selectobject_text_rz = _obj[1];

                this.create_R2D_Text01(panel, { text: "sx", x: 10, y: -32 * 9 });
                _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 9, returnarray: true });
                this.selectobject_text_sx = _obj[1];
                this.create_R2D_Text01(panel, { text: "sy", x: 10, y: -32 * 10 });
                _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 10, returnarray: true });
                this.selectobject_text_sy = _obj[1];
                this.create_R2D_Text01(panel, { text: "sz", x: 10, y: -32 * 11 });
                _obj = this.create_R2D_TextInput01(panel, { text: "1", x: 34, y: -32 * 11, returnarray: true });
                this.selectobject_text_sz = _obj[1];
            }
        }, {
            key: 'create2DHUD',
            value: function create2DHUD() {
                var self = this;
                var screencanvas_group2d = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "screencanvas_group2d",
                    marginAlignment: "h: left, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                this.create_R2D_Text01(screencanvas_group2d, { text: "Health:", balign: true, x: 10, y: -32 * 1, width: 64, height: 28 });
                this.create_R2D_Text01(screencanvas_group2d, { text: "Magic:", balign: true, x: 10, y: -32 * 2, width: 64, height: 28 });
                this.create_R2D_Text01(screencanvas_group2d, { text: "Stamina:", balign: true, x: 10, y: -32 * 3, width: 64, height: 28 });

                this.createprogressbar(screencanvas_group2d, { x: 90, y: -32, width: 128, height: 28, fcolor: "#64DD17FF" });
                this.createprogressbar(screencanvas_group2d, { x: 90, y: -64, width: 128, height: 28, fcolor: "#03A9F4FF" });
                this.createprogressbar(screencanvas_group2d, { x: 90, y: -96, width: 128, height: 28, fcolor: "#FF9800FF" });

                // RIGHT TOP
                var screencanvas_group2d_RT = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "screencanvas_group2d_RT",
                    marginAlignment: "h: right, v: top"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                new BABYLON.Rectangle2D({
                    parent: screencanvas_group2d_RT, id: "R2DStamina", x: -36, y: -42, width: 32, height: 32, fill: "#263238FF"
                });

                //=======================================
                // Chat Area
                //=======================================

                // LEFT BOTTOM
                var screencanvas_group2d_LB = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "screencanvas_group2d_LB",
                    marginAlignment: "h: left, v: bottom"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                new BABYLON.Rectangle2D({
                    parent: screencanvas_group2d_LB, id: "R2DStamina", x: 8, y: 8, width: 48, height: 32, fill: "#263238FF",
                    children: [new BABYLON.Text2D("Chat:", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })]
                });

                //=======================================
                // Game options
                //=======================================

                // RIGHT BOTTOM
                var screencanvas_group2d_RB = new BABYLON.Group2D({
                    parent: this.screencanvas,
                    id: "screencanvas_group2d_RB",
                    marginAlignment: "h: right, v: bottom"
                    //scale:0.6 //limited since backgroundRoundRadius effect render
                    //scale:1 //limited since backgroundRoundRadius effect render
                });

                this.AddButton(screencanvas_group2d_RB, { id: "R2DEditor", text: "Editor", x: -36 + 64 * 1 * -1, y: 4, width: 52, height: 32 }, function () {
                    console.log("Editor..");
                });

                this.AddButton(screencanvas_group2d_RB, { id: "R2DSettings", text: "Settings", x: -36 + 64 * 2 * -1, y: 4, width: 52, height: 32 }, function () {
                    console.log("Settings..");
                });

                this.AddButton(screencanvas_group2d_RB, { id: "R2DMap", text: "Map", x: -36 + 64 * 3 * -1, y: 4, width: 52, height: 32 }, function () {
                    console.log("map..");
                });

                this.AddButton(screencanvas_group2d_RB, { id: "R2DSkills", text: "Skills", x: -36 + 64 * 4 * -1, y: 4, width: 52, height: 32 }, function () {
                    console.log("R2DSkills clicked!");
                    if (self.skills_ui == null) {
                        self.createskillsHUD();
                    } else {
                        console.log(self.skills_ui);
                        if (self.skills_ui.isVisible) {
                            //console.log(false);
                            self.skills_ui.levelVisible = false;
                        } else {
                            //console.log(true);
                            self.skills_ui.levelVisible = true;
                        }
                    }
                });

                this.AddButton(screencanvas_group2d_RB, { id: "R2DItems", text: "Items", x: -36 + 64 * 5 * -1, y: 4, width: 52, height: 32 }, function () {
                    if (self.inventory_ui == null) {
                        self.createinventoryHUD();
                    } else {
                        console.log(self.inventory_ui);
                        if (self.inventory_ui.isVisible) {
                            //console.log(false);
                            self.inventory_ui.levelVisible = false;
                        } else {
                            //console.log(true);
                            self.inventory_ui.levelVisible = true;
                        }
                    }
                });

                this.AddButton(screencanvas_group2d_RB, { id: "R2DHome", text: "Home", x: -36 + 64 * 6 * -1, y: 4, width: 52, height: 32 }, function () {
                    console.log("home..");
                });

                //this.setupeditor();
            }
        }]);

        return Babylonjs_game_hud;
    }(_babylonjs_game_module.Babylonjs_game_module);
});