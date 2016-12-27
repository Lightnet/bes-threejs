/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

import {RPGCube} from '../rpg/RPGCube';
import {RPGSphere} from '../rpg/RPGSphere';
import {RPGCylinder} from '../rpg/RPGCylinder';

export class Babylonjs_game_editor extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    parse_object(args){
        var _obj;
        if(args !=null){
            if(args['freecamera'] != null){
                _obj = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this.scene);
            }

            if(args['scene'] != null){
                _obj = new BABYLON.Scene(this.engine);
            }

            if(args['hemisphericlight'] != null){
                _obj = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
            }


			if(args['geometrytype'] !=null){
				if(args['geometrytype'] == 'cube'){
					_obj = this.parse_createcube(args);
	            }

				if(args['geometrytype'] == 'sphere'){
	                //_obj = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
                    _obj = this.parse_createsphere(args);
	            }

	            if(args['geometrytype'] == 'ground'){
	                _obj = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
	            }

				if(args['geometrytype'] == 'plane'){
	                _obj = BABYLON.Mesh.CreatePlane("plane", 10.0, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'disc'){
	                _obj = BABYLON.Mesh.CreateDisc("disc", 5, 30, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'cylinder'){
	                //_obj = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
                    _obj = this.parse_createcylinder(args);
	            }

	            if(args['geometrytype'] == 'torus'){
	                _obj = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['geometrytype'] == 'knot'){
	                _obj = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }
	            if(args['geometrytype'] == 'lines'){
	                //_obj = BABYLON.Mesh.CreateLines("lines", [
	                    //new BABYLON.Vector3(-10, 0, 0),
	                    //new BABYLON.Vector3(10, 0, 0),
	                    //new BABYLON.Vector3(0, 0, -10),
	                    //new BABYLON.Vector3(0, 0, 10)
	                //], scene);
	            }

	            if(args['dashedLines'] != null){
	                //_obj = BABYLON.Mesh.CreateDashedLines("dashedLines", [v1, v2, ... vn], dashSize, gapSize, dashNb, scene);
	            }

	            if(args['ribbon'] != null){
	                //_obj = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['tube'] != null){
	                //_obj = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene, false, BABYLON.Mesh.DEFAULTSIDE);
	            }

	            if(args['tiledhround'] != null){
	                //_obj = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -3, -3, 3, 3, subdivisions, precision, scene, false);
	            }

                if(args['position'] !=null){
                    _obj.position.x = args['position']['x'] || 0;
                    _obj.position.y = args['position']['y'] || 0;
                    _obj.position.z = args['position']['z'] || 0;
                }
                if(args['rotation'] != null){
                    _obj.rotation.x = args['rotation']['x'] || 0;
                    _obj.rotation.y = args['rotation']['y'] || 0;
                    _obj.rotation.z = args['rotation']['z'] || 0;
                }

                if(args['scaling'] !=null){
                    _obj.scaling.x = args['scaling']['x'] || 1;
                    _obj.scaling.y = args['scaling']['y'] || 1;
                    _obj.scaling.z = args['scaling']['z'] || 1;
                }
			}
        }else{

        }
        return _obj;
    }

	parse_createcube(args){
		//console.log("found");
		//console.log(args);
		var _obj = null;
		var params = {};
		//if(args['box'] != null){
			//var _obj = BABYLON.MeshBuilder.CreateBox("ground", {height:1,width:20,depth:20}, this.scene);
			//args = args['box'];
			params.height = args['parameters']['height'] || 1;
			params.width = args['parameters']['width'] || 1;
			params.depth = args['parameters']['depth'] || 1;
            //console.log(params);
			var _obj = BABYLON.MeshBuilder.CreateBox("box",params, this.scene);
            _obj.rpgobj = new RPGCube(args);
            //console.log(args['position']);
		//}
		return _obj;
	}

    parse_createsphere(args){
        console.log(args);
        var params = {};
        var _obj = null;
        //params.diameterTop = args['parameters']['diameter'] || 1;
        params.diameter = args['parameters']['diameter'] || 1;
        _obj =  BABYLON.MeshBuilder.CreateSphere('sphere', params, this.scene);
        _obj.rpgobj = new RPGSphere(args);
        return _obj;
    }

    parse_createcylinder(args){
        var params = {};
        var _obj = null;
        console.log("parse_createcylinder");
        //params.diameterTop = args['parameters']['diameterTop'] || 1;
        params.diameter = args['parameters']['diameter'] || 1;
        params.tessellation = Number(args['parameters']['tessellation'] || 4);
        //console.log(params);
        _obj =  BABYLON.MeshBuilder.CreateCylinder('Cylinder', params, this.scene);
        //_obj = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
        _obj.rpgobj = new RPGCylinder(args);
        return _obj;
    }


    //===========================================
    //
    //===========================================
    getGroundPosition() {
        var scene = this.scene;
        // Use a predicate to get position on the ground
        //var pickinfo = scene.pick(scene.pointerX, scene.pointerY);
        //return pickinfo.pickedPoint;
		return new BABYLON.Vector2(scene.pointerX, scene.pointerY);
    }

    clickMesh(lastMesh, currentMesh){
		// If we click again the already selected mesh then there is no reason to remove axis and add them again
		if(lastMesh == currentMesh)
			return;

		// Show axis for the current mesh
		for(var i = 0; i < currentMesh.getChildren().length; i++)
			currentMesh.getChildren()[i].isVisible = true;

		// Remove axis for the previous mesh
		if(lastMesh != null){
			if(lastMesh.getChildren().length > 0)
				for(var i = 0; i < lastMesh.getChildren().length; i++)
					lastMesh.getChildren()[i].isVisible = false;
		}
	}

    scenepick_editor(){
        var self = this;
        // Events
        var startingPoint;
        var currentMesh;
    	var lastMesh;
    	var pickedAxis = "";
		//When pointer down event is raised
	    this.scene.onPointerDown = function (evt, pickInfo) {
	        // if the click hits the ground object, we change the impact position
	        if (pickInfo.hit) {
                //console.log(pickInfo);
                self.selectobject = pickInfo.pickedMesh;
                self.updateselectobject();

                // Check if an axis is clicked
    			if(pickInfo.pickedMesh.name == "X" || pickInfo.pickedMesh.name == "Y" || pickInfo.pickedMesh.name == "Z")
    			{
    				pickedAxis = pickInfo.pickedMesh.name;
    				currentMesh = pickInfo.pickedMesh.parent;
    				startingPoint = self.getGroundPosition(evt);

    				if (startingPoint) { // we need to disconnect camera from canvas
    					setTimeout(function () {
    						self.camera.detachControl(self.canvas);
    					}, 0);
    				}
    			} else { // Show axis for the clicked mesh. I think the meshes with axis should have some flag that should be checked here
    				self.clickMesh(lastMesh, pickInfo.pickedMesh);
    				lastMesh = pickInfo.pickedMesh;
    			}
	            //impact.position.x = pickResult.pickedPoint.x;
	            //impact.position.y = pickResult.pickedPoint.y;
				//console.log("HIT"+pickResult.pickedPoint);
	        }
	    }

        var onPointerDown = function (evt) {
            if (evt.button !== 0) {
                return;
            }

            // check if we clicked a mesh
            var pickInfo = self.scene.pick(self.scene.pointerX, self.scene.pointerY);

            if (pickInfo.hit)
    		{
    			// Check if an axis is clicked
    			if(pickInfo.pickedMesh.name == "X" || pickInfo.pickedMesh.name == "Y" || pickInfo.pickedMesh.name == "Z")
    			{
    				pickedAxis = pickInfo.pickedMesh.name;
    				currentMesh = pickInfo.pickedMesh.parent;
    				startingPoint = getGroundPosition(evt);

    				if (startingPoint) { // we need to disconnect camera from canvas
    					setTimeout(function () {
    						self.camera.detachControl(self.canvas);
    					}, 0);
    				}
    			} else { // Show axis for the clicked mesh. I think the meshes with axis should have some flag that should be checked here
    				self.clickMesh(lastMesh, pickInfo.pickedMesh);
    				lastMesh = pickInfo.pickedMesh;
    			}
    		}
        }

        var onPointerUp = function () {
            if (startingPoint) {
                self.camera.attachControl(self.canvas, true);
                startingPoint = null;
                return;
            }
        }

        var onPointerMove = function (evt) {
            if (!startingPoint) {
                return;
            }

            var current = self.getGroundPosition(evt);
    		console.log(current);
            if (!current) {
                return;
            }

    		var compensationFactor = 50;
    		switch(pickedAxis){
    			case "X":
    				var diff = current.subtract(startingPoint);
    				currentMesh.position.x -= diff.x/compensationFactor;
    			break;
    			case "Y":
    				var diff = current.subtract(startingPoint);
    				currentMesh.position.y -= diff.y/compensationFactor;
    			break;
    			case "Z":
    				var diff = current.subtract(startingPoint);
    				currentMesh.position.z += diff.x/compensationFactor;
    			break;
    		}
            startingPoint = current;
        }


        self.canvas.addEventListener("pointerdown", onPointerDown, false);
        self.canvas.addEventListener("pointerup", onPointerUp, false);
        self.canvas.addEventListener("pointermove", onPointerMove, false);
	}


    showAxis(size, mesh) {
        //http://www.babylonjs-playground.com/#11AOBV#2
        //http://www.html5gamedevs.com/topic/16687-axis-dragging/
        var scene = this.scene;
	    var makeTextPlane = function(text, color, size, name) {
    	    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    	    dynamicTexture.hasAlpha = true;
    	    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
    	    var plane = BABYLON.Mesh.CreatePlane(name, size * 3, scene, true);
    	    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    	    plane.material.backFaceCulling = false;
    	    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    	    plane.material.diffuseTexture = dynamicTexture;
    	    return plane;
        };

		 // X AXIS
	    var axisX = BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0)], scene);
		axisX.isVisible = false;
		axisX.parent = mesh;
	    axisX.color = new BABYLON.Color3(1, 0, 0);
	    var xChar = makeTextPlane("X", "red", size / 10, "X");
		xChar.isVisible = false;
		xChar.parent = mesh;
	    xChar.position = new BABYLON.Vector3(0.9 * size, 0, 0);

		// Y AXIS
	    var axisY = BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0)], scene);
		axisY.isVisible = false;
		axisY.parent = mesh;
	    axisY.color = new BABYLON.Color3(0, 1, 0);
	    var yChar = makeTextPlane("Y", "green", size / 10, "Y");
		yChar.isVisible = false;
		yChar.parent = mesh;
	    yChar.position = new BABYLON.Vector3(0, 1.1 * size, 0);

		// Z AXIS
	    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size)], scene);
		axisZ.isVisible = false;
		axisZ.parent = mesh;
	    axisZ.color = new BABYLON.Color3(0, 0, 1);
	    var zChar = makeTextPlane("Z", "blue", size / 10, "Z");
		zChar.isVisible = false;
		zChar.parent = mesh;
	    zChar.position = new BABYLON.Vector3(0, 0, 0.9 * size);
	}

    //===========================================
    //
    //===========================================

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

        this.editor_ui = editor_group2d;
    }

    //===========================================
    //
    //===========================================

    updateselectobject(){
        var self = this;
        if(self.selectobject !=null){

            $("#obj_px").spinner("value",self.selectobject.position.x);
            $("#obj_py").spinner("value",self.selectobject.position.y);
            $("#obj_pz").spinner("value",self.selectobject.position.z);


            /*
            if(self.selectobject_text_id !=null){
                self.selectobject_text_id.text = self.selectobject.id;
            }
            //===
            if(self.selectobject_text_px !=null){
                self.selectobject_text_px.text = self.selectobject.position.x.toString();
                //console.log("found x",self.selectobject.position.x);
            }
            if(self.selectobject_text_py !=null){
                self.selectobject_text_py.text = self.selectobject.position.y.toString();
            }
            if(self.selectobject_text_pz !=null){
                self.selectobject_text_pz.text = self.selectobject.position.z.toString();
            }
            //===
            if(self.selectobject_text_rx !=null){
                self.selectobject_text_rx.text = self.selectobject.rotation.x.toString();
            }
            if(self.selectobject_text_ry !=null){
                self.selectobject_text_ry.text = self.selectobject.rotation.y.toString();
            }
            if(self.selectobject_text_rz !=null){
                self.selectobject_text_rz.text = self.selectobject.rotation.z.toString();
            }
            //===
            if(self.selectobject_text_sx !=null){
                self.selectobject_text_sx.text = self.selectobject.scaling.x.toString();
            }
            if(self.selectobject_text_sy !=null){
                self.selectobject_text_sy.text = self.selectobject.scaling.y.toString();
            }
            if(self.selectobject_text_sz !=null){
                self.selectobject_text_sz.text = self.selectobject.scaling.z.toString();
            }
            */
        }
    }
}
