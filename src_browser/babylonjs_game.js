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

class Babylonjs_game extends Babylonjsbes6 {
	constructor(settings){
		super(settings);
	}

	init(){
		super.init();
		console.log("init babylonjs_game...");
		this.create_hud();


		//init oimo.js physics
		this.init_phsics();

		this.createscene_objects();
		this.createscene_physics();
	}
}
