/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {ObjectRPGID} from './ObjectRPGID';

export class RPGCondition extends ObjectRPGID{

	static getClass() {
      return 'RPGCondition';
    }

	constructor(args){
		super();
		this.params = [];
		this.objtype = "condition";
		this.nameClass = "RPGCondition";
	}
}
