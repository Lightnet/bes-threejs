
export class Babylonjs_framework_scene{

    constructor(self){
        if(self != null){
            self.CreateScene = this.CreateScene;
        }
    }

    CreateScene(){
        console.log("CreateScene");
    }
}
