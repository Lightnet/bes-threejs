/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './Babylonjs_game_module';


//RFC Type 4 (random) schema
/*
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
*/
export class Babylonjs_game_loadsave extends Babylonjs_game_module{
    constructor(args){
        super(args);
    }
    //BABYLONJSAPI.SaveSceneMap();
    SaveSceneMap(){
        console.log(this.scene.meshes);
        for(var i = 0; i < this.scene.meshes.length;i++){
            if(this.scene.meshes[i].rpgobj !=null){
                console.log("found! rpgobj");
                console.log(this.scene.meshes[i].rpgobj);
            }
            if(this.scene.meshes[i].status !=null){
                console.log("found! status");
            }
        }

    }

    LoadSceneMap(){

    }
}
