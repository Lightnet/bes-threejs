/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_framework_module} from './babylonjs_framework_module';

export class Babylonjs_framework_gui extends Babylonjs_framework_module{

    constructor(args){
        super(args);
    }

    create_hud(){
		//http://doc.babylonjs.com/tutorials/Using_the_Canvas2D
		//http://doc.babylonjs.com/overviews/Canvas2D_Home
		console.log("init hud");
		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
		    size: new BABYLON.Size(300, 100),
		    backgroundFill: "#4040408F",
		    //backgroundRoundRadius: 50,
		    children: [
		        new BABYLON.Text2D("Hello World!", {
		            id: "text",
		            marginAlignment: "h: center, v:center",
		            fontName: "20pt Arial",
		        })
		    ]
		});
	}

    
}
