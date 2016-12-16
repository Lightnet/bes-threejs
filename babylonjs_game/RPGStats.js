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

	var RPGStats = exports.RPGStats = function RPGStats(args) {
		_classCallCheck(this, RPGStats);

		this.str = 0;
		this.vit = 0;
		this.dex = 0;
		this.agi = 0;
		this.int = 0;

		this.wisdom = 0;
		this.charisma = 0;
		this.luck = 0;

		this.perception = 0;
	};
});