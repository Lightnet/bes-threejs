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

class Example_threejs_game extends Threejsbes6 {
	constructor(settings){
		super(settings);
		//this.scriptlist.push('/js/...');
	}

	init(){
		super.init();
		console.log("test?");
		this.setup_webgl_basics();
		this.setup_hud_draw();
		this.setup_trackcamera();
	}
}
