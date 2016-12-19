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

    hidemenus(){
        var self = this;
        if(self.inventory_ui !=null){
            if(self.inventory_ui.isVisible){
                self.inventory_ui.levelVisible = false;
            }
        }
        if(self.skills_ui !=null){
            if(self.skills_ui.isVisible){
                self.skills_ui.levelVisible = false;
            }
        }

        if(self.map_ui !=null){
            if(self.map_ui.isVisible){
                self.map_ui.levelVisible = false;
            }
        }

        if(self.home_ui !=null){
            if(self.home_ui.isVisible){
                self.home_ui.levelVisible = false;
            }
        }

        if(self.settings_ui !=null){
            if(self.settings_ui.isVisible){
                self.settings_ui.levelVisible = false;
            }
        }

        if(self.editor_ui !=null){
            if(self.editor_ui.isVisible){
                self.editor_ui.levelVisible = false;
            }
        }
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
            if(self.editor_ui == null){
                self.setupeditor();
            }else{
                //console.log(self.editor_ui);
                if(self.editor_ui.isVisible){
                    //console.log(false);
                    self.editor_ui.levelVisible = false;
                }else{
                    self.hidemenus();
                    //console.log(true);
                    self.editor_ui.levelVisible = true;
                    self.updateinventorydisplay();
                }
            }
        });


        this.AddButton(screencanvas_group2d_RB, {id:"R2DSettings",text:"Settings",x:-36+(64*2)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("Settings..");
            if(self.settings_ui == null){
                //self.createinventoryHUD();
            }else{
                //console.log(self.inventory_ui);
                if(self.settings_ui.isVisible){
                    //console.log(false);
                    self.settings_ui.levelVisible = false;
                }else{
                    self.hidemenus();
                    //console.log(true);
                    self.settings_ui.levelVisible = true;
                    //self.updateinventorydisplay();
                }
            }
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DMap",text:"Map",x:-36+(64*3)*-1,y:4,width: 52, height: 32}, ()=>{
            //console.log("map..");
            if(self.map_ui == null){
                //self.createinventoryHUD();
            }else{
                //console.log(self.inventory_ui);
                if(self.map_ui.isVisible){
                    //console.log(false);
                    self.map_ui.levelVisible = false;
                }else{
                    self.hidemenus();
                    //console.log(true);
                    self.map_ui.levelVisible = true;
                    //self.updateinventorydisplay();
                }
            }
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DSkills",text:"Skills",x:-36+(64*4)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("R2DSkills clicked!");

            if(self.skills_ui == null){
                self.createskillsHUD();
            }else{
                //console.log(self.skills_ui);
                if(self.skills_ui.isVisible){
                    //console.log(false);
                    self.skills_ui.levelVisible = false;
                }else{
                    self.hidemenus();
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
                //console.log(self.inventory_ui);
                if(self.inventory_ui.isVisible){
                    //console.log(false);
                    self.inventory_ui.levelVisible = false;
                }else{
                    self.hidemenus();
                    //console.log(true);
                    self.inventory_ui.levelVisible = true;
                    self.updateinventorydisplay();
                }
            }
        });

        this.AddButton(screencanvas_group2d_RB, {id:"R2DHome",text:"Home",x:-36+(64*6)*-1,y:4,width: 52, height: 32}, ()=>{
            console.log("home..");
            if(self.home_ui == null){
                self.createinventoryHUD();
                self.updateinventorydisplay();
            }else{
                if(self.home_ui.isVisible){
                    self.home_ui.levelVisible = false;
                }else{
                    self.hidemenus();
                    self.home_ui.levelVisible = true;
                    //self.updateinventorydisplay();
                }
            }
        });

        //this.setupeditor();
	}

}
