/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './Babylonjs_game_module';


import {RPGTerrain} from '../rpg/RPGTerrain';
import {RPGMesh} from '../rpg/RPGMesh';


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

    check_gunsceneobj(uuid,cb){
        var self = this;
        this.gun.get('scene').value(function(data){
            for(var o in data){
                if(data[o] !=null){
                    if(data[o]['#'] !=null){
                        console.log(data[o]['#']);
                        self.gun.get(data[o]['#']).value(function(data){
                            console.log(data);
                            if(data['uuid'] !=null){
                                if(data['uuid'] == uuid){
                                    return cb(false);
                                }
                            }
                        });
                    }
                }
            }
            return cb(false);
            //console.log(data[1]);
        });
        return cb(false);
    }

    //BABYLONJSAPI.SaveSceneMap();
    SaveObject(args){
        //console.log(typeof args);
        //console.log(args , ":" ,RPGTerrain);
        if(args instanceof RPGMesh){
            console.log("match!RPGMesh");
        }else if(args instanceof RPGTerrain){
            console.log("match!RPGTerrain");
        }else{
            console.log("not match!");
        }

        console.log("...");

        //console.log("saving object data????");
        this.check_gunsceneobj(args['uuid'],(bfind)=>{

            if(bfind){
                console.log("set object scene");
                var gscene = this.gun.get('scene');
                //gscene.put(args);
            }else{
                console.log("save object scene");
                var gscene = this.gun.get('scene');
                //console.log(args);
                gscene.set(args);
            }
            //console.log("finish save???");
        });
    }

    SaveCharacter(args){

    }


    //BABYLONJSAPI.SaveSceneMap();
    SaveSceneMap(){
        console.log(this.scene.meshes);
        for(var i = 0; i < this.scene.meshes.length;i++){
            if(this.scene.meshes[i].rpgobj !=null){
                console.log("found! rpgobj");
                console.log(this.scene.meshes[i].rpgobj);
                this.SaveObject(this.scene.meshes[i].rpgobj);
            }
            if(this.scene.meshes[i].status !=null){
                console.log("found! status");
                this.SaveCharacter(this.scene.meshes[i].status);
            }
        }
    }


    //BABYLONJSAPI.LoadSceneMap();
    LoadSceneMap(){
        //this.gun.get('scene');
        var self = this;
        this.gun.get('scene').value(function(data){
            for(var o in data){
                //console.log(data[o]);
                if(data[o] !=null){
                    if(data[o]['#'] != null){
                        console.log(data[o]['#']);
                        self.gun.get(data[o]['#']).value(function(data){
                            console.log(data);
                            //if(data instanceof RPGMesh){
                                //console.log("match!RPGMesh");
                            //}else if(data instanceof RPGTerrain){
                                //console.log("match!RPGTerrain");
                            //}else{
                                //console.log("not match!");
                            //}
                        });
                    }
                }
            }
        });
    }

    //BABYLONJSAPI.DeleteSceneMap();
    DeleteSceneMap(){
        //this.gun.get('scene').each(function (data) {
          //console.log(data);
          //if(data)
        //});

        //var gscene = this.gun.get('scene');
        //gscene.get('EK3GlvzlK1Pi0Sg2hhhdZC5H').put(null);
        //gscene.get('2OlhVWJKmQy6RwbTlBtA3sjz').put(null);
    }
}
