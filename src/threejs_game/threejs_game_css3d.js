/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

export class Threejs_game_css3d extends Threejs_game_module{

    constructor(args){
        super(args);
    }

    createinterface(){
        var html = '<div method="click">Click Me</div>';
        var methods = {
            click: function (elem) {
                console.log('element clicked!', elem);
            }
        };
        var options = {
            throttle: 250,          // throttle for the renderer in milliseconds, can be disabled with false (default 250ms)
            observe: true,         // watches the element for changes and re-renders (default true)
            alwaysOnTop: false,    // ensures the UI is always on top of everything in the scene (default false)
            debug: false           // places a small sphere at the click point (default false)
        };
        var ui = new THREE.Interface(html, methods, options);
        this.scene.add(ui);
    }

}
