define(['exports', './ObjectRPGID'], function (exports, _ObjectRPGID2) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RPGCondition = undefined;

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

	var RPGCondition = exports.RPGCondition = function (_ObjectRPGID) {
		_inherits(RPGCondition, _ObjectRPGID);

		function RPGCondition(args) {
			_classCallCheck(this, RPGCondition);

			var _this = _possibleConstructorReturn(this, (RPGCondition.__proto__ || Object.getPrototypeOf(RPGCondition)).call(this));

			_this.params = [];
			return _this;
		}

		return RPGCondition;
	}(_ObjectRPGID2.ObjectRPGID);
});