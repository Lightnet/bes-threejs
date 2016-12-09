/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './babylonjs_game_module';

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

    create2D_BattleHUD(){
		var self = this;
		//button
        this.AddButton(this.screencanvas,{id:'button_escape',text:'Escape',x:10,y:(22*0+10)}, ()=>{self.actionescape();});
		this.AddButton(this.screencanvas,{id:'button_item',text:'Items',x:10,y:(22*1+10)}, ()=>{self.openitem();});
		this.AddButton(this.screencanvas,{id:'button_skills',text:'Skills',x:10,y:(22*2+10)}, ()=>{self.openskills();});
		this.AddButton(this.screencanvas,{id:'button_move',text:'Move',x:10,y:(22*3+10)}, ()=>{self.openitem();});
		this.AddButton(this.screencanvas,{id:'button_attack',text:'Attack',x:10,y:(22*4+10)}, ()=>{self.actionattack();});
		this.AddButton(this.screencanvas,{id:'button_attack',text:'Enemy Attack',x:150,y:(22*4+10)}, ()=>{self.actionenemyattack();});
		this.AddButton(this.screencanvas,{id:'button_battle',text:'Battle',x:10,y:(22*5+10)}, ()=>{self.actionbattle();});
	}

    createinventoryHUD(){
        console.log("createinventoryHUD();");

        var self = this;
        var editor_group2d = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d",
            marginAlignment: "h: left, v: top"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        var panel = this.create_R2D_Drag01(editor_group2d,{text:'Drag Inventory',x:10,y:-142});

        this.create_R2D_Text01(panel,{text:"Items",balign:true,x:10,y:-32*1, width: 70});

        this.create_R2D_Drag02(panel,{text:'Drag Inventory',x:10,y:-32*2});

    }


    setupeditor(){
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

        //background bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 90, y: -32, width: 128, height: 28, fill: "#263238FF"
        });
        //background bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 90, y: -64, width: 128, height: 28, fill: "#263238FF"
        });
        //background bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 90, y: -96, width: 128, height: 28, fill: "#263238FF"
        });
        //foreground bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 92, y: -32, width: 124, height: 20, fill: "#64DD17FF"
        });
        //foreground bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 92, y: -64, width: 124, height: 20, fill: "#03A9F4FF"
        });
        //foreground bar
        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 92, y: -96, width: 124, height: 20, fill: "#FF9800FF"
        });

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

        // RIGHT BOTTOM
        var screencanvas_group2d_RB = new BABYLON.Group2D({
            parent:this.screencanvas,
            id:"screencanvas_group2d_RB",
            marginAlignment: "h: right, v: bottom"
            //scale:0.6 //limited since backgroundRoundRadius effect render
            //scale:1 //limited since backgroundRoundRadius effect render
        });

        var R2DEditor = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DEditor", x: -36+(64*1)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Editor", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DEditor.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DEditor clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DSettings = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DSettings", x: -36+(64*2)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Settings", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DSettings.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DSettings clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DMap = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DMap", x: -36+(64*3)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Map", {fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DMap.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DMap clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DSkills = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DSkills", x: -36+(64*4)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Skills", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DSkills.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DSkills clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DItems = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DItems", x: -36+(64*5)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Items", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DItems.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DItems clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        var R2DHome = new BABYLON.Rectangle2D({
            parent: screencanvas_group2d_RB, id: "R2DHome", x: -36+(64*6)*-1, y: 4, width: 52, height: 32, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Home", { fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        R2DHome.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("R2DHome clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        //this.setupeditor();
	}

}
