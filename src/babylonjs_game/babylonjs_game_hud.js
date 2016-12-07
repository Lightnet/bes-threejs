/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './babylonjs_game_module';

export class Babylonjs_game_hud extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    createspacecavnas2D(){
        //screenCanvas
		this.screencanvas = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
		    id: "ScreenCanvas",
			enableInteraction: true//,
		});
        //console.log(this.screencanvas);
	}

    create2D_BattleHUD(){
		var self = this;
		//button
		this.AddButton(this.screencanvas,'button_escape','Escape',10,(22*0+10), ()=>{self.actionescape();});
		this.AddButton(this.screencanvas,'button_item','Items',10,(22*1+10), ()=>{self.openitem();});
		this.AddButton(this.screencanvas,'button_skills','Skills',10,(22*2+10), ()=>{self.openskills();});
		this.AddButton(this.screencanvas,'button_move','Move',10,(22*3+10), ()=>{self.openitem();});
		this.AddButton(this.screencanvas,'button_attack','Attack',10,(22*4+10), ()=>{self.actionattack();});

		this.AddButton(this.screencanvas,'button_attack','Enemy Attack',150,(22*4+10), ()=>{self.actionenemyattack();});

		this.AddButton(this.screencanvas,'button_battle','Battle',10,(22*5+10), ()=>{self.actionbattle();});
	}

}
