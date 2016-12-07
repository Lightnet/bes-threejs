/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_framework_module} from './babylonjs_framework_module';

//template
export class Babylonjs_framework_physics extends Babylonjs_framework_module{

    constructor(args){
        super(args);
    }

    createscene_physics(){
		this.sphere.position.y = 5;
		this.sphere.physicsImpostor = new BABYLON.PhysicsImpostor(this.sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
		this.sphere.material = new BABYLON.StandardMaterial("Mat", this.scene);

		this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);

		//this.sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
		//impostor.setAngularVelocity(new BABYLON.Quaternion(0,1,0,0));
		//console.log(this.sphere.physicsImpostor);
		//this.sphere.physicsImpostor.setDeltaPosition(new BABYLON.Vector3(0,5,0));

		this.sphere.physicsImpostor.registerOnPhysicsCollide(this.ground.physicsImpostor, function(main, collided) {
    		//main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
			//console.log("hit");
		});
	}

    //init oimo.js physics
	init_phsics(){
		this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
	}

    parse_physcis(){

	}

}
