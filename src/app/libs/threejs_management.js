console.log("init node threejs");

//import THREE from 'three';
var THREE = require('three');

//console.log(THREE());
var vet = new THREE.Vector3(3, 0, 3);
console.log(vet);

export class Game {
	constructor(settings) {
		this.messages = [];
		this.clients = [];
	}
	add(message){
		this.messages.push(message);
	}
	connect(io,socket){
		//console.log("game socket?");
	}
	disconnect(io,socket){

	}
}

export class GamePlugin {
	constructor(settings) {
		this.messages = [];
		this.clients = [];
	}
	add(message){
		this.messages.push(message);
	}
}
