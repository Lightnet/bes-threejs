/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Threejs_framework_loadingscreen{

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

    initloadingscreen(){
		var styleloadingscreen = document.createElement("style");
		styleloadingscreen.innerHTML = '';
		styleloadingscreen.innerHTML += '.loader {border: 16px solid #f3f3f3;border-top: 16px solid #3498db;border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;}';
		styleloadingscreen.innerHTML += '\n@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg);}}';
		styleloadingscreen.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(styleloadingscreen);

		var divloadingscreen = document.createElement("div");
		divloadingscreen.id = "loadingscreen";
		divloadingscreen.style['background-color'] = '#dddddd';
		divloadingscreen.style.position = 'absolute';
		divloadingscreen.style.top = 0;
		divloadingscreen.style.left = 0;
		divloadingscreen.style.width = '100%';
		divloadingscreen.style.height = '100%';
		divloadingscreen.innerHTML = "<div style='background-color: #dddddd;position: absolute;left: 0;height: 50%;width: 100%;top: 50%;'><center><div class='loader'></div></center> <center id='loadingscreentext'>Loading...</center></div>"
		document.getElementsByTagName('body')[0].appendChild(divloadingscreen);
	}

	loadingscreentext(_TEXT="loading......"){
		document.getElementById('loadingscreentext').innerHTML = _TEXT;
	}

	showloadingscreen(){
		document.getElementById('loadingscreen').style.display = 'block';
	}

	hideloadingscreen(){
		document.getElementById('loadingscreen').style.display = 'none';
	}

}
