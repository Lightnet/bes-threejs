/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './babylonjs_game_module';

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

    prase_mapjson(stringdata){
        console.log("init string map");
        var self = this;
		var mappdata = self.mappdata;
		var scriptcount = self.scriptcount;

		var modelfiles = [];
		var modelcount = 0;

		mappdata = JSON.parse( stringdata );
        if(mappdata == null){
            console.log("error!");
            return;
        }
		//console.log(mappdata);
		scriptcount = 0;

        loadentities();

        //load 3d models and texture a
		function loadmodelfiles(){
			console.log("init models loading files");
			if(mappdata.assets !=null){
				console.log("Assets files: "+ mappdata.assets.length);
				//if there no model files
				if(mappdata.assets.length == 0){
					loadscriptfiles();
				}

				for(var i = 0; i < mappdata.assets.length;i++){
					console.log(mappdata.assets[i]);
					if(mappdata.assets[i].type == "model"){
						modelfiles.push(mappdata.assets[i]);
						//modelcount += 1;
					}
				}

				//console.log("model checking...");
				for(var mi = 0; mi < modelfiles.length;mi++){
					//console.log(modelfiles[mi].uuid);
					var _id = modelfiles[mi].uuid;
					var _name = modelfiles[mi].path;
					//console.log('//=========================');
					//console.log(modelfiles[mi].path);
                    /*
					threejsapi.LoadModelFile(modelfiles[mi],(object)=>{
						console.log('//========================================');
						//console.log(object.name);//console.log(object.uuid);
						console.log(object);
						modelcount++;
						console.log("models: "+modelcount + ":" +(modelfiles.length));
						if(modelcount == modelfiles.length){
							//console.log('Finish loading file models!');
							//console.log('init scripts!');
							loadscriptfiles();
						}
					});
                    */
				}
			}
		}

		//load scripts
		function loadscriptfiles(){
			if(mappdata.scripts !=null){
				console.log("init script loading files...");
				console.log("Scripts files: "+ mappdata.scripts.length);
				if(mappdata.scripts.length == 0){
					loadentities();
				}
				for(var i = 0; i < mappdata.scripts.length;i++){
					//threejsapi.addScript(mappdata.scripts[i]);
					loadScript(mappdata.scripts[i], function(){
		    			//initialization code
						scriptcount++;
						//console.log("script: "+scriptcount + ":" + (mappdata.scripts.length));
						if(scriptcount == mappdata.scripts.length){ //make sure the scripts are load else it can't used script components
							//console.log('Finish script components!');
							//console.log('init load entities!');
							loadentities();
						}
					});
				}
			}
		}
		//load entities
		function loadentities(){
			console.log('loading entities?');
			if(mappdata.entities !=null){
				console.log("Entities count:"+ mappdata.entities.length);
				for(var i = 0; i < mappdata.entities.length;i++){
					//threejsapi.parseObject(mappdata.entities[i]);
                    self.parse_object(mappdata.entities[i]);
				}
				console.log('Finish loading!');

				//self.hideloadingscreen();

				//self.loadScript("/assets/test1.js", function(){
					//initialization code
					//console.log("test? js");
				//});
				//console.log(threejsapi);
			}
            self.setup_game();
		}
    }


}
