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

	var ObjectRPGID = exports.ObjectRPGID = function ObjectRPGID(args) {
		_classCallCheck(this, ObjectRPGID);

		this.hashid = "";
		this.id = "";
		this.name = "none";
		this.description = "none";
		this.objtype = "none";
		this.gundbid = "";
		if (args != null) {
			if (args['name'] != null) {
				this.name = args['name'];
			}
			if (args['id'] != null) {
				this.name = args['id'];
			}
			if (args['hashid'] != null) {
				this.name = args['hashid'];
			}
		}
	};
});