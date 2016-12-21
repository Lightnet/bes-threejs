/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_load extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    loadmap_requestXML(){
        console.log("init map json load...");
        var self = this;
        var req  = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1/prototype.json');
        req.onreadystatechange = function() {
            //alert(req.responseText);
            //console.log(req.responseText);
            if (req.readyState == 4) {
                if(req.status == 200){
                    //alert(req.responseText);
                    //console.log(req.responseText);
                    self.prase_mapjson(req.responseText);
                    //console.log("done loading?");
                }
            }else{
                //alert("Error loading page\n");
                //console.log("Error loading page\n");
            }
        }
        req.send();
    }

    
}
