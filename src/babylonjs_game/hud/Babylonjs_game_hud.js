/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_hud extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    createspacecavnas2D(){
        //screenCanvas
		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
			enableInteraction: true//,
		});
        //console.log(this.screencanvas);
	}

    setupeditor(){
        //console.log("setupeditor");
        var self = this;
        var editor_group2d = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d",
            marginAlignment: "h: left, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        var panel = this.create_R2D_Drag01(editor_group2d,{text:'Drag Panel',x:10,y:-142});

        //tab
        this.create_R2D_Text01(panel,{text:"Object",balign:true,x:10,y:-32*1, width: 70});
        this.create_R2D_Text01(panel,{text:"Transform",balign:true,x:84,y:-32*1, width: 70});
        this.create_R2D_Text01(panel,{text:"Materials",balign:true,x:158,y:-32*1, width: 70});
        this.create_R2D_Text01(panel,{text:"Scripts",balign:true,x:234,y:-32*1, width: 70});
        this.create_R2D_Text01(panel,{text:"Animations",balign:true,x:308,y:-32*1, width: 70});

        //props
        var _obj = null;
        this.create_R2D_Text01(panel,{text:"ID:",x:10,y:-32*2});
        _obj = this.create_R2D_TextInput01(panel,{text:"None",x:34,y:-32*2,returnarray:true});
        this.selectobject_text_id = _obj[1];

        this.create_R2D_Text01(panel,{text:"px",x:10,y:-32*3});
        _obj = this.create_R2D_TextInput01(panel,{text:"0",x:34,y:-32*3,returnarray:true});
        this.selectobject_text_px = _obj[1];
        this.create_R2D_Text01(panel,{text:"py",x:10,y:-32*4});
        _obj = this.create_R2D_TextInput01(panel,{text:"0",x:34,y:-32*4,returnarray:true});
        this.selectobject_text_py = _obj[1];
        this.create_R2D_Text01(panel,{text:"pz",x:10,y:-32*5});
        _obj = this.create_R2D_TextInput01(panel,{text:"0",x:34,y:-32*5,returnarray:true});
        this.selectobject_text_pz = _obj[1];

        this.create_R2D_Text01(panel,{text:"rx",x:10,y:-32*6});
        _obj = this.create_R2D_TextInput01(panel,{text:"0",x:34,y:-32*6,returnarray:true});
        this.selectobject_text_rx = _obj[1];
        this.create_R2D_Text01(panel,{text:"ry",x:10,y:-32*7});
        _obj = this.create_R2D_TextInput01(panel,{text:"0",x:34,y:-32*7,returnarray:true});
        this.selectobject_text_ry = _obj[1];
        this.create_R2D_Text01(panel,{text:"rz",x:10,y:-32*8});
        _obj = this.create_R2D_TextInput01(panel,{text:"0",x:34,y:-32*8,returnarray:true});
        this.selectobject_text_rz = _obj[1];

        this.create_R2D_Text01(panel,{text:"sx",x:10,y:-32*9});
        _obj = this.create_R2D_TextInput01(panel,{text:"1",x:34,y:-32*9,returnarray:true});
        this.selectobject_text_sx = _obj[1];
        this.create_R2D_Text01(panel,{text:"sy",x:10,y:-32*10});
        _obj = this.create_R2D_TextInput01(panel,{text:"1",x:34,y:-32*10,returnarray:true});
        this.selectobject_text_sy = _obj[1];
        this.create_R2D_Text01(panel,{text:"sz",x:10,y:-32*11});
        _obj = this.create_R2D_TextInput01(panel,{text:"1",x:34,y:-32*11,returnarray:true});
        this.selectobject_text_sz = _obj[1];
    }

    create2DHUD(){
        var self = this;
        var screencanvas_group2d = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d",
            marginAlignment: "h: left, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        this.create_R2D_Text01(screencanvas_group2d,{text:"Health:",balign:true,x:10,y:-32*1, width: 64, height: 28});
        this.create_R2D_Text01(screencanvas_group2d,{text:"Magic:",balign:true,x:10,y:-32*2, width: 64, height: 28});
        this.create_R2D_Text01(screencanvas_group2d,{text:"Stamina:",balign:true,x:10,y:-32*3, width: 64, height: 28});

        this.createprogressbar(screencanvas_group2d,{x:90,y:-32,width:128,height:28,fcolor:"#64DD17FF"});
        this.createprogressbar(screencanvas_group2d,{x:90,y:-64,width:128,height:28,fcolor:"#03A9F4FF"});
        this.createprogressbar(screencanvas_group2d,{x:90,y:-96,width:128,height:28,fcolor:"#FF9800FF"});


        // RIGHT TOP
        var screencanvas_group2d_RT = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d_RT",
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
            parent:this.screencanvas,
            id:"screencanvas_group2d_LB",
            marginAlignment: "h: left, v: bottom"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_LB, id: "R2DStamina", x: 8, y: 8, width: 48, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Chat:", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });


        //=======================================
        // Game options
        //=======================================

        // RIGHT BOTTOM
        var screencanvas_group2d_RB = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d_RB",
            marginAlignment: "h: right, v: bottom"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DEditor",text:"Editor",x:-36+(64*1)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("Editor..");
        });


        this.AddButton(screencanvas_group2d_RB, {id:"R2DSettings",text:"Settings",x:-36+(64*2)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("Settings..");
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DMap",text:"Map",x:-36+(64*3)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("map..");
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DSkills",text:"Skills",x:-36+(64*4)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("R2DSkills clicked!");
            if(self.skills_ui == null){
                self.createskillsHUD();
            }else{
                console.log(self.skills_ui);
                if(self.skills_ui.isVisible){
                    //console.log(false);
                    self.skills_ui.levelVisible = false;
                }else{
                    //console.log(true);
                    self.skills_ui.levelVisible = true;
                }
            }
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DItems",text:"Items",x:-36+(64*5)*-1,y:4,width: 52, height: 32}, ()=>{
            if(self.inventory_ui == null){
                self.createinventoryHUD();
                self.updateinventorydisplay();
            }else{
                console.log(self.inventory_ui);
                if(self.inventory_ui.isVisible){
                    //console.log(false);
                    self.inventory_ui.levelVisible = false;
                }else{
                    //console.log(true);
                    self.inventory_ui.levelVisible = true;
                    self.updateinventorydisplay();
                }
            }
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DHome",text:"Home",x:-36+(64*6)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("home..");
        });

        //this.setupeditor();
	}

}
