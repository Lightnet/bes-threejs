/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from './Babylonjs_game_module';

export class Babylonjs_game_battle extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    createbattle_prototype(){
		var self = this;
		var player = new RPGStatus({name:"player",health:10});
		//console.log(this.assetsManager);

		var model = this.getmesh("CubeBody");
		//console.log(model);
		if(model !=null){
			model.rpgstatus = player;
			console.log(player);
			player.mesh = model;
			player.mesh.isVisible = true;
			player.mesh.position.x = 3;
			player.mesh.position.z = 0;
			player.mesh.position.y = 0;
			player.mesh.rotation.y = Math.PI/2; //90
			this.create_spaceworld_status(self.scene, player.mesh, player);
		}
		this.parties.push(player);

		var enemy = new RPGStatus({name:"enemy",health:1});
		console.log(enemy);
		var model2 = this.getmesh("CubeBody");
		if(model2 !=null){
			model2.rpgstatus = enemy;
			enemy.mesh = model2;
			model2.isVisible = true;
			model2.position.x = -3;
			model2.position.z = 0;
			model2.position.y = 0;
			model2.rotation.y = Math.PI/2 * -1; //-90
			this.create_spaceworld_status(this.scene,model2,enemy);
		}
		this.enemies.push(enemy);

		player.targets.push(enemy);
		enemy.targets.push(player);

		this.turns.push(player);
		this.turns.push(enemy);

		//this.scenename = "sceneassets";
		//this.scenes['sceneassets'];
	}

    actionbattle(){
		console.log("action battle ...");
		console.log(this.parties[0]);
		//check if party health is not zero for attack
		//this.opponentAttack(this.parties[0],this.enemies[0]);
		//this.opponentAttack(this.enemies[0],this.parties[0]);
		this.checkcharacter_turns();
	}

	opponentAttack(_Attack,_defender){
		console.log("opponentAttack ...");
		if(_Attack.health > 0){
			_defender.health = _defender.health - _Attack.attack;
		}
		if(_defender.health <= 0){
		 	_defender.health = 0;
		}
	}

	setupbattle(){
        console.log("set up");
	}

	createbattle(){
        console.log("create battle");
	}

	openitem(){
		console.log("open item ...");
		console.log(this.parties[0]);
	}

	openskills(){
		console.log("open skills ...");
		console.log(this.parties[0]);
	}

	actionattack(){
		//var self = this;
		//console.log("action player attack ...");
		//console.log(  this.parties[0].mesh.uniqueId   );
		//self.scene.beginAnimation(this.parties[0].mesh.skeleton, 0, 10, false, 0.5); //works /// works
		//this.opponentAttack(this.parties[0],this.enemies[0]);
		//this.opponentAttack(this.enemies[0],this.parties[0]);
		//this.checkcharacter_turns();
	}

	actionenemyattack(){
		var self = this;
		console.log("action enemy attack ...");
		self.scene.beginAnimation(this.enemies[0].mesh.skeleton, 0, 10, false, 0.5,()=>{
			console.log("finish attack");
			self.opponentAttack(this.enemies[0],this.parties[0]);
			self.enemies[0].isturnfinish = true;

			self.scene.beginAnimation(this.parties[0].mesh.skeleton, 30, 40, false, 0.5,()=>{
				self.checkcharacters_battle();
			});

		}); //works
		//this.opponentAttack(this.parties[0],this.enemies[0]);

	}

	actionmove(){
		console.log("action move ...");
		//console.log(this.parties[0]);
	}

	actionescape(){
		console.log("action escape ...");
		//console.log(this.parties[0]);
	}

	playattackaction(){
        console.log("player attack action");
	}

	characteraction_turn(currentcharacter){
		var self = this;
		console.log("action enemy attack ...");
		//attack
		if(currentcharacter.health <= 0){
			currentcharacter.isturnfinish = true;
			self.checkcharacters_battle();
		}else{
			if(currentcharacter.targets[0].health <= 0){
				//console.log("DEFENCE FALSE???");
				//make sure the target is skip if health is zero
				currentcharacter.isturnfinish = true;
				currentcharacter.targets[0].isturnfinish = true;
				console.log(currentcharacter.targets[0]);
				//for(var i = 0; i < this.turns.length;i++){
					//if(this.turns[i] == currentcharacter.targets[0]){
						//this.turns[i].isturnfinish = true;
						//break;
					//}
				//}
				self.checkcharacters_battle();
			}else{
				self.scene.beginAnimation(currentcharacter.mesh.skeleton, 0, 10, false, 0.5,()=>{
					console.log("finish attack");
					self.opponentAttack(currentcharacter,currentcharacter.targets[0]);
					currentcharacter.isturnfinish = true;
					//being hit
					self.scene.beginAnimation(currentcharacter.targets[0].mesh.skeleton, 30, 40, false, 0.5,()=>{
						self.checkcharacters_battle();
					});

				}); //works
			}
		}
	}

	checkcharacter_turns(){
		for(var i = 0; i < this.turns.length; i++){
			if( this.turns[i].isturnfinish == false){
				console.log("start current turn character");
				console.log(this.turns[i].name);
				this.characteraction_turn(this.turns[i]);
				break;
			}
		}
	}

	checkcharacters_battle(){
		console.log("checking...");
		var count = 0;
		var bfinishturns = false;

		for(var i = 0; i < this.turns.length; i++){
			console.log(this.turns[i].name + ":" + this.turns[i].isturnfinish);
			if( this.turns[i].isturnfinish == true){
				count += 1;
			}
		}

		if(count == this.turns.length){
			bfinishturns = true;
		}
		//console.log(count + ":" + this.turns.length);

		console.log("bfinishturns:" + bfinishturns);
		if(bfinishturns){
			console.log("done!");
			this.battle_turnreset();
		}else{
			console.log("next action attack for character!");
			this.checkcharacter_turns();
		}
		bfinishturns= null;
		count = null;
	}

	battle_turnreset(){
		for(var pi = 0; pi < this.parties.length; pi++){
			if(this.parties[pi].isturnfinish == true){
				this.parties[pi].isturnfinish = false;
			}
		}

		for(var pi = 0; pi < this.enemies.length; pi++){
			if(this.enemies[pi].isturnfinish == true){
				this.enemies[pi].isturnfinish = false;
			}
		}
	}


}
