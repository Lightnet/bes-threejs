/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_framework_module} from './threejs_framework_module';

export class Threejs_framework_script extends Threejs_framework_module{

    constructor(args){
        super(args);
    }

    //===============================================
    // scripts components
    //===============================================
	clearScripts() {
		var myNode = document.getElementById('scriptcomponents');
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}

	addScript(filename) {
        var head = document.getElementById('scriptcomponents');
        var escript = document.createElement('script');
        escript.src = filename;
        escript.type = "text/javascript";
        head.appendChild(escript);
    }

	createscript(scriptname, args) {
		console.log('loaded script component name: ' + scriptname);
		this.scriptcomponents[scriptname] = args;
    }

	createComponent(object, name) {
		var capp;
		for (var sc in this.scriptcomponents) {
			if (name == sc) {
				capp = this.scriptcomponents[sc];
				//console.log('found!');
				break;
			}
		}
		if (capp != null) {
			var sapp = capp(this);
			object.script[name] = new sapp(object);
			capp = null;
			sapp = null;
		}
	}

}
