/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_editor extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    updateselectobject(){
        var self = this;
        if(self.selectobject !=null){
            if(self.selectobject_text_id !=null){
                self.selectobject_text_id.text = self.selectobject.id;
            }
            //===
            if(self.selectobject_text_px !=null){
                self.selectobject_text_px.text = self.selectobject.position.x.toString();
                //console.log("found x",self.selectobject.position.x);
            }
            if(self.selectobject_text_py !=null){
                self.selectobject_text_py.text = self.selectobject.position.y.toString();
            }
            if(self.selectobject_text_pz !=null){
                self.selectobject_text_pz.text = self.selectobject.position.z.toString();
            }
            //===
            if(self.selectobject_text_rx !=null){
                self.selectobject_text_rx.text = self.selectobject.rotation.x.toString();
            }
            if(self.selectobject_text_ry !=null){
                self.selectobject_text_ry.text = self.selectobject.rotation.y.toString();
            }
            if(self.selectobject_text_rz !=null){
                self.selectobject_text_rz.text = self.selectobject.rotation.z.toString();
            }
            //===
            if(self.selectobject_text_sx !=null){
                self.selectobject_text_sx.text = self.selectobject.scaling.x.toString();
            }
            if(self.selectobject_text_sy !=null){
                self.selectobject_text_sy.text = self.selectobject.scaling.y.toString();
            }
            if(self.selectobject_text_sz !=null){
                self.selectobject_text_sz.text = self.selectobject.scaling.z.toString();
            }
        }
    }
}
