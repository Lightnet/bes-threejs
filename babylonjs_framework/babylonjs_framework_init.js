/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Babylonjs_framework} from './babylonjs_framework';
import {Babylonjs_framework_scene} from './babylonjs_framework_scene';
import {Babylonjs_framework_gui} from './babylonjs_framework_gui';

export class Babylonjs_framework_init{

    constructor(args){
        console.log("init framework... ");
        if(args == null){
            args = {};
        }
        new Babylonjs_framework(this);
        new Babylonjs_framework_scene(this);
        new Babylonjs_framework_gui(this);
    }

}
