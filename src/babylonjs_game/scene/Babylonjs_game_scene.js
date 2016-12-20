/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_scene extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    simple_scene(){
        var scene = this.scene;
		//===============================================
		// simple scene
		//===============================================
		var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), this.scenes[this.scenename]);

		var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
		var boxMaterial = new BABYLON.StandardMaterial("material", this.scenes[this.scenename]);
		boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
		box.material = boxMaterial;
		box.position.y = 10;
		box.position.x = -3;

		this.camera.setTarget(BABYLON.Vector3.Zero());
		//var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
		//box.position.y = 10;
		//box.position.x = -3;

        var box1 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box1.position.x = -5;
        box1.position.y = 1;
        //box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, restitution: 1, mass:0, friction:0.5});
        box1.showBoundingBox = true;
        var box2 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box2.position.x = 5;
        box2.position.y = 1;
        //box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, restitution: 1, mass:0, friction:0.5});
        box2.showBoundingBox = true;
        //https://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter#box
		// Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    	//var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, this.scene);
        var ground = BABYLON.MeshBuilder.CreateBox("ground", {height:1,width:20,depth:20}, scene);
        //ground.scale.x = 100;
        //ground.scale.y = 100;
        ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, restitution: 0,  mass:0, friction:10});
        ground.showBoundingBox = true;
	}

    
}
