/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

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

	setup(){
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.canvas = document.getElementById("application-canvas");
		this.renderer = new THREE.WebGLRenderer({canvas:this.canvas});
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.renderer.autoClear = false;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;
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
		this.setup();
		this.setup_hud();
		this.basesetup();
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
