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

    _this.scriptlist.push('/js/example_threejs_oimo.js');
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
    key: 'createOimoScene',
    value: function createOimoScene() {
      console.log('init oimo.js');
      // The Bit of a collision group
      var group1 = 1 << 0; // 00000000 00000000 00000000 00000001
      var group2 = 1 << 1; // 00000000 00000000 00000000 00000010
      var group3 = 1 << 2; // 00000000 00000000 00000000 00000100
      var all = 0xffffffff; // 11111111 11111111 11111111 11111111
      // Is all the physics setting for rigidbody
      var config = [1, 0.4, 0.2, 1, 0xffffffff // The bits of the collision groups with which the shape collides.
      ];
      //add ground
      var ground = this.world.add({ name: "ground", size: [400, 40, 400], pos: [0, -20, 0], config: config });
      this.addStaticBox([400, 40, 400], [0, -20, 0], [0, 0, 0], false);
      var ground2 = this.world.add({ name: "ground2", size: [200, 30, 390], pos: [130, 40, 0], rot: [0, 0, 32], config: config });
      this.addStaticBox([200, 30, 390], [130, 40, 0], [0, 0, 32], false);
      config[3] = group1;
      config[4] = all & ~group2; // all exepte groupe2
      var ground3 = this.world.add({ name: "ground3", size: [5, 100, 390], pos: [0, 40, 0], rot: [0, 0, 0], config: config });
      this.addStaticBox([5, 100, 390], [0, 40, 0], [0, 0, 0], true);
      var x = 150;
      var z = -100 + Math.random() * 200;
      var y = 100 + Math.random() * 1000;
      var w = 10 + Math.random() * 10;
      var h = 10 + Math.random() * 10;
      var d = 10 + Math.random() * 10;
      var buffgeoSphere = new THREE.BufferGeometry();
      buffgeoSphere.fromGeometry(new THREE.SphereGeometry(1, 20, 10));
      config[4] = all;
      config[3] = group2; //
      this.bodies[0] = this.world.add({ type: 'sphere', size: [w * 0.5], pos: [x, y, z], move: true, config: config });
      this.bodies[0].name = "sphere";
      this.meshs[0] = new THREE.Mesh(buffgeoSphere, this.matSphere);
      //console.log(this.world);
      //console.log(this.bodies[0]);
      //this.bodies[0].addEventListener("collide", function(e){ console.log("sphere collided"); } );//nope
      //this.bodies[0].on('collision',()=>{});
      //console.log(this.meshs[0]);
      this.meshs[0].scale.set(w * 0.5, w * 0.5, w * 0.5);
      this.scene.add(this.meshs[0]);
    }

    //render(){
    //super.render();
    //}

  }, {
    key: 'updateOimoPhysics',
    value: function updateOimoPhysics() {
      _get(Example_threejs_ammo.prototype.__proto__ || Object.getPrototypeOf(Example_threejs_ammo.prototype), 'updateOimoPhysics', this).call(this);
      if (typeof this.world == 'undefined' || this.world == null) {
        return;
      }
      //this.infos.innerHTML = this.world.performance.show();
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
            console.log("reset!");
          }
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.bablephysics = true;
      this.physicsIndex = 0;
      _get(Example_threejs_ammo.prototype.__proto__ || Object.getPrototypeOf(Example_threejs_ammo.prototype), 'init', this).call(this);
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
      this.createOimoScene();
      this.setup_trackcamera();
    }
  }]);

  return Example_threejs_ammo;
})(Threejsbes6);