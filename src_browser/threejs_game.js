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

class Threejs_game extends Threejsbes6 {
	constructor(settings){
		super(settings);
	}

	init(){
		super.init();
		console.log("Threejs_game?");
		this.setup_webgl_basics();
		this.setup_hud_draw();
	}
}
