/*
 *
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
		this.camera = null;
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
	}

	basesetup(){
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		this.scene.add( this.cube );
		this.camera.position.z = 5;
	}

	render(){
		requestAnimationFrame(()=>{this.render()});
		this.cube.rotation.x += 0.1;
		this.cube.rotation.y += 0.1;
		this.renderer.render(this.scene, this.camera);
	}

	load(){

	}

	init_simple(){
		this.setup_network();
		this.setup();
		this.basesetup();
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
