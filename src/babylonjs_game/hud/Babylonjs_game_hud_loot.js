/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_hud_loot extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    createlootUI(){
        console.log("createlootUI();");
        var self = this;
        var loot_group2d = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"loot_group2d",
            marginAlignment: "h: left, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        var panel = this.create_R2D_Drag01(loot_group2d,{text:'Drag Loot',x:10,y:-142});
        this.create_R2D_Text01(panel,{text:"Items",balign:true,x:10,y:-32*1, width: 70});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*2});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*3});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*4});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*5});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*6});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*7});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*8});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*9});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*10});
        this.create_R2D_Drag02(panel,{text:'Item 01',x:10,y:-32*11});
    }

}
