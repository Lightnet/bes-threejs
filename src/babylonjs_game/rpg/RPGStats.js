/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class RPGStats{

	static getClass() {
      return 'RPGStats';
    }

	constructor(args){

		this.nameClass = "RPGStats";

		this.str = 0;
		this.vit = 0;
		this.dex = 0;
		this.agi = 0;
		this.int = 0;

		this.wisdom = 0;
		this.charisma  = 0;
		this.luck = 0;

		this.perception = 0;
	}

}
