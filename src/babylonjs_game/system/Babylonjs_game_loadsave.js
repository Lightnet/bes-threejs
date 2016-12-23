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
        //console.log("------------------- start");
        var self = this;
        this.gun.get('scene').value(function(data){
            var bfound = false;
            var count = 0;
            function checkid(state,id){
                if( ((Object.keys(data).length -1)  == count)&&(state == false)&&(bfound == false)){
                    //console.log("not found checks");
                    cb(false);
                }
            }
            for(var o in data){
                if(data[o] !=null){
                    if(data[o]['#'] !=null){
                        //console.log(data[o]['#']);
                        self.gun.get(data[o]['#']).value(function(objdata){
                            //console.log(objdata);
                            if(objdata['uuid'] !=null){
                                if(objdata['uuid'] == uuid){
                                    //return cb(true, data[o]['#']);
                                    bfound = true;
                                    //console.log("found!");
                                    //return checkid(true,data[o]['#']);
                                    return cb(true, data[o]['#']);
                                }
                            }
                        });
                    }
                    checkid(false);
                }
                count++;
            }
            //return cb(bfound);
            //console.log("END GUN CHECK...");
            //console.log(data[1]);
        });
        //return cb(false);
        //console.log("------------------- end");
    }

    //BABYLONJSAPI.SaveSceneMap();
    SaveObject(obj){
        //console.log(typeof obj);
        //console.log(obj , ":" ,RPGTerrain);
        //console.log(obj);

        if(obj instanceof RPGMesh){
            console.log("match!RPGMesh");
        }else if(obj instanceof RPGTerrain){
            console.log("match!RPGTerrain");
        }else{
            console.log("not match!");
        }
        //console.log("saving object data????");
        this.check_gunsceneobj(obj['uuid'],(bfind,id)=>{
            //console.log("....CALLS");
            var gscene = this.gun.get('scene');

            if(bfind){
                console.log("set object scene[update]");
                if(id !=null){
                    gscene.path(id).put(obj);
                }
            }else{
                console.log("save object scene[insert]");
                //console.log(obj);
                gscene.set(obj);
            }
            //console.log("finish save???");
        });
    }

    SaveCharacter(args){

    }


    //BABYLONJSAPI.SaveSceneMap();
    SaveSceneMap(){
        //console.log(this.scene.meshes);
        for(var i = 0; i < this.scene.meshes.length;i++){
            if(this.scene.meshes[i].rpgobj !=null){
                console.log("found! rpgobj");
                //console.log(this.scene.meshes[i].rpgobj);
                this.SaveObject(this.scene.meshes[i].rpgobj);
            }
            if(this.scene.meshes[i].status !=null){
                console.log("found! status");
                this.SaveCharacter(this.scene.meshes[i].status);
            }
        }
    }

    prase_gobject(obj){
        //this.scene.meshes
        var bfound = false;
        for(var i = 0; i < this.scene.meshes.length;i++){
            if(this.scene.meshes[i].rpgobj !=null){
                if(this.scene.meshes[i].rpgobj.uuid == obj['uuid']){
                    bfound = true;
                    break;
                }
            }
        }
        if(bfound == false){
            //console.log(obj);
            if(obj.nameClass !=null){
                if(obj.nameClass == RPGTerrain.getClass()){
                    console.log("found! RPGTerrain");
                    this.createterrain(obj);
                }

                if(obj.nameClass == RPGMesh.getClass()){
                    console.log("found! RPGMesh");
                }
            }
        }else{
            console.log("update object scene?");

        }
    }


    //BABYLONJSAPI.LoadSceneMap();
    LoadSceneMap(){
        //console.log(RPGTerrain.getClass());
        //this.gun.get('scene');
        var self = this;
        this.gun.get('scene').value(function(data){
            for(var o in data){
                //console.log(data[o]);
                if(data[o] !=null){
                    if(data[o]['#'] != null){
                        console.log(data[o]['#']);
                        self.gun.get(data[o]['#']).value(function(data){
                            self.prase_gobject(data);
                            //console.log(data);
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
        this.gun.get('scene').each(function (data) {
          console.log(data);
          //if(data)
        });

        var gscene = this.gun.get('scene');
        //gscene.get('EK3GlvzlK1Pi0Sg2hhhdZC5H').put(null);
    }

    ClearSceneMap(){
        console.log("clear scene...");
        for(var i = 0; i < this.scene.meshes.length;i++){
            if(this.scene.meshes[i].rpgobj !=null){
                console.log(this.scene.meshes[i].dispose());
            }
        }
    }
}
