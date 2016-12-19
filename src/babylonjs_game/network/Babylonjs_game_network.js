/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_network extends Babylonjs_game_module{

    constructor(args){
        super(args);
        //var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        //var propertyNames = Object.getOwnPropertyNames(this);
        //propertyNames.forEach(function(key) {
            //console.log(key);
            //if(key != constructor){
                //var desc = Object.getOwnPropertyDescriptor(this, key);
                //console.log(desc);
                //Object.defineProperty(clone, key, desc);
            //}
        //});
        /*
        for(var fun in propertyNames){
            //console.log(fun);
            //console.log(propertyNames[fun]);
            if(propertyNames[fun] != "constructor"){
                args[propertyNames[fun]] = this[propertyNames[fun]];
            }else{
                //console.log('ignore ' + propertyNames[fun] );
            }
        }
        */
    }

    setup_network(){
		var self = this;
		this.socket = io();
		this.socket.on('connect', function () {
		    console.log('server connected');
			if(this.reload){
				location.reload();
			}
		});

		this.socket.on('disconnect', function () {
		    console.log('server disconnected');
			this.reload = true;
		});
	}

}
