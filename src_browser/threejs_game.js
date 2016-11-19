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
        obj.addEventListener(event, fn, false);   // modern browsers
    } else {
        obj.attachEvent("on"+event, fn);          // older versions of IE
    }
}

class Threejs_game extends Threejsbes6 {
	constructor(settings){
		super(settings);
	}

	create_hud(){
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

	create_hud_sprite(){
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
        this.hudCanvas.width = 512;
        this.hudCanvas.height = 512;
        // Get 2D context and draw something supercool.
        this.hudBitmap = this.hudCanvas.getContext('2d');
        this.hudBitmap.font = "Normal 40px Arial";
        this.hudBitmap.textAlign = 'center';
        this.hudBitmap.fillStyle = "rgba(200,200,200,0.75)";
        this.hudBitmap.fillText('Initializing...', 512 / 2, 512 / 2);

		this.hudTexture = new THREE.Texture(this.hudCanvas);
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

		var material = new THREE.SpriteMaterial( { map: this.hudTexture} );
		//material.addEventListener
		//console.log(material);

		var sprite = new THREE.Sprite(material);

		this.domEvents.addEventListener(sprite, 'click', function(event){
    		console.log('you clicked on the sprite')
		}, false);
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

	update(){
		super.update();
		if(this.count == null){
			this.count = 0;
		}
		this.count++;
		if(this.count > 60){
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

	init(){
		super.init();
		var self = this;
		console.log("Threejs_game?");
		this.domEvents   = new THREEx.DomEvents(this.camera, this.renderer.domElement)
		//this.setup_webgl_basics();
		//this.setup_hud_draw();
		//this.create_hud();
		this.create_hud_sprite();

		var geometry = new THREE.BoxGeometry( .1, .1, .1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		this.scene.add( this.cube );

		//this.domEvents.addEventListener(this.cube, 'click', function(event){
    		//console.log('you clicked on the mesh')
		//}, false);



		//custom update for threejs render call
		this.cube.update = function (){
			//this.rotation.x += 0.1;
			//this.rotation.y += 0.1;
			//console.log("update?");
		}
		this.camera.position.z = 5;
		//this.objects.push(this.cube);//ray cast
		this.setup_mouseraycast();











		function onWindowResize() {
			self.camera.aspect = window.innerWidth / window.innerHeight;
			self.camera.updateProjectionMatrix();
			self.renderer.setSize( window.innerWidth, window.innerHeight );
		}
		window.addEventListener( 'resize', onWindowResize, false );
	}
}
