/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {ObjectRPGID} from './ObjectRPGID';

class RPGStatus extends ObjectRPGID{
	constructor(args){
		super(args);
		this.stats= new RPGStats();

		this.health = 5;
		this.maxhealth = 5;

		this.magic = 0;
		this.magicmax = 0;

		this.stamina = 100;
		this.maxstamina = 100;

		this.psyche = 100;
		this.maxpsyche = 100;

		this.conditions = [];
		this.skills = [];
		this.inventory = [];
		this.equipments = [];

		this.speed = 1;
		this.criticalhit = 1;

		this.attack = 1;
		this.defense = 0;

		this.magicattack = 0;
		this.magicdefense = 0;

		this.totalattack = 1;
		this.totaldefense = 0;

		this.totalmagicattack = 0;
		this.totalmagicdefense = 0;

		this.queryaction = ""; //attack, skill
		this.target = null;
		this.targets = null;
		this.targettype = "single";//single, multiples, selected, area
		this.readyaction = false;
		this.finishaction = false;

		this.mesh = null;
        this.bphysics = true;
		this.isdead = false;
		this.targets = [];

		//this.isfinishanimation = false;
		//this.isactionfinish = false;
		this.isturnfinish = false;
		this.bskipturn = false;

		if(args !=null){
			if(args['attack'] !=null ){
				this.attack = args['attack'];
			}
			if(args['defense'] !=null ){
				this.defense = args['defense'];
			}

			if(args['health'] !=null){
				this.health = args['health'];
			}
		}
	}
}
