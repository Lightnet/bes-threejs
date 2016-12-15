/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

export class Threejs_game_controller extends Threejs_game_module{

    constructor(args){
        super(args);
    }

    create_input(){
        var self = this;

		//this.keys={letft:0,right:0,forward:0,back:0};
		window.addEventListener("keydown", handleKeyDown, false);
		window.addEventListener("keyup", handleKeyUp, false);
		function handleKeyDown(evt){
            //console.log(evt.keyCode);
            //if (evt.keyCode==69){//E
            if (evt.keyCode==70){//E
                if(self.character !=null){
                    //console.log(self.character);
                    if(typeof self.character.interact === 'function'){
                        self.character.interact();
                    }
                }
            }

            if (evt.keyCode==67){//C
                //if(self.character !=null){
                    //console.log(self.character);
                    //if(typeof self.character.interact === 'function'){
                        //self.character.interact();
                    //}
                //}
            }

            if (evt.keyCode==81){//Q
				self.keys.rotate_left=1;
				//console.log("left");
			}
            if (evt.keyCode==69){//E
				self.keys.rotate_right=1;
			}

            if (evt.keyCode==65){//A
				self.keys.left=1;
				//console.log("left");
			}
			if (evt.keyCode==68){//D
                self.keys.right=1;
				//console.log("right");
			}
			if (evt.keyCode==87){//W
				self.keys.forward=1;
				//console.log("up");
			}
			if (evt.keyCode==83){//S
				self.keys.back=1;
				//console.log("down");
			}
		}

		function handleKeyUp(evt){
            if (evt.keyCode==81){//Q
				self.keys.rotate_left=0;
			}
            if (evt.keyCode==69){//E
				self.keys.rotate_right=0;
			}
			if (evt.keyCode==65){
				self.keys.left=0;
			}
			if (evt.keyCode==68){
				self.keys.right=0;
			}
			if (evt.keyCode==87){
				self.keys.forward=0;
			}
			if (evt.keyCode==83){
				self.keys.back=0;
			}
		}
	}
}
