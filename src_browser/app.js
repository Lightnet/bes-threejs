/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

//var vec = new THREE.Vector3();
//console.log(vec);

//listen window load
function addEvent(element, eventName, fn) {
    if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
    else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
}

class App {
	constructor(settings) {
		this.messages = [];
		this.clients = [];
		console.log("init?");
	}
	add(message){
		this.messages.push(message);
	}
}

class Game {
	constructor() {
		this.scene = null;
		this.scenehud = null;
		this.camera = null;
		this.camerahud = null;
		this.canvas = null;
		this.renderer = null;
		this.io = null;
		this.objects = [];
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2()
	}

	setup_network(){
		this.socket = io();
		this.socket.on('connect', function () {
		    console.log('server connected');
		});

		this.socket.on('disconnect', function () {
		    console.log('server disconnected');
		});
	}

	setup_css3d(){
		var container = document.getElementById( 'container' );

		var Element = function ( id, x, y, z, ry ) {

			var div = document.createElement( 'div' );
			div.style.width = '480px';
			div.style.height = '360px';
			div.style.backgroundColor = '#000';

			var iframe = document.createElement('iframe');
			iframe.style.width = '480px';
			iframe.style.height = '360px';
			iframe.style.border = '0px';
			iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
			div.appendChild( iframe );

			var object = new THREE.CSS3DObject( div );
			object.position.set( x, y, z );
			object.rotation.y = ry;

			return object;
		};

		this.cameracss3d = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
		//this.cameracss3d.position.set( 500, 350, 750 );
		this.cameracss3d.position.set( 0, 0, 750 );
		this.scenecss3d = new THREE.Scene();
		this.renderercss3d = new THREE.CSS3DRenderer();
		this.renderercss3d.setSize( window.innerWidth, window.innerHeight );
		this.renderercss3d.domElement.style.position = 'absolute';
		this.renderercss3d.domElement.style.top = 0;
		container.appendChild( this.renderercss3d.domElement );

		//var group = new THREE.Group();
		//group.add( new Element( '', 0, 0, 240, 0 ) );
		//group.add( new Element( '', 240, 0, 0, Math.PI / 2 ) );
		//group.add( new Element( '', 0, 0, - 240, Math.PI ) );
		//group.add( new Element( '', - 240, 0, 0, - Math.PI / 2 ) );
		//this.scenecss3d.add( group );

		var blocker = document.getElementById( 'blocker' );
		blocker.style.display = 'none';

		document.addEventListener( 'mousedown', function () { blocker.style.display = ''; } );
		document.addEventListener( 'mouseup', function () { blocker.style.display = 'none'; } );
		var self = this;
		function animate() {
			requestAnimationFrame( animate );
			//controls.update();
			//console.log("update?");
			self.renderercss3d.render( self.scenecss3d, self.cameracss3d );
		}
		animate();

		function onWindowResize() {

			self.cameracss3d.aspect = window.innerWidth / window.innerHeight;
			self.cameracss3d.updateProjectionMatrix();
			self.renderercss3d.setSize( window.innerWidth, window.innerHeight );

		}
		window.addEventListener( 'resize', onWindowResize, false );
	}

	setup_webgl(){
		var webgldiv = document.createElement( 'div' );
		webgldiv.style.width = '800px';
		webgldiv.style.height = '600px';
		webgldiv.style.backgroundColor = '#000';

		this.scene = new THREE.Scene();
		//this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camera = new THREE.PerspectiveCamera( 75, 800/600, 0.1, 1000 );
		//this.canvas = document.getElementById("application-canvas");
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.domElement.style.position = 'absolute';
		this.renderer.domElement.style.top = 0;
		//this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setSize( 800, 600 );

		this.renderer.autoClear = false;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;

		webgldiv.appendChild(this.renderer.domElement)

		var object = new THREE.CSS3DObject( webgldiv );
		object.position.set( 0, 0, -100 );
		object.rotation.y = 0;

		var group = new THREE.Group();
		group.add( object );
		this.scenecss3d.add( group );
	}

	//works mesh over lap scenes
	setup_hud(){
		this.scenehud = new THREE.Scene();
		//this.cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30);
		//this.camerahud = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camerahud = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0, 30);
		//this.camerahud.position.z = 5;

		//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        //var material = new THREE.MeshBasicMaterial( { color: 0xccccff } );
        //var cube = new THREE.Mesh( geometry, material );
        //cube.position.x = 1;
		//this.scenehud.add( cube );
		this.hudCanvas = document.createElement('canvas');
		var width = window.innerWidth;
        var height = window.innerHeight;
        // Again, set dimensions to fit the screen.
        this.hudCanvas.width = window.innerWidth;
        this.hudCanvas.height = window.innerHeight;
        // Get 2D context and draw something supercool.
        this.hudBitmap = this.hudCanvas.getContext('2d');
        this.hudBitmap.font = "Normal 40px Arial";
        this.hudBitmap.textAlign = 'center';
        this.hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
        this.hudBitmap.fillText('Initializing...', width / 2, height / 2);

		this.hudTexture = new THREE.Texture(this.hudCanvas);
        this.hudTexture.needsUpdate = true;
		var material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
        material.transparent = true;
		var planeGeometry = new THREE.PlaneGeometry(width, height);
        var plane = new THREE.Mesh(planeGeometry, material);
		this.scenehud.add(plane);
	}

	basesetup(){
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		this.scene.add( this.cube );
		this.camera.position.z = 5;

		this.objects.push(this.cube);
	}

	setup_mouseraycast(){

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		var self = this;

		function onDocumentMouseMove( event ) {
			event.preventDefault();
			self.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			self.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			self.raycaster.setFromCamera( self.mouse, self.camera );
			var intersects = self.raycaster.intersectObjects( self.scene.children );

			if ( intersects.length > 0 ) {
				console.log(intersects[ 0 ].object);
			}
		}

	}

	setup_renderpass(){
		var copyPass = new THREE.ShaderPass(THREE.CopyShader);
		copyPass.renderToScreen = true;

		var renderpass1 = new THREE.RenderPass(this.scene, this.camera);
		renderpass1.renderToScreen = false;

		var renderpass2 = new THREE.RenderPass(this.scenehud, this.camerahud);
		renderpass2.clear = false;

		this.effectComposer = new THREE.EffectComposer(this.renderer);
		this.effectComposer.addPass(renderpass1);
        this.effectComposer.addPass(renderpass2);

		this.effectComposer.addPass(copyPass);
	}

	render(){
		requestAnimationFrame(()=>{this.render()});
		this.cube.rotation.x += 0.1;
		this.cube.rotation.y += 0.1;
		//this.renderer.render(this.scene, this.camera);
		if(this.effectComposer !=null){
			this.effectComposer.render();
		}
	}

	load(){

	}

	init_simple(){
		this.setup_network();

		this.setup_css3d();

		this.setup_webgl();
		this.setup_hud();
		this.basesetup();

		this.setup_mouseraycast();
		//render pass with two secnes
		this.setup_renderpass();
		this.render();
	}

	init(){
		addEvent(window, 'load', ()=>{
			this.init_simple();
		});
	}
}


var game = new Game();
console.log(game);
//set up and listen window loads
game.init();
