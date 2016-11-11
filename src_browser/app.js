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
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.canvas = document.getElementById("application-canvas");
		this.renderer = new THREE.WebGLRenderer({canvas:this.canvas});
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.basesetup();
		this.setup();
	}

	basesetup(){
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		this.scene.add( this.cube );
		this.camera.position.z = 5;
	}

	setup(){

	}

	render(){
		requestAnimationFrame(()=>{this.render()});
		this.cube.rotation.x += 0.1;
		this.cube.rotation.y += 0.1;
		this.renderer.render(this.scene, this.camera);
	}

	init(){
		this.render();
	}
}


window.onload = function(){
	console.log("init service?");
	var game = new Game();
	console.log(game);
	game.init();
}
