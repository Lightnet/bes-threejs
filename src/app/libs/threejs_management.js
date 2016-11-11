console.log("threejs m?");

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
