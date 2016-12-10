/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_framework_module} from './threejs_framework_module';

export class Threejs_framework_hud extends Threejs_framework_module{

    constructor(args){
        super(args);
    }


    //works mesh over lap scenes
	setup_hud(){
        console.log("setup_hud");
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
	}

}
