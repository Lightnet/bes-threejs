/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Threejs_framework} from '../threejs_framework/threejs_framework';


import {Threejs_game_css3d} from './threejs_game_css3d';
import {Threejs_game_terrain} from './threejs_game_terrain';
import {Threejs_game_scene} from './threejs_game_scene';
import {Threejs_game_hud} from './threejs_game_hud';


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
        console.log("init Threejs_game...");
        if(!args){
            args = {};
        }
        new Threejs_game_css3d(this);
        new Threejs_game_terrain(this);
        new Threejs_game_scene(this);
        new Threejs_game_hud(this);

    }

    init(){
        super.init();
        this.setup();
    }

    update(){
        super.update();
        //console.log("update?");
        if(this.controlOrbit !=null){
            this.controlOrbit.update();
            //console.log("update??");
        }
    }

    setup(){
        this.bablephysics = true;
        this.initPhysics();
        this.camera.position.set(0,100,50);

        this.controlOrbit = new THREE.OrbitControls( this.camera );

        this.hideloadingscreen();
        //console.log(window.width);
        //console.log(screen.width);
        console.log("setup");
        //this.createBaseHUD();

        //this.createbasescene();
        this.create_terrain03();
        //this.createinterface();
    }


}
