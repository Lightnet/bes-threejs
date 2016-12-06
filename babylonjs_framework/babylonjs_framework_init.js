import {Babylonjs_framework_scene} from './babylonjs_framework_scene';
import {Babylonjs_framework_gui} from './babylonjs_framework_gui';

export class Babylonjs_framework_init{

    constructor(args){
        console.log("init framework... ");
        if(args == null){
            args = {};
        }
        new Babylonjs_framework_scene(this);
        new Babylonjs_framework_gui(this);
    }
}
