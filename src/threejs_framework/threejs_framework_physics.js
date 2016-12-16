/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_framework_module} from './threejs_framework_module';

export class Threejs_framework_physics extends Threejs_framework_module{

    constructor(args){
        super(args);
    }

    initCannonPhysics() {
		if (typeof CANNON != undefined) {
			this.world = new CANNON.World();
			this.world.gravity.set(0, -9.82, 0);
			this.world.broadphase = new CANNON.NaiveBroadphase();
			this.world.solver.iterations = 10;
		}
		//this.createCannonScene();
	}

	updateCannonPhysics(deta) {
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (typeof CANNON != undefined) {
			this.world.step(this.timeSteptimeStep);
		}
	}

	destroyCannonPhysics() {
		console.log('destroyCannonPhysics');
	}

	initAmmoPhysics() {
		//https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
		if (typeof Ammo != undefined) {
			console.log('init Ammo');
			this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
			this.dispatcher = this.dp = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
			//console.log(dispatcher);
			this.overlappingPairCache = new Ammo.btDbvtBroadphase();
			this.solver = new Ammo.btSequentialImpulseConstraintSolver();
			this.world = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration);
			this.world.setGravity(new Ammo.btVector3(0, -10, 0));
			this.trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking
			//this.createAmmoScene();
		}
	}

	updateAmmoPhysics(deta) {
        deta = deta || 1;
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (typeof Ammo != undefined) {
			//this.world.stepSimulation(1 / 60, 10);
            this.world.stepSimulation(deta, 2);
            //console.log(deta);
		}
	}

	destroyAmmoPhysics() {
		//https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
		// Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
		Ammo.destroy(this.collisionConfiguration);
		Ammo.destroy(this.dispatcher);
		Ammo.destroy(this.overlappingPairCache);
		Ammo.destroy(this.solver);
	}

	initOimoPhysics() {
		if (typeof OIMO != undefined) {
			this.world = new OIMO.World(1 / 60, 2);
			//this.world.gravity = new OIMO.Vec3(0, -1, 0);
			this.world.clear();
			//this.createOimoScene();
			//this.infos = document.getElementById("info");
		}
	}

	updateOimoPhysics(deta) {
		//https://github.com/lo-th/Oimo.js/blob/gh-pages/test_moving.html
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		this.world.step();
	}

	destroyOimoPhysics() {
        console.log('destroyOimoPhysics');
    }

	updatePhysics(deta) {
        //console.log("p");
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
			this.updateOimoPhysics(deta);
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
			this.updateCannonPhysics(deta);
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
			this.updateAmmoPhysics(deta);
		}
	}

	initPhysics() {

        if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
            this.initOimoPhysics();
        }
        if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
            this.initCannonPhysics();
        }
        if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
            this.initAmmoPhysics();
        }
		console.log("init physics type:" + this.setPhysicsType[this.physicsIndex]);
    }

}
