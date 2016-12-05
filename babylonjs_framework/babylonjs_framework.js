//test
import {CreateScene} from 'babylonjs_framework_scene';

class Babylonjs_engine_core{
    constructor(args){
        //super(args);
        this.test = "test";
    }
    init(){
        console.log("testing...");
        CreateScene();
    }
    setup(){
        console.log("setup..");
    }
}
