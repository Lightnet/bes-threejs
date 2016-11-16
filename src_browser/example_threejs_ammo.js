/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

/*
	Javascript compile: babeljs ES6
	Simple example to extends threejs game API to run simple test game.
	That run on higher javascript to low javascript when compile with extra features
	from the web browser.



*/

class Example_threejs_ammo extends Game {
	constructor(settings){
		super(settings);
	}

	basicTexture(n) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 64;
        var ctx = canvas.getContext('2d');
        var colors = [];
        if (n === 0) {
            colors[0] = "#58AA80";
            colors[1] = "#58FFAA";
        }
        if (n === 1) {
            colors[0] = "#383838";
            colors[1] = "#38AA80";
        }
        if (n === 2) {
            colors[0] = "#AA8058";
            colors[1] = "#FFAA58";
        }
        if (n === 3) {
            colors[0] = "#383838";
            colors[1] = "#AA8038";
        }
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        var tx = new THREE.Texture(canvas);
        tx.needsUpdate = true;
        return tx;
    }

	addStaticBox(size, position, rotation, spec) {
        //console.log(this.buffgeoBox);
        var mesh;
        if (spec)
            mesh = new THREE.Mesh(this.buffgeoBox, this.matGroundTrans);
        else
            mesh = new THREE.Mesh(this.buffgeoBox, this.matGround);
        mesh.scale.set(size[0], size[1], size[2]);
        mesh.position.set(position[0], position[1], position[2]);
        mesh.rotation.set(rotation[0] * this.ToRad, rotation[1] * this.ToRad, rotation[2] * this.ToRad);
        this.scene.add(mesh);
        this.grounds.push(mesh);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    }

	gradTexture(color) {
        var c = document.createElement("canvas");
        var ct = c.getContext("2d");
        c.width = 16;
        c.height = 256;
        var gradient = ct.createLinearGradient(0, 0, 0, 256);
        var i = color[0].length;
        while (i--) {
            gradient.addColorStop(color[0][i], color[1][i]);
        }
        ct.fillStyle = gradient;
        ct.fillRect(0, 0, 16, 256);
        var texture = new THREE.Texture(c);
        texture.needsUpdate = true;
        return texture;
    }

	createTexMat() {
        var buffgeoBack = new THREE.BufferGeometry();
        buffgeoBack.fromGeometry(new THREE.IcosahedronGeometry(8000, 1));
        var back = new THREE.Mesh(buffgeoBack, new THREE.MeshBasicMaterial({ map: this.gradTexture([[1, 0.75, 0.5, 0.25], ['#1B1D1E', '#3D4143', '#72797D', '#b0babf']]), side: THREE.BackSide, depthWrite: false }));
        back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15 * this.ToRad));
        this.scene.add(back);
    }

	createAmmoScene() {
        //this.camera.position.set( 0, 50, 50 );
        //this.controls.target.set(0, 0, 0);
        //this.controls.update();
        //ground
        var groundShape = new Ammo.btBoxShape(new Ammo.btVector3(200, 20, 200)); //half extent
        var groundTransform = new Ammo.btTransform();
        groundTransform.setIdentity();
        groundTransform.setOrigin(new Ammo.btVector3(0, -20, 0));
        var mass = 0;
        var isDynamic = mass !== 0;
        var localInertia = new Ammo.btVector3(0, 0, 0);
        if (isDynamic)
            groundShape.calculateLocalInertia(mass, localInertia);
        var myMotionState = new Ammo.btDefaultMotionState(groundTransform);
        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia);
        var body = new Ammo.btRigidBody(rbInfo);
        //console.log(body);
        this.world.addRigidBody(body);
        this.addStaticBox([400, 40, 400], [0, -20, 0], [0, 0, 0], false);
        var groundShape2 = new Ammo.btBoxShape(new Ammo.btVector3(200, 20, 200)); //half extent
        var groundTransform2 = new Ammo.btTransform();
        groundTransform2.setIdentity();
        groundTransform2.setOrigin(new Ammo.btVector3(130, 40, 0));
        var q = new Ammo.btQuaternion(0, 0, 0.25881904510252074, 0.9659258262890683);
        //Ammo.js rotation angles doesn't work. use quat (date:2016.03.30  version:unknown)
        //q.setEulerZYX(0,0,30);
        //q.setEulerZYX(0,0,(30 * Math.PI / 180));
        //console.log(q);
        groundTransform2.setRotation(q);
        //console.log(groundTransform2);
        var localInertia2 = new Ammo.btVector3(0, 0, 0);
        if (isDynamic)
            groundShape2.calculateLocalInertia(mass, localInertia2);
        var myMotionState2 = new Ammo.btDefaultMotionState(groundTransform2);
        var rbInfo2 = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState2, groundShape2, localInertia2);
        var body2 = new Ammo.btRigidBody(rbInfo2);
        //console.log(body);
        this.world.addRigidBody(body2);
        //var geometry = new THREE.BoxGeometry( 200, 30, 390 );
        //var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
        //var cube = this.cube = new THREE.Mesh( geometry, material );
        //cube.quaternion.copy(body2.quaternion);
        //cube.position.copy(body2.position);
        //cube.position.set(groundTransform2.getOrigin().x().toFixed(2),
        //groundTransform2.getOrigin().y().toFixed(2),
        //groundTransform2.getOrigin().z().toFixed(2));
        //cube.rotation.set(groundTransform2.getRotation().x().toFixed(2),
        //groundTransform2.getRotation().y().toFixed(2),
        //groundTransform2.getRotation().z().toFixed(2),
        //groundTransform2.getRotation().w().toFixed(2));
        //this.scene.add( cube );
        this.addStaticBox([200, 30, 390], [130, 40, 0], [0, 0, 32], false);
        var x = 150;
        var z = -100 + Math.random() * 200;
        var y = 100 + Math.random() * 1000;
        //sphere
        var colShape = new Ammo.btSphereShape(1);
        var startTransform = new Ammo.btTransform();
        startTransform.setIdentity();
        var mass = 1;
        var isDynamic = (mass != 0);
        var localInertia = new Ammo.btVector3(0, 0, 0);
        if (isDynamic)
            colShape.calculateLocalInertia(mass, localInertia);
        //startTransform.setOrigin(new Ammo.btVector3(2, 10, 0));
        startTransform.setOrigin(new Ammo.btVector3(x, y, z));
        //console.log(startTransform);
        var myMotionState = new Ammo.btDefaultMotionState(startTransform);
        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia);
        var body = new Ammo.btRigidBody(rbInfo);
        //body.getMotionState().getWorldTransform(this.trans);
        //console.log(this.trans);
        //console.log(this.trans.getRotation());
        this.world.addRigidBody(body);
		console.log(body);
        this.bodies.push(body);
        var buffgeoSphere = new THREE.BufferGeometry();
        buffgeoSphere.fromGeometry(new THREE.SphereGeometry(1, 20, 10));
        this.meshs[0] = new THREE.Mesh(buffgeoSphere, this.matSphere);
        this.scene.add(this.meshs[0]);


        //var geometry = new THREE.BoxGeometry( 2, 2, 2 );
        //var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
        //var cube = this.cube = new THREE.Mesh( geometry, material );
        //cube.position.y = 5;
        //this.scene.add( cube );
        //this.meshs[0] = cube;
    }

	//render(){
		//super.render();
	//}

	updateAmmoPhysics() {
		super.updateAmmoPhysics();
		if (typeof Ammo != undefined) {
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
			*/
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
						console.log("reset!");
					}
				}
			}
			tbv30 = null;
		}
	}

	init(){
		this.bablephysics = true;
		super.init();
		//this.renderer.shadowMap.enabled = true;
		//this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;
		this.camera.position.set(0, 0, 300);
		//console.log("test?");
		this.materialType = 'MeshBasicMaterial';
		this.matSphere = new THREE[this.materialType]({ map: this.basicTexture(0), name: 'sph' });
		this.buffgeoBox = new THREE.BufferGeometry();
		this.buffgeoBox.fromGeometry(new THREE.BoxGeometry(1, 1, 1));
		this.matGround = new THREE[this.materialType]({ color: 0x3D4143, transparent: true, opacity: 0.5 });
        this.matGroundTrans = new THREE[this.materialType]({ color: 0x3D4143, transparent: true, opacity: 0.6 });
		this.createTexMat();

		//this.setup_webgl_basics();
		this.createAmmoScene();
	}
}
