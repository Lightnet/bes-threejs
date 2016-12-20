define(["exports", "../system/Babylonjs_game_module"], function (exports, _Babylonjs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_hud_inventory = undefined;

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

    var Babylonjs_game_hud_inventory = exports.Babylonjs_game_hud_inventory = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_hud_inventory, _Babylonjs_game_modul);

        function Babylonjs_game_hud_inventory(args) {
            _classCallCheck(this, Babylonjs_game_hud_inventory);

            return _possibleConstructorReturn(this, (Babylonjs_game_hud_inventory.__proto__ || Object.getPrototypeOf(Babylonjs_game_hud_inventory)).call(this, args));
        }

        _createClass(Babylonjs_game_hud_inventory, [{
            key: "createinventoryHUD",
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
                this.create_R2D_Drag02(panel, { text: 'Up', x: 64, y: -32 * 1, bdrag: false, width: 50, click: function click(event) {
                        console.log("Up");
                        //self.select_index_inventory = 0;
                        //self.selectInventory();
                        self.moveupinventory();
                        self.updateinventorydisplay();
                    } });

                this.create_R2D_Drag02(panel, { text: 'Down', x: 128, y: -32 * 1, bdrag: false, width: 50, click: function click(event) {
                        console.log("Down");
                        //self.select_index_inventory = 0;
                        //self.selectInventory();
                        self.movedowninventory();
                        self.updateinventorydisplay();
                    } });

                var width = 192;

                this.display_inventory[0] = this.create_R2D_Drag02(panel, { text: 'Item 00', x: 10, y: -32 * 2, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 0;
                        self.selectInventory();
                    } });
                this.display_inventory[1] = this.create_R2D_Drag02(panel, { text: 'Item 01', x: 10, y: -32 * 3, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 1;
                        self.selectInventory();
                    } });
                this.display_inventory[2] = this.create_R2D_Drag02(panel, { text: 'Item 02', x: 10, y: -32 * 4, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 2;
                        self.selectInventory();
                    } });
                this.display_inventory[3] = this.create_R2D_Drag02(panel, { text: 'Item 03', x: 10, y: -32 * 5, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 3;
                        self.selectInventory();
                    } });
                this.display_inventory[4] = this.create_R2D_Drag02(panel, { text: 'Item 04', x: 10, y: -32 * 6, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 4;
                        self.selectInventory();
                    } });
                this.display_inventory[5] = this.create_R2D_Drag02(panel, { text: 'Item 05', x: 10, y: -32 * 7, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 5;
                        self.selectInventory();
                    } });
                this.display_inventory[6] = this.create_R2D_Drag02(panel, { text: 'Item 06', x: 10, y: -32 * 8, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 6;
                        self.selectInventory();
                    } });
                this.display_inventory[7] = this.create_R2D_Drag02(panel, { text: 'Item 07', x: 10, y: -32 * 9, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 7;
                        self.selectInventory();
                    } });
                this.display_inventory[8] = this.create_R2D_Drag02(panel, { text: 'Item 08', x: 10, y: -32 * 10, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 8;
                        self.selectInventory();
                    } });
                this.display_inventory[9] = this.create_R2D_Drag02(panel, { text: 'Item 09', x: 10, y: -32 * 11, width: width, bdrag: false, click: function click(event) {
                        //console.log("click item!");
                        self.select_index_inventory = 9;
                        self.selectInventory();
                    } });

                //this.button_inventory_10 = this.create_R2D_Drag02(panel,{text:'Select',x:10,y:-32*12,bdrag:false,click:(event)=>{
                //console.log("click item!");
                //console.log(self.select_index_inventory);
                //self.selectInventory();
                //}});
                this.inventory_ui = inventory_group2d;

                this.create_R2D_Drag02(panel, { text: 'Used', x: 256, y: -32 * 1, bdrag: false, width: 50, click: function click(event) {
                        console.log("Used");
                        self.selectitem_used();
                    } });

                this.create_R2D_Drag02(panel, { text: 'Drop', x: 256, y: -32 * 2, bdrag: false, width: 50, click: function click(event) {
                        console.log("Drop");
                        self.selectitem_drop();
                    } });

                this.create_R2D_Drag02(panel, { text: 'Equip', x: 256, y: -32 * 3, bdrag: false, width: 50, click: function click(event) {
                        console.log("Equip");
                        self.selectitem_equip();
                    } });

                this.create_R2D_Drag02(panel, { text: 'Sort', x: 256, y: -32 * 4, bdrag: false, width: 50, click: function click(event) {
                        console.log("Sort");
                        self.selectitem_sort();
                    } });

                this.create_R2D_Drag02(panel, { text: 'Scrap', x: 256, y: -32 * 5, bdrag: false, width: 50, click: function click(event) {
                        console.log("Scrap");
                        self.selectitem_scrap();
                    } });
            }
        }, {
            key: "updateinventorydisplay",
            value: function updateinventorydisplay() {
                var self = this;
                //this.display_inventory
                //this.inventory;
                //console.log(this.display_inventory[0].children[0].children[0].text);
                //this.display_inventory[0].children[0].children[0].text = "test";
                var index = this.scroll_inventory_y;
                for (var i = 0; i < this.display_inventory.length; i++) {
                    if (this.inventory[i + index] != null) {
                        this.display_inventory[i].children[0].children[0].text = this.inventory[i + index].name;
                    } else {
                        this.display_inventory[i].children[0].children[0].text = "Empty";
                    }
                }
                index = null;
            }
        }, {
            key: "selectInventory",
            value: function selectInventory() {
                var self = this;
                //self.select_index_inventory = 0;
                console.log(self.select_index_inventory);
                var _index_ = self.select_index_inventory + this.scroll_inventory_y;
                if (this.inventory[_index_] != null) {
                    console.log("check options");
                    console.log(this.inventory[_index_].name);
                }
            }
        }, {
            key: "moveupinventory",
            value: function moveupinventory() {
                this.scroll_inventory_y -= 1;
                if (this.inventory.length < 10) {
                    this.scroll_inventory_y = 0;
                    console.log("scroll less item than 10");
                    return;
                }
                if (this.scroll_inventory_y < 0) {
                    this.scroll_inventory_y = 0;
                }
                console.log(this.scroll_inventory_y);
            }
        }, {
            key: "movedowninventory",
            value: function movedowninventory() {
                this.scroll_inventory_y += 1;
                if (this.inventory.length < 10) {
                    this.scroll_inventory_y = 0;
                    console.log("scroll less item than 10");
                    return;
                }
                if (this.scroll_inventory_y > this.inventory.length - 10) {
                    this.scroll_inventory_y = this.inventory.length - 10;
                }
                console.log(this.scroll_inventory_y);
            }
        }, {
            key: "selectitem_used",
            value: function selectitem_used() {
                console.log("selectitem_used");
            }
        }, {
            key: "selectitem_drop",
            value: function selectitem_drop() {
                console.log("selectitem_drop");
            }
        }, {
            key: "selectitem_equip",
            value: function selectitem_equip() {
                console.log("selectitem_equip");
            }
        }, {
            key: "selectitem_sort",
            value: function selectitem_sort() {
                console.log("selectitem_sort");
            }
        }, {
            key: "selectitem_scrap",
            value: function selectitem_scrap() {
                console.log("selectitem_scrap");
            }
        }]);

        return Babylonjs_game_hud_inventory;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});