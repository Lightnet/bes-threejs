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
export class Babylonjs_game_gundb extends Babylonjs_game_module{
    constructor(args){
        super(args);
    }
    //BABYLONJSAPI.SaveSceneMap();

    init_gundb(){

        Gun.chain.live = function(cb, opt){
          return this.on(function(val, field){
            delete val._;
            cb.call(this, val, field);
          }, opt);
        }

        Gun.chain.value = function(cb, opt){
          return this.val(function(val, field){
            delete val._;
            cb.call(this, val, field);
          }, opt);
        }

        Gun.chain.each = function () {
          var each = this.map();
          return this.val.apply(each, arguments)
        }

        function gunObjDataAssign(self,data){
            for(var i in data){
                if(typeof data[i] === 'object'){
                    if(data[i] !=null){
                        var id = data[i]['#'];
                        data[i] = {}; //clear id hash
                        self.get(id).val((objdata)=>{
                            delete objdata._;
                            data[i] = objdata;
                            gunObjDataAssign(self,objdata);
                        });
                    }
                }
            }
        }

        Gun.chain.valueobj = function (cb, opt) {
          return this.val(function (val, field) {
              if(val !=null){
                  delete val._;
              }
              gunObjDataAssign(this,val);
              cb.call(this, val, field);
          }, opt);
        };

        Gun.chain.liveobj = function (cb, opt) {
          return this.on(function (val, field) {
            delete val._;
            gunObjDataAssign(this,val);
            cb.call(this, val, field);
          }, opt);
        };

        Gun.chain.eachobj = function () {
          var each = this.map();
          return this.valueobj.apply(each, arguments);
        };
        //http://stackoverflow.com/questions/7667958/clear-localstorage
        localStorage.clear();

        this.peers = ['http://127.0.0.1/gun'];
        //this.peers = ['https://hgdb.herokuapp.com/gun'];
        this.gun = Gun(this.peers);
        //var gun = this.gun;
        //gun.get('greetings').each(function (example) {
          //console.log(example)
        //});
    }

}
