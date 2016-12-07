/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Threejs_framework_network{

    constructor(args){
        if(!args){
            args = {};
            //console.log("no args...");
        }
        this.next = 0;
        //args.setup_network = this.setup_network;
        //console.log(Object.getOwnPropertyNames(this));
        //console.log(this.__proto__);
        //for(var _obj in this){
            //console.log(this[_obj]);
        //}
        //console.log(Object.getPrototypeOf(this));

        var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        //console.log(propertyNames);
        for(var fun in propertyNames){
            //console.log(fun);
            //console.log(propertyNames[fun]);
            if(propertyNames[fun] != "constructor"){
                args[propertyNames[fun]] = this[propertyNames[fun]];
            }else{
                //console.log('ignore ' + propertyNames[fun] );
            }
        }
        //var self = this;
        //var propertyNames = Object.getOwnPropertyNames(self.prototype);
        //console.log(propertyNames);

        //var funs = getAllFuncs(this);
        ///console.log(funs);

        return this;
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
