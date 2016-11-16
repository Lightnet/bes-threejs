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

	createCannonScene() {
			//console.log(this);
            //var groundShape = new CANNON.Plane();
            //var groundBody = new CANNON.Body({ mass: 0 });
            //groundBody.addShape(groundShape);
            //groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
            //this.world.add(groundBody);
            //var ground = this.world.add({name:"ground",size:[400, 40, 400], pos:[0,-20,0], config:config});
            //this.addStaticBox( [400, 40, 400], [0,-20,0], [0,0,0], false);
            var boxShape1 = new CANNON.Box(new CANNON.Vec3(200, 20, 200)); //half extend
            var boxBody1 = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, -20, 0) });
            boxBody1.addShape(boxShape1);
            this.world.add(boxBody1);
            this.addStaticBox([400, 40, 400], [0, -20, 0], [0, 0, 0], false);
            var boxShape2 = new CANNON.Box(new CANNON.Vec3(100, 15, 195)); //half extend
            console.log(-Math.PI / 2);
            var boxBody2 = new CANNON.Body({ mass: 0 });
            boxBody2.addShape(boxShape2);
            boxBody2.position = new CANNON.Vec3(130, 40, 0);
            boxBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), (30 * Math.PI / 180));
            //boxBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),(0.5235987756));
            console.log(boxBody2.quaternion);
            this.world.add(boxBody2);
            //var geometry = new THREE.BoxGeometry( 200, 30, 390 );
            //var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
            //var cube = this.cube = new THREE.Mesh( geometry, material );
            //cube.quaternion.copy(boxBody2.quaternion);
            //cube.position.copy(boxBody2.position);
            //this.scene.add( cube );
            this.addStaticBox([200, 30, 390], [130, 40, 0], [0, 0, 32], false);
            var mass = 5, radius = 2;
            var sphereShape = new CANNON.Sphere(radius); // Step 1
            var sphereBody = new CANNON.Body({ mass: mass }); // Step 2
            sphereBody.addShape(sphereShape);
            //sphereBody.position.set(0,100,0);
            //sphereBody.angularVelocity.set(0,10,0);
            sphereBody.angularDamping = 0.5;
            sphereBody.addEventListener("collide", function (e) { console.log("sphere collided"); });
            this.bodies[0] = sphereBody;
            var x = 150;
            var z = -100 + Math.random() * 200;
            var y = 100 + Math.random() * 1000;
            sphereBody.position.set(x, y, z);
            this.world.add(sphereBody); // Step 3
            //console.log(sphereBody);
            var buffgeoSphere = new THREE.BufferGeometry();
            buffgeoSphere.fromGeometry(new THREE.SphereGeometry(2, 20, 10));
            this.meshs[0] = new THREE.Mesh(buffgeoSphere, this.matSphere);
            this.scene.add(this.meshs[0]);
            //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            //var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
            //var cube = this.cube = new THREE.Mesh( geometry, material );
            //this.scene.add( cube );
            //this.meshs[0] = cube;
        }


	init(){
		this.bablephysics = true;
		this.physicsIndex = 1;
		super.init();
		this.camera.position.set(0, 0, 10);
		//console.log("test?");
		this.materialType = 'MeshBasicMaterial';
		this.matSphere = new THREE[this.materialType]({ map: this.basicTexture(0), name: 'sph' });
		this.buffgeoBox = new THREE.BufferGeometry();
		this.buffgeoBox.fromGeometry(new THREE.BoxGeometry(1, 1, 1));
		this.matGround = new THREE[this.materialType]({ color: 0x3D4143, transparent: true, opacity: 0.5 });
        this.matGroundTrans = new THREE[this.materialType]({ color: 0x3D4143, transparent: true, opacity: 0.6 });
		this.createTexMat();

		//this.setup_webgl_basics();
		this.createCannonScene();
	}
}
