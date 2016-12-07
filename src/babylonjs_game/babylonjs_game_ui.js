/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './babylonjs_game_module';

export class Babylonjs_game_ui extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    create_spaceworld_status(_scene, _model, _status){
		var self = this;

		var healthBarMaterial = new BABYLON.StandardMaterial("hb1mat", _scene);
		healthBarMaterial.diffuseColor = BABYLON.Color3.Green();
		healthBarMaterial.backFaceCulling = false;
		healthBarMaterial.emissiveColor = new BABYLON.Color3(0, 0.5, 0); //brighten light without light object

		var healthBarContainerMaterial = new BABYLON.StandardMaterial("hb2mat", _scene);
		healthBarContainerMaterial.diffuseColor = BABYLON.Color3.Blue();
		healthBarContainerMaterial.backFaceCulling = false;
		healthBarContainerMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.5); //brighten light without light object

		var dynamicTexture = new BABYLON.DynamicTexture("dt1", 512, _scene, true);
		dynamicTexture.hasAlpha = true;

		var healthBarTextMaterial = new BABYLON.StandardMaterial("hb3mat", _scene);
		healthBarTextMaterial.diffuseTexture = dynamicTexture;
		healthBarTextMaterial.backFaceCulling = false;
		healthBarTextMaterial.diffuseColor = BABYLON.Color3.Green();
		healthBarTextMaterial.emissiveColor = new BABYLON.Color3(0, 0.5, 0); //brighten light without light object

		var healthBarContainer = BABYLON.MeshBuilder.CreatePlane("hb2", { width: 2, height: .5, subdivisions: 4 }, _scene);
		var healthBar = BABYLON.MeshBuilder.CreatePlane("hb1", {width:2, height:.5, subdivisions:4}, _scene);

		var healthBarText = BABYLON.MeshBuilder.CreatePlane("hb3", { width: 2, height: 2, subdivisions: 4 }, _scene);
		healthBarText.material = healthBarMaterial;

		healthBarContainer.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

		healthBar.renderingGroupId = 1;
		healthBarText.renderingGroupId = 1;
		healthBarContainer.renderingGroupId = 1;

		healthBar.position = new BABYLON.Vector3(0, 0, -.01);			// Move in front of container slightly.  Without this there is flickering.
		healthBarContainer.position = new BABYLON.Vector3(0, 3, 0);     // Position above player.
		healthBarText.position = new BABYLON.Vector3(1.5, -.4, 0);

		healthBar.parent = healthBarContainer;
		healthBarContainer.parent = _model;
		healthBarText.parent = healthBarContainer;

		healthBar.material = healthBarMaterial;
		healthBarContainer.material = healthBarContainerMaterial;
		healthBarText.material = healthBarTextMaterial;

		//console.log(healthBar.material);
		//console.log(healthBarContainer);
		//console.log(healthBarText);

		var alive = true;
		var alpha = 3;
		var healthPercentage = 100;

		var status = _status;

		self.engine.runRenderLoop(function() {

			if (alive) {
				healthPercentage = (status.health /status.maxhealth) * 100;
				//console.log(healthPercentage);
				healthBar.scaling.x = healthPercentage / 100;
				healthBar.position.x =  (1 - (healthPercentage / 100)) * -1;

				if (healthBar.scaling.x < 0) {
					//alive = false;
					//healthPercentage = 100;
					alpha = 3;
					healthBarTextMaterial.diffuseColor = BABYLON.Color3.Green();
					healthBarMaterial.diffuseColor = BABYLON.Color3.Green();
				}
				else if (healthBar.scaling.x < .5) {
					healthBarMaterial.diffuseColor = BABYLON.Color3.Yellow();
					healthBarTextMaterial.diffuseColor = BABYLON.Color3.Yellow();
				}
				else if (healthBar.scaling.x < .3) {
					healthBarMaterial.diffuseColor = BABYLON.Color3.Red();
					healthBarTextMaterial.diffuseColor = BABYLON.Color3.Red();
				}

				//
				// Display Health Percentage.
				// - Only update display if whole number.
				//
				if (Math.round(healthPercentage) == healthPercentage) {
					var textureContext = dynamicTexture.getContext();
					var size = dynamicTexture.getSize();
					var text = healthPercentage + "%";

					textureContext.clearRect(0, 0, size.width, size.height);

					textureContext.font = "bold 120px Calibri";
					var textSize = textureContext.measureText(text);
					textureContext.fillStyle = "white";
					textureContext.fillText(text,(size.width - textSize.width) / 2,(size.height - 120) / 2);

					dynamicTexture.update();
				}
				//healthPercentage -= .5;
				alpha += 0.01;
			}
		});
	}

    createspacecavnas2D(){
        //screenCanvas
		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
			enableInteraction: true//,
		});
        //console.log(this.screencanvas);
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

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DHealth", x: 10, y: -32, width: 64, height: 28, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Health:", {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DMagic", x: 10, y: -64, width: 64, height: 28, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Magic:", {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        new BABYLON.Rectangle2D({
            parent: screencanvas_group2d, id: "R2DStamina", x: 10, y: -96, width: 64, height: 28, fill: "#263238FF",
            children:
            [
                new BABYLON.Text2D("Stamina:", {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

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


    create_R2D_Drag01(_parent,args){//RIGHT TOP DRAG
        var self = this;
        if(args == null){args = {};};

        var _x = (typeof args['x'] === 'number') ? args['x'] : 0; //rect position
        var _y = (typeof args['y'] === 'number') ? args['y'] : 0;
        var _width = (typeof args['width'] === 'number') ? args['width'] : 128; //rect size
        var _height = (typeof args['height'] === 'number') ? args['height'] : 32;

        var _text = (typeof args['text'] === 'string') ? args['text'] : 'Drag';

        var panel = new BABYLON.Rectangle2D({
            parent: _parent, id: "R2Dpanel", x: _x, y: _y, width: _width, height: _height, fill: "#263238FF",
        });

        var paneldrag = new BABYLON.Rectangle2D({
            parent: panel, id: "R2Dpaneldrag", x: 0, y: 0, width: _width - 4, height: _height - 4, fill: "#455A64FF",
            children:
            [
                new BABYLON.Text2D(_text, {x:5,y:0, fontName: "10pt Arial", marginAlignment: "h: center, v: center" })
            ]
        });

        panel.bdrag = false;
        panel.dragpostion = new BABYLON.Vector2(0,0);

        paneldrag.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            //console.log("PointerDown!");
            //console.log(d);
            //console.log(buttonRect);
            panel.bdrag = true;
            panel.dragpostion = d.primitivePointerPos;
        }, BABYLON.PrimitivePointerInfo.PointerDown);

        paneldrag.pointerEventObservable.add(function (d, s) {
            //console.log("PointerUp!");
            panel.bdrag = false;
        }, BABYLON.PrimitivePointerInfo.PointerUp);
        //console.log(this.engine);
        //this.screencanvas.size.height
        //this.screencanvas.viewportSize.height
        paneldrag.pointerEventObservable.add(function (d, s) {
            //console.log(d.canvasPointerPos);
            //console.log(d.primitivePointerPos);
            if(panel.bdrag){
                panel.x = d.canvasPointerPos.x - panel.dragpostion.x;
                panel.y = -((self.screencanvas.size.height - (d.canvasPointerPos.y + panel.dragpostion.y))+32);
            }
        }, BABYLON.PrimitivePointerInfo.PointerMove);

        paneldrag.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger,panel, "bdrag", false));

        return panel;
    }

    create_R2D_Text01(_parent,args){
        if(args == null){args = {};};
        var panel;
        //console.log(typeof args['color']);
        var _color = (typeof args['color'] === 'string') ? args['color'] : '#263238FF';
        var _width = (typeof args['width'] === 'number') ? args['width'] : 128;
        var _height = (typeof args['height'] === 'number') ? args['height'] : 32;
        var _x = (typeof args['x'] === 'number') ? args['x'] : 0; //rect position
        var _y = (typeof args['y'] === 'number') ? args['y'] : 0;
        var _tx = (typeof args['tx'] === 'number') ? args['tx'] : 2; //text position
        var _ty = (typeof args['ty'] === 'number') ? args['ty'] : 0;
        var _text = (typeof args['text'] === 'string') ? args['text'] : 'none';
        //console.log(typeof args['balign']);
        var _balign = (typeof args['balign'] === 'boolean') ? args['align'] : false;

        var _config = {};
        _config['fontName'] = "10pt Arial";
        if(_balign){
            _config['marginAlignment'] = "h: center, v: center";
        }else{
            _config['x'] = _tx;
            _config['y'] = _ty;
        }
        var text2d = new BABYLON.Text2D(_text, _config);

        panel = new BABYLON.Rectangle2D({
            parent: _parent, id: "R2D" + _text, x: _x, y: _y, width: _width, height: _height, fill: _color,
            children:
            [
                text2d
            ]
        });
        return panel;
    }

    create_R2D_TextInput01(_parent,args){
        var self = this;
        if(args == null){args = {};};
        var panel;
        //console.log(typeof args['color']);
        var _color = (typeof args['color'] === 'string') ? args['color'] : '#263238FF';
        var _width = (typeof args['width'] === 'number') ? args['width'] : 128;
        var _height = (typeof args['height'] === 'number') ? args['height'] : 32;
        var _x = (typeof args['x'] === 'number') ? args['x'] : 0; //rect position
        var _y = (typeof args['y'] === 'number') ? args['y'] : 0;
        var _tx = (typeof args['tx'] === 'number') ? args['tx'] : 2; //text position
        var _ty = (typeof args['ty'] === 'number') ? args['ty'] : 0;
        var _text = (typeof args['text'] === 'string') ? args['text'] : 'none';
        //console.log(typeof args['balign']);
        var _balign = (typeof args['balign'] === 'boolean') ? args['align'] : false;
        var _returnarray = (typeof args['returnarray'] === 'boolean') ? args['returnarray'] : false;

        var _config = {};
        _config['fontName'] = "10pt Arial";
        if(_balign){
            _config['marginAlignment'] = "h: center, v: center";
        }else{
            _config['x'] = _tx;
            _config['y'] = _ty;
        }
        var text2d = new BABYLON.Text2D(_text, _config);

        panel = new BABYLON.Rectangle2D({
            parent: _parent, id: "R2D" + _text, x: _x, y: _y, width: _width, height: _height, fill: _color,
            children:
            [
                text2d
            ]
        });
        //console.log(text2d);
        function TextInputKey(e){
            console.log(e.keyCode);
            if (e.keyCode == 8) {
                //console.log('BACKSPACE was pressed');
                var llen = text2d.text.length;
                //text2d.text = text2d.text.substring(1, llen);//first letter
                text2d.text = text2d.text.substring(0,llen-1);//last letter
                // Call event.preventDefault() to stop the character before the cursor
                // from being deleted. Remove this line if you don't want to do that.
                e.preventDefault();
            }
            if (e.keyCode == 46) {
                //console.log('DELETE was pressed');
                // Call event.preventDefault() to stop the character after the cursor
                // from being deleted. Remove this line if you don't want to do that.
                e.preventDefault();
            }

            if (e.keyCode == 13) {
                //console.log('DELETE was pressed');
                // Call event.preventDefault() to stop the character after the cursor
                // from being deleted. Remove this line if you don't want to do that.
                //console.log('remove listener');
                document.removeEventListener("keydown",TextInputKey );
                e.preventDefault();
            }

            var txt = String.fromCharCode(e.which);
            console.log(txt + ' : ' + e.which);

            if(!txt.match(/[A-Za-z0-9+#.]/))
            {
                return false;
            }else{
                //console.log("TYPEING?");
                text2d.text = text2d.text + txt;
            }
            //console.log("test?");
        }

        panel.pointerEventObservable.add(function (d, s) {
            //console.log("PointerDown!");
            //window.addEventListener("keypress",TextInputKey );
        }, BABYLON.PrimitivePointerInfo.PointerDown);

        panel.pointerEventObservable.add(function (d, s) {
            //console.log("PointerUp!");
            document.addEventListener("keydown",TextInputKey );
        }, BABYLON.PrimitivePointerInfo.PointerUp);

        panel.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(evt){
            //console.log("out!");
            document.removeEventListener("keydown",TextInputKey );
        }));

        if(_returnarray){
            return [panel,text2d];
        }else{
            return panel;
        }
    }

    AddButton(_scenecanvas, _id, _name, _x, _y, _callback, options){
		var buttonRect = new BABYLON.Rectangle2D(
	    { parent: _scenecanvas, id: _id, x: _x, y: _y, width: 100, height: 20, fill: "#40C040FF",
	        children:
	        [
	            new BABYLON.Text2D(_name, { fontName: "12pt Arial", marginAlignment: "h: center, v: center" })
	        ]});
			buttonRect.pointerEventObservable.add(function (d, s) {
				//console.log("click2");
				_callback();
			}, BABYLON.PrimitivePointerInfo.PointerUp);
		return buttonRect;
	}
}
