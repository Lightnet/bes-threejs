/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Babylonjs_framework_scene{

    constructor(self){

        if(self != null){
            self.CreateScene = this.CreateScene;
        }
    }

    CreateScene(){
        console.log("CreateScene");
    }
}