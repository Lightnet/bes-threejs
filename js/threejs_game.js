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

function addListener(event, obj, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(event, fn, false); // modern browsers
	} else {
		obj.attachEvent("on" + event, fn); // older versions of IE
	}
}

var Threejs_game = (function (_Threejsbes) {
	_inherits(Threejs_game, _Threejsbes);

	function Threejs_game(settings) {
		_classCallCheck(this, Threejs_game);

		//add custom javascript add here.
		var _this = _possibleConstructorReturn(this, (Threejs_game.__proto__ || Object.getPrototypeOf(Threejs_game)).call(this, settings));

		_this.scriptlist.push('/js/pixi.min.js');
		return _this;
	}
	//http://stackoverflow.com/questions/29421702/threejs-texture
	//yourTexture.minFilter = THREE.LinearFilter


	_createClass(Threejs_game, [{
		key: 'create_hud',
		value: function create_hud() {
			this.hudCanvas = document.createElement('canvas');
			var width = window.innerWidth;
			var height = window.innerHeight;
			// Again, set dimensions to fit the screen.
			this.hudCanvas.width = 512;
			this.hudCanvas.height = 512;
			// Get 2D context and draw something supercool.
			this.hudBitmap = this.hudCanvas.getContext('2d');
			this.hudBitmap.font = "Normal 40px Arial";
			this.hudBitmap.textAlign = 'center';
			this.hudBitmap.fillStyle = "rgba(200,200,200,0.75)";
			this.hudBitmap.fillText('Initializing...', 512 / 2, 512 / 2);

			this.hudTexture = new THREE.Texture(this.hudCanvas);
			console.log(this.hudTexture);
			this.hudTexture.needsUpdate = true;
			//this.hudTexture.addEventListener
			var material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
			console.log(material);
			//material.addEventListener
			material.transparent = true;
			var planeGeometry = new THREE.PlaneGeometry(width, height);
			var plane = new THREE.Mesh(planeGeometry, material);
			this.scenehud.add(plane);

			this.count = 0;
		}
	}, {
		key: 'create_hud_sprite',
		value: function create_hud_sprite() {
			this.hudCanvas = document.createElement('canvas');
			//console.log(this.hudCanvas);
			//this.hudCanvas.addEventListener('click',function(){
			//console.log("click?");
			//} ,false);

			//addListener('click', this.hudCanvas, function () {
			// Do stuff
			//console.log("click?");
			//});

			//addListener('click', window, function () {
			// Do stuff
			//console.log("click?");
			//});


			var width = window.innerWidth;
			var height = window.innerHeight;
			// Again, set dimensions to fit the screen.
			this.hudCanvas.width = width;
			this.hudCanvas.height = height;
			// Get 2D context and draw something supercool.
			this.hudBitmap = this.hudCanvas.getContext('2d');
			this.hudBitmap.font = "Normal 40px Arial";
			this.hudBitmap.textAlign = 'center';
			this.hudBitmap.fillStyle = "rgba(200,200,200,0.75)";
			this.hudBitmap.fillText('Initializing...', width / 2, height / 2);

			this.hudTexture = new THREE.Texture(this.hudCanvas);
			this.hudTexture.minFilter = THREE.LinearFilter;
			//console.log(this.hudTexture);
			this.hudTexture.needsUpdate = true;
			//this.hudTexture.addEventListener
			//var material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
			//console.log(material);
			//material.addEventListener
			//material.transparent = true;
			//var planeGeometry = new THREE.PlaneGeometry(width, height);
			//var planeGeometry = new THREE.PlaneGeometry(512, 512);
			//var plane = new THREE.Mesh(planeGeometry, material);
			//this.scenehud.add(plane);
			//this.scene.add(plane);

			var material = new THREE.SpriteMaterial({ map: this.hudTexture });
			//material.addEventListener
			//console.log(material);

			var sprite = new THREE.Sprite(material);

			//this.domEvents.addEventListener(sprite, 'click', function(event){
			//console.log('you clicked on the sprite')
			//}, false);
			//sprite.addEventListener
			//sprite.addEventListener('click',function(){
			//console.log("click?");
			//} ,false);

			//window.addEventListener('click',function(){
			//console.log("click?");
			//} ,false);

			//sprite.addEventListener
			//console.log(sprite);
			//var sprite = new THREE.Sprite( { map: this.hudTexture, useScreenCoordinates: true } );
			//sprite.position.set( 0, 0, 0 );
			//sprite.position.normalize();
			//console.log(sprite);
			this.scene.add(sprite);
		}
	}, {
		key: 'create_hud_sprite2d',
		value: function create_hud_sprite2d() {
			this.hudCanvas = document.createElement('canvas');
			//var material = THREE.SpriteCanvasMaterial({canvas })
			//var sprite = new THREE.Sprite(material);

			console.log(THREE);
		}
	}, {
		key: 'update',
		value: function update() {
			_get(Threejs_game.prototype.__proto__ || Object.getPrototypeOf(Threejs_game.prototype), 'update', this).call(this);
			if (this.count == null) {
				this.count = 0;
			}
			this.count++;
			if (this.count > 60) {
				this.count = 0;
			}
			/*
   if(this.hudBitmap !=null){
   	this.hudBitmap.clearRect(0, 0, 512, 512);
   	var width = window.innerWidth;
          var height = window.innerHeight;
   	this.hudBitmap.fillText('Initializing...' + this.count, 512 / 2, 512 / 2);
   	this.hudTexture.needsUpdate = true;
   }
   */
		}
	}, {
		key: 'createsimple2dtext',
		value: function createsimple2dtext() {
			var c = document.createElement('canvas');
			c.width = 64;
			c.height = 64;
			//c.getContext('2d').font = '50px Arial';
			//c.getContext('2d').fillText('Hello, world!', 2, 50);

			var renderer = PIXI.autoDetectRenderer(64, 64, { backgroundColor: 0x1099bb, canvas: c });
			//var renderer = PIXI.autoDetectRenderer(64, 64,{backgroundColor : 0x1099bb, view:this.renderer.domElement},false);
			//document.body.appendChild(renderer.view);

			// create the root of the scene graph
			var stage = new PIXI.Container();

			var sprite = PIXI.Sprite.fromImage('/assets/bunny.png');

			sprite.position.set(0, 0);
			sprite.interactive = true;
			sprite.on('mousedown', onDown);
			sprite.on('touchstart', onDown);

			stage.addChild(sprite);

			function onDown(eventData) {

				sprite.scale.x += 0.3;
				sprite.scale.y += 0.3;
			}
			// start animating
			animate();

			var tex = new THREE.Texture(renderer.view);
			//var tex = new THREE.Texture(c);
			tex.needsUpdate = true;
			var mat = new THREE.MeshBasicMaterial({ map: tex });
			//mat.transparent = true;
			console.log(c.width + ":" + c.height);
			var titleQuad = new THREE.Mesh(
			//new THREE.PlaneGeometry(c.width, c.height),
			new THREE.PlaneGeometry(5, 5), mat);
			titleQuad.doubleSided = true;

			this.scene.add(titleQuad);

			function animate() {
				if (sprite != null) {
					sprite.scale.y += 0.1;
					if (sprite.scale.y > 2) {
						sprite.scale.y = 1;
						console.log("?");
					}
				}
				if (tex != null) {
					tex.needsUpdate = true;
					//console.log("update?");
				}
				requestAnimationFrame(animate);
				//console.log("render?");
				// render the root container
				renderer.render(stage);
			}
		}
	}, {
		key: 'setup_mouseraycast',
		value: function setup_mouseraycast() {
			document.addEventListener('mousemove', onDocumentMouseMove, false);
			var self = this;
			function onDocumentMouseMove(event) {
				event.preventDefault();
				self.mouse.x = event.clientX / window.innerWidth * 2 - 1;
				self.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

				self.raycaster.setFromCamera(self.mouse, self.camera);
				var intersects = self.raycaster.intersectObjects(self.scene.children);

				if (intersects.length > 0) {
					console.log(intersects[0].object);
				}
			}
		}
	}, {
		key: 'setup_css3d_hud',
		value: function setup_css3d_hud() {
			//webgldiv.appendChild(this.renderer.domElement);

			var _divcss3d = document.createElement('div');
			_divcss3d.style.width = '100px';
			_divcss3d.style.height = '100px';
			_divcss3d.innerHTML = 'Plain text inside a div.<br>Assets? <button onclick="game.SelectClick()"> Click </button>';

			var object = new THREE.CSS3DObject(_divcss3d);
			object.position.set(-400, 0, 1);
			object.rotation.y = 0;
			//var group = new THREE.Group();
			//group.add( object );
			this.scenecss3d.add(object);

			//var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb},false);
			var renderer = PIXI.autoDetectRenderer(800, 600, { transparent: true }, false);
			//document.body.appendChild(renderer.view);

			// create the root of the scene graph
			var stage = new PIXI.Container();

			var sprite = PIXI.Sprite.fromImage('/assets/bunny.png');

			sprite.position.set(0, 0);
			sprite.interactive = true;
			sprite.on('mousedown', onDown);
			sprite.on('touchstart', onDown);

			stage.addChild(sprite);

			function onDown(eventData) {

				sprite.scale.x += 0.3;
				sprite.scale.y += 0.3;
			}
			// start animating
			animate();

			function animate() {

				requestAnimationFrame(animate);
				//console.log("render?");

				// render the root container
				renderer.render(stage);
			}

			var object = new THREE.CSS3DObject(renderer.view);

			object.position.set(0, 0, 1);
			object.rotation.y = 0;
			//var group = new THREE.Group();
			//group.add( object );
			this.scenecss3d.add(object);
		}
	}, {
		key: 'SelectClick',
		value: function SelectClick() {
			console.log("click?");
		}
	}, {
		key: 'loadmeshjson',
		value: function loadmeshjson() {
			//http://yomotsu.net/blog/2015/10/31/three-r73-anim.html
			var model = null;
			var mixer;
			var self = this;
			var loader = new THREE.JSONLoader();

			//var filepath = '/assets/cube.json';
			//var filepath = '/assets/block_character03.json';
			var filepath = '/assets/arm_cube.json';
			//var filepath = '/assets/miku.min.json';
			//var filepath = '/assets/monster.js';
			var action = {};

			loader.load(filepath, (function (geometry, materials) {
				//model = new THREE.Mesh(geometry);//does not work need skin
				//model = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial( materials ) , false );
				//model = new THREE.SkinnedMesh( geometry,materials,true);
				console.log(materials);

				if (materials != null) {
					materials.forEach((function (material) {
						material.skinning = true;
					}));
					model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
				} else {
					model = new THREE.SkinnedMesh(geometry);
					model.material.skinning = true;
				}

				//model = new THREE.SkinnedMesh(geometry);
				//console.log(model);

				//model.scale.set(1,1,1);
				model.scale.set(0.1, 0.1, 0.1);
				//console.log(materials);
				//for(var x=0;x<materials.length;x++) materials[x].skinning = true;
				//console.log(geometry.animations);
				mixer = new THREE.AnimationMixer(model);
				action.idle = mixer.clipAction(geometry.animations[0]);
				//action.idle.setLoop(THREE.LoopRepeat);
				//action.idle = mixer.clipAction(geometry.animations[3]);
				//actions.idle.clampWhenFinished = true;
				action.idle.setEffectiveWeight(1).play();
				//action.idle.play();
				model.update = function () {
					var delta = self.clock.getDelta();
					if (mixer) {
						mixer.update(delta);
					}
				};
				self.scene.add(model);
				//var clock  = new THREE.Clock();
				//function update(){
				//var delta = clock.getDelta();
				//requestAnimationFrame( update );
				//if ( mixer ) { mixer.update( delta ); }
				//console.log('update?');
				//}
				//update();
			}));
		}
	}, {
		key: 'init',
		value: function init() {
			_get(Threejs_game.prototype.__proto__ || Object.getPrototypeOf(Threejs_game.prototype), 'init', this).call(this);
			var self = this;
			console.log("Class Threejs_game init");
			this.clock = new THREE.Clock();

			//this.camera.position.z = 5;
			this.camera.position.z = 2;

			//this.domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
			//this.domEvents = new THREEx.DomEvents(this.cameracss3d, this.renderercss3d.domElement);
			//this.setup_webgl_basics();
			//this.setup_hud_draw();
			//this.create_hud();
			//this.create_hud_sprite();

			//this.create_hud_sprite2d();

			//this.createsimple2dtext();

			var geometry = new THREE.BoxGeometry(.1, .1, .1);
			var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			this.cube = new THREE.Mesh(geometry, material);
			this.cube.position.y = 1;
			this.scene.add(this.cube);
			//this.domEvents.addEventListener(this.cube, 'click', function(event){
			//console.log('you clicked on the mesh');
			//}, false);
			//custom update for threejs render call
			this.cube.update = function () {}
			//this.rotation.x += 0.1;
			//this.rotation.y += 0.1;
			//console.log("update?");


			//this.objects.push(this.cube);//ray cast
			//this.setup_mouseraycast();

			;this.setup_css3d_hud();
			this.loadmeshjson();
			//css3d
			//this.setup_trackcamera_css3d();
			//webgl
			this.setup_trackcamera();

			//this.showloadingscreen();
			//function onWindowResize() {
			//self.camera.aspect = window.innerWidth / window.innerHeight;
			//self.camera.updateProjectionMatrix();
			//self.renderer.setSize( window.innerWidth, window.innerHeight );
			//}
			//window.addEventListener( 'resize', onWindowResize, false );
		}
	}]);

	return Threejs_game;
})(Threejsbes6);