/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_framework_module} from './babylonjs_framework_module';

export class Babylonjs_framework_scene extends Babylonjs_framework_module{
//export class Babylonjs_framework_scene {

    constructor(args){
        super(args);
        //args.createScene = this.createScene;
        //args.createscene_objects = this.createscene_objects;
        //args.start_scenerender = this.start_scenerender;
    }

    //create simple scene
	createScene() {
	    // create a basic BJS Scene object
	    var scene = new BABYLON.Scene(this.engine);
	    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
	    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
		//console.log(camera);
	    // target the camera to scene origin
	    camera.setTarget(BABYLON.Vector3.Zero());
	    // attach the camera to the canvas
	    //camera.attachControl(this.canvas, false);
		this.camera = camera;
	    // return the created scene
	    return scene;
	}

    //create example scene
	createscene_objects(){
		// create a basic light, aiming 0,1,0 - meaning, to the sky
	    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
		// create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
		var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
	    // move the sphere upward 1/2 of its height
	    sphere.position.y = 1;
		this.sphere = sphere;
	    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
	    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
		this.ground = ground;
	}

    //start_scenerender(){
		//var self = this;
		//this.engine.runRenderLoop(function() {
            //console.log("main render!");
			//if(self.scenes[self.scenename] !=null){
				//if(typeof self.scenes[self.scenename].renderloop === 'function'){
					//self.scenes[self.scenename].renderloop(); //custom function call
				//}else{
					//self.scenes[self.scenename].render();
				//}
			//}
		//});
	//}


}
