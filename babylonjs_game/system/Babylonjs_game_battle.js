define(["exports", "./Babylonjs_game_module"], function (exports, _Babylonjs_game_module) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Babylonjs_game_battle = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Babylonjs_game_battle = exports.Babylonjs_game_battle = function (_Babylonjs_game_modul) {
		_inherits(Babylonjs_game_battle, _Babylonjs_game_modul);

		function Babylonjs_game_battle(args) {
			_classCallCheck(this, Babylonjs_game_battle);

			return _possibleConstructorReturn(this, (Babylonjs_game_battle.__proto__ || Object.getPrototypeOf(Babylonjs_game_battle)).call(this, args));
		}

		_createClass(Babylonjs_game_battle, [{
			key: "createbattle_prototype",
			value: function createbattle_prototype() {
				var self = this;
				var player = new RPGStatus({ name: "player", health: 10 });
				//console.log(this.assetsManager);

				var model = this.getmesh("CubeBody");
				//console.log(model);
				if (model != null) {
					model.rpgstatus = player;
					console.log(player);
					player.mesh = model;
					player.mesh.isVisible = true;
					player.mesh.position.x = 3;
					player.mesh.position.z = 0;
					player.mesh.position.y = 0;
					player.mesh.rotation.y = Math.PI / 2; //90
					this.create_spaceworld_status(self.scene, player.mesh, player);
				}
				this.parties.push(player);

				var enemy = new RPGStatus({ name: "enemy", health: 1 });
				console.log(enemy);
				var model2 = this.getmesh("CubeBody");
				if (model2 != null) {
					model2.rpgstatus = enemy;
					enemy.mesh = model2;
					model2.isVisible = true;
					model2.position.x = -3;
					model2.position.z = 0;
					model2.position.y = 0;
					model2.rotation.y = Math.PI / 2 * -1; //-90
					this.create_spaceworld_status(this.scene, model2, enemy);
				}
				this.enemies.push(enemy);

				player.targets.push(enemy);
				enemy.targets.push(player);

				this.turns.push(player);
				this.turns.push(enemy);

				//this.scenename = "sceneassets";
				//this.scenes['sceneassets'];
			}
		}, {
			key: "actionbattle",
			value: function actionbattle() {
				console.log("action battle ...");
				console.log(this.parties[0]);
				//check if party health is not zero for attack
				//this.opponentAttack(this.parties[0],this.enemies[0]);
				//this.opponentAttack(this.enemies[0],this.parties[0]);
				this.checkcharacter_turns();
			}
		}, {
			key: "opponentAttack",
			value: function opponentAttack(_Attack, _defender) {
				console.log("opponentAttack ...");
				if (_Attack.health > 0) {
					_defender.health = _defender.health - _Attack.attack;
				}
				if (_defender.health <= 0) {
					_defender.health = 0;
				}
			}
		}, {
			key: "setupbattle",
			value: function setupbattle() {
				console.log("set up");
			}
		}, {
			key: "createbattle",
			value: function createbattle() {
				console.log("create battle");
			}
		}, {
			key: "openitem",
			value: function openitem() {
				console.log("open item ...");
				console.log(this.parties[0]);
			}
		}, {
			key: "openskills",
			value: function openskills() {
				console.log("open skills ...");
				console.log(this.parties[0]);
			}
		}, {
			key: "actionattack",
			value: function actionattack() {
				//var self = this;
				//console.log("action player attack ...");
				//console.log(  this.parties[0].mesh.uniqueId   );
				//self.scene.beginAnimation(this.parties[0].mesh.skeleton, 0, 10, false, 0.5); //works /// works
				//this.opponentAttack(this.parties[0],this.enemies[0]);
				//this.opponentAttack(this.enemies[0],this.parties[0]);
				//this.checkcharacter_turns();
			}
		}, {
			key: "actionenemyattack",
			value: function actionenemyattack() {
				var _this2 = this;

				var self = this;
				console.log("action enemy attack ...");
				self.scene.beginAnimation(this.enemies[0].mesh.skeleton, 0, 10, false, 0.5, function () {
					console.log("finish attack");
					self.opponentAttack(_this2.enemies[0], _this2.parties[0]);
					self.enemies[0].isturnfinish = true;

					self.scene.beginAnimation(_this2.parties[0].mesh.skeleton, 30, 40, false, 0.5, function () {
						self.checkcharacters_battle();
					});
				}); //works
				//this.opponentAttack(this.parties[0],this.enemies[0]);
			}
		}, {
			key: "actionmove",
			value: function actionmove() {
				console.log("action move ...");
				//console.log(this.parties[0]);
			}
		}, {
			key: "actionescape",
			value: function actionescape() {
				console.log("action escape ...");
				//console.log(this.parties[0]);
			}
		}, {
			key: "playattackaction",
			value: function playattackaction() {
				console.log("player attack action");
			}
		}, {
			key: "characteraction_turn",
			value: function characteraction_turn(currentcharacter) {
				var self = this;
				console.log("action enemy attack ...");
				//attack
				if (currentcharacter.health <= 0) {
					currentcharacter.isturnfinish = true;
					self.checkcharacters_battle();
				} else {
					if (currentcharacter.targets[0].health <= 0) {
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
					} else {
						self.scene.beginAnimation(currentcharacter.mesh.skeleton, 0, 10, false, 0.5, function () {
							console.log("finish attack");
							self.opponentAttack(currentcharacter, currentcharacter.targets[0]);
							currentcharacter.isturnfinish = true;
							//being hit
							self.scene.beginAnimation(currentcharacter.targets[0].mesh.skeleton, 30, 40, false, 0.5, function () {
								self.checkcharacters_battle();
							});
						}); //works
					}
				}
			}
		}, {
			key: "checkcharacter_turns",
			value: function checkcharacter_turns() {
				for (var i = 0; i < this.turns.length; i++) {
					if (this.turns[i].isturnfinish == false) {
						console.log("start current turn character");
						console.log(this.turns[i].name);
						this.characteraction_turn(this.turns[i]);
						break;
					}
				}
			}
		}, {
			key: "checkcharacters_battle",
			value: function checkcharacters_battle() {
				console.log("checking...");
				var count = 0;
				var bfinishturns = false;

				for (var i = 0; i < this.turns.length; i++) {
					console.log(this.turns[i].name + ":" + this.turns[i].isturnfinish);
					if (this.turns[i].isturnfinish == true) {
						count += 1;
					}
				}

				if (count == this.turns.length) {
					bfinishturns = true;
				}
				//console.log(count + ":" + this.turns.length);

				console.log("bfinishturns:" + bfinishturns);
				if (bfinishturns) {
					console.log("done!");
					this.battle_turnreset();
				} else {
					console.log("next action attack for character!");
					this.checkcharacter_turns();
				}
				bfinishturns = null;
				count = null;
			}
		}, {
			key: "battle_turnreset",
			value: function battle_turnreset() {
				for (var pi = 0; pi < this.parties.length; pi++) {
					if (this.parties[pi].isturnfinish == true) {
						this.parties[pi].isturnfinish = false;
					}
				}

				for (var pi = 0; pi < this.enemies.length; pi++) {
					if (this.enemies[pi].isturnfinish == true) {
						this.enemies[pi].isturnfinish = false;
					}
				}
			}
		}]);

		return Babylonjs_game_battle;
	}(_Babylonjs_game_module.Babylonjs_game_module);
});