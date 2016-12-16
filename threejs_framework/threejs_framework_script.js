define(['exports', './threejs_framework_module'], function (exports, _threejs_framework_module) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Threejs_framework_script = undefined;

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

	var Threejs_framework_script = exports.Threejs_framework_script = function (_Threejs_framework_mo) {
		_inherits(Threejs_framework_script, _Threejs_framework_mo);

		function Threejs_framework_script(args) {
			_classCallCheck(this, Threejs_framework_script);

			return _possibleConstructorReturn(this, (Threejs_framework_script.__proto__ || Object.getPrototypeOf(Threejs_framework_script)).call(this, args));
		}

		//===============================================
		// scripts components
		//===============================================


		_createClass(Threejs_framework_script, [{
			key: 'clearScripts',
			value: function clearScripts() {
				var myNode = document.getElementById('scriptcomponents');
				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}
			}
		}, {
			key: 'addScript',
			value: function addScript(filename) {
				var head = document.getElementById('scriptcomponents');
				var escript = document.createElement('script');
				escript.src = filename;
				escript.type = "text/javascript";
				head.appendChild(escript);
			}
		}, {
			key: 'createscript',
			value: function createscript(scriptname, args) {
				console.log('loaded script component name: ' + scriptname);
				this.scriptcomponents[scriptname] = args;
			}
		}, {
			key: 'createComponent',
			value: function createComponent(object, name) {
				var capp;
				for (var sc in this.scriptcomponents) {
					if (name == sc) {
						capp = this.scriptcomponents[sc];
						//console.log('found!');
						break;
					}
				}
				if (capp != null) {
					var sapp = capp(this);
					object.script[name] = new sapp(object);
					capp = null;
					sapp = null;
				}
			}
		}]);

		return Threejs_framework_script;
	}(_threejs_framework_module.Threejs_framework_module);
});