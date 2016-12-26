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

import {RPGCube} from '../rpg/RPGCube';
import {RPGSphere} from '../rpg/RPGSphere';
import {RPGCylinder} from '../rpg/RPGCylinder';

export class Babylonjs_game_loadsave extends Babylonjs_game_module{
    constructor(args){
        super(args);
    }

    //BABYLONJSAPI.SaveSceneMap();

    check_gunsceneobj(uuid,cb){
        //console.log("------------------- start");
        var self = this;
        this.gun.get('scene').value(function(data){

            console.log("check scene?" + Object.keys(data).length);
            var bfound = false;
            var count = 0;
            function checkid(state,id){
                if( ((Object.keys(data).length -1) == count)&&(state == false)&&(bfound == false)){
                    console.log("not found object!");
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
                }
                checkid(false);
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
        console.log(obj);

        if(obj instanceof RPGMesh){
            //console.log("match! RPGMesh");
        }else if(obj instanceof RPGTerrain){
            //console.log("match! RPGTerrain");
        }else if(obj instanceof RPGCube){
            //console.log("match! RPGCube");
        }else if(obj instanceof RPGSphere){
            //console.log("match! RPGSphere");
        }else if(obj instanceof RPGCylinder){
            console.log("match! RPGCylinder");
        }else{
            console.log("Not match getClass!");
            return;
        }

        //console.log("saving object data????");
        this.check_gunsceneobj(obj['uuid'],(bfind,id)=>{
            //console.log("....CALLS");
            var gscene = this.gun.get('scene');

            if(bfind){
                console.log("set object scene[update]");
                if(id !=null){
                    //gscene.path(id).put(JSON.stringify(obj));
                    console.log(id);
                    gscene.path(id).put(obj);
                }
            }else{
                console.log("save object scene[insert]");
                //console.log(obj);
                gscene.set(obj);
            }
            console.log("object save?");
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
                    //console.log("found! RPGTerrain");
                    this.createterrain(obj);
                }

                if(obj.nameClass == RPGMesh.getClass()){
                    //console.log("found! RPGMesh");
                }

                if(obj.nameClass == RPGCube.getClass()){
                    //console.log("found! RPGCube");
                    //console.log(obj);
                    this.parse_object(obj);
                }

                if(obj.nameClass == RPGSphere.getClass()){
                    //console.log("found! RPGSphere");
                    this.parse_object(obj);
                }

                if(obj.nameClass == RPGCylinder.getClass()){
                    //console.log("found! RPGCylinder");
                    this.parse_object(obj);
                }

            }
        }else{
            console.log("update object scene?");

        }
    }


    //BABYLONJSAPI.LoadSceneMap();
    LoadSceneMap(){
        console.log("LOAD SCENE MAP");
        //this.gun.get('scene');
        var self = this;
        this.gun.get('scene').valueobj(function(data){
            for(var o in data){
                console.log(data[o]);
                if(data[o] !=null){
                    self.prase_gobject(data[o]);
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
