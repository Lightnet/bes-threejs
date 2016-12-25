/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_framework_module} from './babylonjs_framework_module';

export class Babylonjs_framework_editor extends Babylonjs_framework_module{

    constructor(args){
        super(args);
    }

    //http://doc.babylonjs.com/classes/2.4/Mesh
    /*
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
        params.diameterTop = args['parameters']['diameterTop'] || 1;
        //params.diameter = args['parameters']['diameter'] || 1;
        params.tessellation = Number(args['parameters']['tessellation'] || 4);
        console.log(params);
        _obj =  BABYLON.MeshBuilder.CreateCylinder('Cylinder', params, this.scene);
        //_obj = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
        _obj.rpgobj = new RPGCylinder(args);
        return _obj;
    }
    */
}
