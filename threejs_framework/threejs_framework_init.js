/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Threejs_framework_init{

    constructor(args){
        if(!args){
            args = {};
            //console.log("no args...");
        }

        var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for(var fun in propertyNames){
            //console.log(fun);
            //console.log(propertyNames[fun]);
            if(propertyNames[fun] != "constructor"){
                args[propertyNames[fun]] = this[propertyNames[fun]];
            }else{
                //console.log('ignore ' + propertyNames[fun] );
            }
        }
    }

}
