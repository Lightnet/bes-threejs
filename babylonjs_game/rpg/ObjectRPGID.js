define(['exports'], function (exports) {
		'use strict';

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

				args = args || {};
				//args[''] ||
				this.gundbid = args['gundbid'] || "";

				this.hashid = args['hashid'] || "";
				this.id = args['id'] || "";
				this.name = args['name'] || "none";
				this.description = args['description'] || "none";
				this.objtype = args['objtype'] || "none";

				this.params = args['params'] || [];

				this.binteract = args['binteract'] || false;
				this.bused = args['bused'] || false;
				this.bdrop = args['bdrop'] || false;
				this.bthrow = args['bthrow'] || false;
				this.btrigger = args['btrigger'] || false;
				this.events = args['events'] || [];
				this.tag = args['tag'] || "";
				this.children = args['children'] || [];
				this.scripts = args['scripts'] || [];

				this.buyprice = args['buyprice'] || 0;
				this.sellprice = args['sellprice'] || 0;
				this.keywords = args['keywords'] || [];

				this.stack = args['stack'] || 1;
				this.maxstack = args['maxstack'] || 1;
		};
});