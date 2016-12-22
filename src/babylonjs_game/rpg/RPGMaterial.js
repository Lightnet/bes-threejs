/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {ObjectRPGID} from './ObjectRPGID';

export class RPGMaterial extends ObjectRPGID{

    static getClass() {
      return 'RPGMaterial';
    }

    constructor(args){
		super(args);
        this.objtype = "material";
        this.nameClass = "RPGMaterial";
    }
}
