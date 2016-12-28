define(['exports', './ObjectRPGID', './RPGStats'], function (exports, _ObjectRPGID2, _RPGStats) {
		'use strict';

		Object.defineProperty(exports, "__esModule", {
				value: true
		});
		exports.RPGStatus = undefined;

		function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
						throw new TypeError("Cannot call a class as a function");
				}
		}

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

		var RPGStatus = exports.RPGStatus = function (_ObjectRPGID) {
				_inherits(RPGStatus, _ObjectRPGID);

				function RPGStatus(args) {
						_classCallCheck(this, RPGStatus);

						var _this = _possibleConstructorReturn(this, (RPGStatus.__proto__ || Object.getPrototypeOf(RPGStatus)).call(this, args));

						_this.objtype = "status";
						_this.nameClass = "RPGStatus";
						args = args || {};

						_this.stats = new _RPGStats.RPGStats();

						_this.health = args['health'] || 5;
						_this.maxhealth = 5;

						_this.magic = 0;
						_this.magicmax = 0;

						_this.stamina = 100;
						_this.maxstamina = 100;

						_this.psyche = 100;
						_this.maxpsyche = 100;

						_this.conditions = [];
						_this.skills = [];
						_this.inventory = [];
						_this.equipments = [];

						_this.speed = 1;
						_this.criticalhit = 1;

						_this.attack = args['attack'] || 1;
						_this.defense = args['defense'] || 0;

						_this.magicattack = 0;
						_this.magicdefense = 0;

						_this.totalattack = 1;
						_this.totaldefense = 0;

						_this.totalmagicattack = 0;
						_this.totalmagicdefense = 0;

						_this.bshop = false;
						_this.shop = [];

						_this.queryaction = ""; //attack, skill
						_this.target = null;
						_this.targets = null;
						_this.targettype = "single"; //single, multiples, selected, area
						_this.readyaction = false;
						_this.finishaction = false;

						_this.mesh = null;
						_this.bphysics = true;
						_this.isdead = false;
						_this.targets = [];

						//this.isfinishanimation = false;
						//this.isactionfinish = false;
						_this.isturnfinish = false;
						_this.bskipturn = false;

						return _this;
				}

				return RPGStatus;
		}(_ObjectRPGID2.ObjectRPGID);
});