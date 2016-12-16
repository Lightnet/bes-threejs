'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    Project Name: bes-threejs
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

var Example_threejs_ammo = (function (_Threejsbes) {
  _inherits(Example_threejs_ammo, _Threejsbes);

  function Example_threejs_ammo(settings) {
    _classCallCheck(this, Example_threejs_ammo);

    var _this = _possibleConstructorReturn(this, (Example_threejs_ammo.__proto__ || Object.getPrototypeOf(Example_threejs_ammo)).call(this, settings));

    _this.scriptlist.push('/js/libs/cannon.min.js');
    return _this;
  }

  _createClass(Example_threejs_ammo, [{
    key: 'basicTexture',
    value: function basicTexture(n) {
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
  }, {
    key: 'addStaticBox',
    value: function addStaticBox(size, position, rotation, spec) {
      //console.log(this.buffgeoBox);
      var mesh;
      if (spec) mesh = new THREE.Mesh(this.buffgeoBox, this.matGroundTrans);else mesh = new THREE.Mesh(this.buffgeoBox, this.matGround);
      mesh.scale.set(size[0], size[1], size[2]);
      mesh.position.set(position[0], position[1], position[2]);
      mesh.rotation.set(rotation[0] * this.ToRad, rotation[1] * this.ToRad, rotation[2] * this.ToRad);
      this.scene.add(mesh);
      this.grounds.push(mesh);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  }, {
    key: 'gradTexture',
    value: function gradTexture(color) {
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
  }, {
    key: 'createTexMat',
    value: function createTexMat() {
      var buffgeoBack = new THREE.BufferGeometry();
      buffgeoBack.fromGeometry(new THREE.IcosahedronGeometry(8000, 1));
      var back = new THREE.Mesh(buffgeoBack, new THREE.MeshBasicMaterial({ map: this.gradTexture([[1, 0.75, 0.5, 0.25], ['#1B1D1E', '#3D4143', '#72797D', '#b0babf']]), side: THREE.BackSide, depthWrite: false }));
      back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15 * this.ToRad));
      this.scene.add(back);
    }
  }, {
    key: 'createCannonScene',
    value: function createCannonScene() {
      /*
      // Position
      body.position.setZero();
      body.previousPosition.setZero();
      body.interpolatedPosition.setZero();
      body.initPosition.setZero();
      		// orientation
      body.quaternion.set(0,0,0,1);
      body.initQuaternion.set(0,0,0,1);
      body.previousQuaternion.set(0,0,0,1);
      body.interpolatedQuaternion.set(0,0,0,1);
      		// Velocity
      body.velocity.setZero();
      body.initVelocity.setZero();
      body.angularVelocity.setZero();
      body.initAngularVelocity.setZero();
      		// Force
      body.force.setZero();
      body.torque.setZero();
      		// Sleep state reset
      body.sleepState = 0;
      body.timeLastSleepy = 0;
      body._wakeUpAfterNarrowphase = false;
      		*/

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
      //console.log(-Math.PI / 2);
      var boxBody2 = new CANNON.Body({ mass: 0 });
      boxBody2.addShape(boxShape2);
      boxBody2.position = new CANNON.Vec3(130, 40, 0);
      boxBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), 30 * Math.PI / 180);
      //boxBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),(0.5235987756));
      //console.log(boxBody2.quaternion);
      this.world.add(boxBody2);
      //var geometry = new THREE.BoxGeometry( 200, 30, 390 );
      //var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
      //var cube = this.cube = new THREE.Mesh( geometry, material );
      //cube.quaternion.copy(boxBody2.quaternion);
      //cube.position.copy(boxBody2.position);
      //this.scene.add( cube );
      this.addStaticBox([200, 30, 390], [130, 40, 0], [0, 0, 32], false);

      var mass = 5,
          radius = 2;
      var sphereShape = new CANNON.Sphere(radius); // Step 1
      var sphereBody = new CANNON.Body({ mass: mass }); // Step 2
      sphereBody.addShape(sphereShape);
      //sphereBody.position.set(0,100,0);
      //sphereBody.angularVelocity.set(0,10,0);

      //sphereBody.angularDamping = 0.5;//slow ball to stop
      sphereBody.addEventListener("collide", (function (e) {
        console.log("sphere collided");
      }));

      var x = 150;
      var z = -100 + Math.random() * 200;
      var y = 100 + Math.random() * 1000;
      sphereBody.position.set(x, y, z);
      //console.log(sphereBody.position);
      this.bodies[0] = sphereBody;
      //console.log(this.bodies[0].position);
      this.world.add(sphereBody); // Step 3
      console.log(sphereBody);
      var buffgeoSphere = new THREE.BufferGeometry();
      buffgeoSphere.fromGeometry(new THREE.SphereGeometry(2, 20, 10));
      this.meshs[0] = new THREE.Mesh(buffgeoSphere, this.matSphere);
      this.meshs[0].position.set(x, y, z);
      this.scene.add(this.meshs[0]);
      //console.log(this.meshs[0]);
      //console.log(this.meshs[0].position.x);
      //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      //var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
      //var cube = this.cube = new THREE.Mesh( geometry, material );
      //this.scene.add( cube );
      //this.meshs[0] = cube;
    }

    //render(){
    //super.render();
    //}

  }, {
    key: 'updateCannonPhysics',
    value: function updateCannonPhysics() {
      _get(Example_threejs_ammo.prototype.__proto__ || Object.getPrototypeOf(Example_threejs_ammo.prototype), 'updateCannonPhysics', this).call(this);

      for (var i = 0; i < this.bodies.length; i++) {
        var mesh = this.meshs[i];
        var body = this.bodies[i];
        //console.log(body.sleeping);
        //if(!body.sleeping){
        //console.log(body.position.x);
        //check if mesh and body is not null
        if (body != null && mesh != null) {
          //console.log(mesh.position);
          //console.log(body.position);
          mesh.position.copy(body.position);
          mesh.quaternion.copy(body.quaternion);

          if (body.position.y < -100) {
            var x = 150;
            var z = -100 + Math.random() * 200;
            var y = 100 + Math.random() * 1000;
            body.velocity.setZero();
            body.initVelocity.setZero();
            body.angularVelocity.setZero();
            body.initAngularVelocity.setZero();
            body.position.set(x, y, z);
            console.log("reset!");
          }
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.bablephysics = true;
      this.physicsIndex = 1;
      _get(Example_threejs_ammo.prototype.__proto__ || Object.getPrototypeOf(Example_threejs_ammo.prototype), 'init', this).call(this);
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
      this.createCannonScene();
      this.setup_trackcamera();
    }
  }]);

  return Example_threejs_ammo;
})(Threejsbes6);