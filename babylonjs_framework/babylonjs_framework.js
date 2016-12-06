/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Babylonjs_framework{

    constructor(self){

        if(self != null){
            self.init = this.init;
            self.setup = this.setup;
            self.setup_user = this.setup_user;
        }
    }

    init(){
        console.log("testing...");
    }

    setup(){
        console.log("setup..");
    }

	setup_user(){
        console.log("setup user..");
	}

}
