define(["exports"], function (exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
				value: true
		});

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

		var RPGStats = exports.RPGStats = function () {
				_createClass(RPGStats, null, [{
						key: "getClass",
						value: function getClass() {
								return 'RPGStats';
						}
				}]);

				function RPGStats(args) {
						_classCallCheck(this, RPGStats);

						this.nameClass = "RPGStats";

						this.str = 0;
						this.vit = 0;
						this.dex = 0;
						this.agi = 0;
						this.int = 0;

						this.wisdom = 0;
						this.charisma = 0;
						this.luck = 0;

						this.perception = 0;
				}

				return RPGStats;
		}();
});