/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './Babylonjs_game_module';

export class Babylonjs_game_assets extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    init_assets(){
        this.assetsManager = new BABYLON.AssetsManager(this.scene);
    }

    add_assets_mesh(filepath, objectname){
        var self = this;
        var meshTask = this.assetsManager.addMeshTask("object task" + this.uuid(), objectname, "assets/", filepath);
        meshTask.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].position = new BABYLON.Vector3(0,2,3);
			//console.log(task.loadedMeshes[0].position);
			task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
			self.models.push({mesh:task.loadedMeshes[0],skeleton:null});
		}
    }

    finish_assets_load(cb){
        this.assetsManager.onFinish = function(tasks) {
			//console.log('assets loaded!');
			//self.setup_game();
            cb();
			//self.engine.hideLoadingUI();
            //self.loadmap_requestXML();
		};
    }

    load_assets(){
        this.assetsManager.load();
    }

    createscene_assets(){
		var self = this;
        //console.log("adding preload assets...");

        this.init_assets();


        this.add_assets_mesh("block_character03.babylon","CubeBody");

        this.add_assets_mesh("arm_cube.babylon","Cube");

        this.add_assets_mesh("block_floor.babylon","block_floor");
        this.add_assets_mesh("block_wall.babylon","block_wall");
        this.add_assets_mesh("block_stair.babylon","block_stair");
        this.add_assets_mesh("block_frame_door.babylon","block_framedoor");
        this.add_assets_mesh("block_ceiling.babylon","block_ceiling");

        this.finish_assets_load(()=>{
            self.setup_game();
        });

        this.load_assets();


        /*
		this.assetsManager = new BABYLON.AssetsManager(this.scene);

		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";

		var meshTask = this.assetsManager.addMeshTask("cubebody task", objectname, "assets/", filepath);
		meshTask.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].position = new BABYLON.Vector3(0,2,3);
			//console.log(task.loadedMeshes[0].position);
			task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
			self.models.push({mesh:task.loadedMeshes[0],skeleton:null});
		}

		filepath = "arm_cube.babylon";
		objectname = "Cube";

		var meshTask2 = this.assetsManager.addMeshTask("cube task", objectname, "assets/", filepath);
		meshTask2.onSuccess = function (task) {
    		//task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
			task.loadedMeshes[0].isVisible = false;
			self.meshes.push(task.loadedMeshes[0]);
			self.models.push({mesh:task.loadedMeshes[0],skeleton:null});
		}

		this.assetsManager.onFinish = function(tasks) {
			//console.log('assets loaded!');
			self.setup_game();
			//self.engine.hideLoadingUI();
            //self.loadmap_requestXML();
		};
		this.assetsManager.load();
        */

		/*
		//self.setup_game();
		var filepath = "block_character03.babylon";
		var objectname = "CubeBody";
		//var filepath = "arm_cube.babylon";
		//var objectname = "Cube";
		BABYLON.SceneLoader.ImportMesh(objectname, "/assets/", filepath, this.scene, function (newMeshes, particleSystems, skeletons) {
			console.log(newMeshes[0]);
			newMeshes[0].isVisible = false;
			//self.scene.beginAnimation(newMeshes[0], 0, 15, true, 0.5); //works
			//self.scene.beginAnimation(newMeshes[0], 11, 20, true, 0.5); //works
			self.meshes.push(newMeshes[0]);
			self.models.push({mesh:newMeshes[0],skeleton:skeletons[0]});
			self.setup_game();
		});
		*/
	}

    getMeshAssets(_name){
		var model = null;
		for(var i = 0 ; i < this.models.length;i++){
			if(this.models[i].mesh.name == _name){
				var mid = this.uuid();//random id generator
				//model = this.meshes[i].clone(mid,null,true);
				model = this.models[i].mesh.clone("mesh"+mid);
				var mid = this.uuid();//random id generator
				model.position = new BABYLON.Vector3(0, 0, 3);
                if(this.models[i].mesh.skeleton !=null){
                    model.skeleton = this.models[i].mesh.skeleton.clone("skeleton"+mid);
                }
				break;
			}
		}
		return model; //null or object
	}

    getmesh(_name){
        //console.log("get mesh?");
		var model = null;
		for(var i = 0 ; i < this.models.length;i++){
            //console.log(this.models[i].mesh.name," : ",_name);
			if(this.models[i].mesh.name == _name){
                //console.log("match????");
				var mid = this.uuid();//random id generator
				//model = this.meshes[i].clone(mid,null,true);
				model = this.models[i].mesh.clone("mesh"+mid);
				var mid = this.uuid();//random id generator
				model.position = new BABYLON.Vector3(0, 0, 3);
                if(this.models[i].mesh.skeleton !=null){
                    model.skeleton = this.models[i].mesh.skeleton.clone("skeleton"+mid);
                }
				//model.skeleton = this.models[i].skeleton.clone("skeleton"+mid);
				//this.scene.beginAnimation(model.skeleton, 40, 60, true, 0.5); //works /// works
                //console.log("done?");
				break;
			}
		}
		/*
		for(var i = 0 ; i < this.meshes.length;i++){
			if(this.meshes[i].name == _name){
				var mid = uuid();//random id generator
				//model = this.meshes[i].clone(mid,null,true);
				model = this.meshes[i].clone(mid);
				var mid = uuid();//random id generator
				model.skeleton = this.meshes[i].skeleton.clone(mid);
				this.scene.beginAnimation(model, 40, 60, true, 0.5); //works /// works
				break;
			}
		}
		*/
		return model; //null or object
	}

}
