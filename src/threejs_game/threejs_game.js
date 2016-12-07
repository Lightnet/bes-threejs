/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_framework} from '../threejs_framework/threejs_framework';

export class Threejs_game extends Threejs_framework{
    constructor(args){
        super(args);
        if(!args){
            args = {};
        }
        //console.log("init Threejs_framework...");
    }
}
