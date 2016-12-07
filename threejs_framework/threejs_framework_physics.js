/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Threejs_framework_physics{

    constructor(args){
        if(!args){
            args = {};
            //console.log("no args...");
        }
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

	updateCannonPhysics() {
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (typeof CANNON != undefined) {
			//var timeStep = 1.0 / 60.0; // seconds
			//this.world.step(timeStep);
			//timeStep = null;
			//world.gravity.set(0,0,-9.82);
			this.world.step(this.timeSteptimeStep);
			//https://github.com/schteppe/cannon.js/issues/188
			//var result = [];
			//this.world.narrowphase.getContacts([bodyA], [bodyB], this.world, result, [], [], []);
			//var overlaps = result.length > 0;
			//console.log(this.bodies.length);
			/*
			for (var i = 0; i < this.bodies.length; i++) {
				var mesh = this.meshs[i];
				var body = this.bodies[i];
				//console.log(body.sleeping);
				//if(!body.sleeping){
				//console.log(body.position.x);
				//check if mesh and body is not null
				if((body != null)&&(mesh != null)){
					//console.log(mesh.position);
					//console.log(body.position);
					mesh.position.copy(body.position);

					mesh.quaternion.copy(body.quaternion);
				}
			}
			*/
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

	updateAmmoPhysics() {
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (typeof Ammo != undefined) {
			this.world.stepSimulation(1 / 60, 10);
			/*
			var i, dp = this.dp, num = dp.getNumManifolds(), manifold, num_contacts, j, pt;
			for (i = 0; i < num; i++) {
				manifold = dp.getManifoldByIndexInternal(i);
				num_contacts = manifold.getNumContacts();
				if (num_contacts === 0) {
					continue;
				}
				for (j = 0; j < num_contacts; j++) {
					pt = manifold.getContactPoint(j);
				}
			}
			var tbv30 = new Ammo.btVector3();
			for (var ii = 0; ii < this.bodies.length; ii++) {
				var mesh = this.meshs[ii];
				var body = this.bodies[ii];
				//console.log(body.sleeping);
				if (body.getMotionState()) {
					//get location or position
					body.getMotionState().getWorldTransform(this.trans);
					//console.log("world pos = " + [this.trans.getOrigin().x().toFixed(2), this.trans.getOrigin().y().toFixed(2), this.trans.getOrigin().z().toFixed(2)]);
					if(mesh !=null){
						//console.log(mesh);
						mesh.position.set(this.trans.getOrigin().x().toFixed(2), this.trans.getOrigin().y().toFixed(2), this.trans.getOrigin().z().toFixed(2));
						mesh.rotation.set(this.trans.getRotation().x().toFixed(2), this.trans.getRotation().y().toFixed(2), this.trans.getRotation().z().toFixed(2), this.trans.getRotation().w().toFixed(2));
					}

					if (this.trans.getOrigin().y().toFixed(2) < -100) {
						var x = 150;
						var z = -100 + Math.random() * 200;
						var y = 100 + Math.random() * 1000;
						body.setLinearVelocity(tbv30);
						body.setAngularVelocity(tbv30);
						var transform = body.getCenterOfMassTransform();
						console.log(transform);
						transform.setOrigin(new Ammo.btVector3(x, y, z));
						console.log("reset?");
					}
				}
			}
			tbv30 = null;
			*/
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

	updateOimoPhysics() {
		//https://github.com/lo-th/Oimo.js/blob/gh-pages/test_moving.html
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		this.world.step();
		//this.infos.innerHTML = this.world.performance.show();
		/*
		for (var i = 0; i < this.bodies.length; i++) {
			var mesh = this.meshs[i];
			var body = this.bodies[i];
			if (!body.sleeping) {
				mesh.position.copy(body.getPosition());
				//console.log(mesh.position);
				mesh.quaternion.copy(body.getQuaternion());
				//console.log(body.numContacts);
				//if (body.numContacts > 0) {
				//}
				if (mesh.position.y < -100) {
					var x = 150;
					var z = -100 + Math.random() * 200;
					var y = 100 + Math.random() * 1000;
					body.resetPosition(x, y, z);
				}
			}
		}
		*/
	}

	destroyOimoPhysics() {
        console.log('destroyOimoPhysics');
    }

	updatePhysics() {
		if ((typeof this.world == 'undefined') || (this.world == null)) {
			return;
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
			this.updateOimoPhysics();
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
			this.updateCannonPhysics();
		}
		if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
			this.updateAmmoPhysics();
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
