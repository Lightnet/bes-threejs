/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_framework_module} from './threejs_framework_module';

export class Threejs_framework_network extends Threejs_framework_module{

    constructor(args){
        super(args);
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
