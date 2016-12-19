/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_hud_battle extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    create2D_BattleHUD(){
		var self = this;
		//button
        this.AddButton(this.screencanvas,{id:'button_escape',text:'Escape',x:10,y:(22*0+10)}, ()=>{self.actionescape();});
		this.AddButton(this.screencanvas,{id:'button_item',text:'Items',x:10,y:(22*1+10)}, ()=>{self.openitem();});
		this.AddButton(this.screencanvas,{id:'button_skills',text:'Skills',x:10,y:(22*2+10)}, ()=>{self.openskills();});
		this.AddButton(this.screencanvas,{id:'button_move',text:'Move',x:10,y:(22*3+10)}, ()=>{self.openitem();});
		this.AddButton(this.screencanvas,{id:'button_attack',text:'Attack',x:10,y:(22*4+10)}, ()=>{self.actionattack();});
		this.AddButton(this.screencanvas,{id:'button_attack',text:'Enemy Attack',x:150,y:(22*4+10)}, ()=>{self.actionenemyattack();});
		this.AddButton(this.screencanvas,{id:'button_battle',text:'Battle',x:10,y:(22*5+10)}, ()=>{self.actionbattle();});
	}

}
