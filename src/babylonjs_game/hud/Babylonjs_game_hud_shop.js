/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_hud_shop extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    createshopHUD(){
        console.log("createinventoryHUD();");
        var self = this;
        var shop_group2d = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"shop_group2d",
            marginAlignment: "h: left, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });
        var width = 192;

        var panel = this.create_R2D_Drag01(shop_group2d,{text:'Drag Shop',x:10,y:-142});

        this.display_shop[0] = this.create_R2D_Drag02(panel,{text:'Item 00',x:10,y:-32*2,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 0;
            self.selectShop();
        }});
        this.display_shop[1] = this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*3,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 1;
            self.selectShop();
        }});
        this.display_shop[2] = this.create_R2D_Drag02(panel,{text:'Item 02',x:10,y:-32*4,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 2;
            self.selectShop();
        }});
        this.display_shop[3] = this.create_R2D_Drag02(panel,{text:'Item 03',x:10,y:-32*5,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 3;
            self.selectShop();
        }});
        this.display_shop[4] = this.create_R2D_Drag02(panel,{text:'Item 04',x:10,y:-32*6,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 4;
            self.selectShop();
        }});
        this.display_shop[5] = this.create_R2D_Drag02(panel,{text:'Item 05',x:10,y:-32*7,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 5;
            self.selectShop();
        }});
        this.display_shop[6] = this.create_R2D_Drag02(panel,{text:'Item 06',x:10,y:-32*8,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 6;
            self.selectShop();
        }});
        this.display_shop[7] = this.create_R2D_Drag02(panel,{text:'Item 07',x:10,y:-32*9,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 7;
            self.selectShop();
        }});
        this.display_shop[8] = this.create_R2D_Drag02(panel,{text:'Item 08',x:10,y:-32*10,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 8;
            self.selectShop();
        }});
        this.display_shop[9] = this.create_R2D_Drag02(panel,{text:'Item 09',x:10,y:-32*11,width: width,bdrag:false,click:(event)=>{
            //console.log("click item!");
            self.select_index_shop = 9;
            self.selectShop();
        }});
        this.shop_ui = shop_group2d;
    }

    selectShop(){
        var self = this;
        //self.select_index_inventory = 0;
        console.log(self.select_index_shop);
        var _index_ = self.select_index_shop + this.scroll_shop_y;
        var items = this.npc.shop;

        if(items[_index_] !=null){
            console.log("check options");
            console.log(items[_index_].name);
        }
        _index_ = null;
    }

    updateshop(){
        var self = this;
        //this.display_inventory
        //this.inventory;
        //console.log(this.display_inventory[0].children[0].children[0].text);
        //this.display_inventory[0].children[0].children[0].text = "test";
        var index = this.scroll_shop_y;
        var items = this.npc.shop;
        if(items != null){
            //console.log(items);
            for(var i = 0; i < this.display_shop.length;i++){
                //console.log((i + index));
                //console.log(items[i + index]);
                if(items[i + index] != null){
                    this.display_shop[i].children[0].children[0].text = items[i + index].name;
                }else{
                    this.display_shop[i].children[0].children[0].text = "Empty";
                }
            }
        }
        index = null;
    }

    checkshop(){
        if(this.shop_ui == null){
            this.createshopHUD();
            this.updateshop();
        }else{
            if(this.shop_ui.isVisible){
                this.shop_ui.levelVisible = false;
            }else{
                this.updateshop();
                this.shop_ui.levelVisible = true;
            }
        }
    }
}
