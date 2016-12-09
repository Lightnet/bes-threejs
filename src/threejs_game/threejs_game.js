/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Threejs_framework} from '../threejs_framework/threejs_framework';

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

//RFC Type 4 (random) schema
var uuid = function() {
    var buf = new Uint32Array(4);
    window.crypto.getRandomValues(buf);
    var idx = -1;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        idx++;
        var r = (buf[idx>>3] >> ((idx%8)*4))&15;
        var v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

export class Threejs_game extends Threejs_framework{
    constructor(args){
        super(args);
        if(!args){
            args = {};
        }
        //console.log("init Threejs_framework...");
    }

    init(){
        super.init();
        this.setup();
    }

    createbasescene(){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
        cube.update =function(){
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;
        };
		this.scene.add( cube );
        this.camera.position.z = 5;
        //console.log(this.scene);
    }

    setup(){
        //console.log(window.width);
        //console.log(screen.width);
        console.log("setup");

        this.createbasescene();


    }
}
