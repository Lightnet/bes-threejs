define(['exports', './threejs_framework_module'], function (exports, _threejs_framework_module) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Threejs_framework_loadingscreen = undefined;

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

	var Threejs_framework_loadingscreen = exports.Threejs_framework_loadingscreen = function (_Threejs_framework_mo) {
		_inherits(Threejs_framework_loadingscreen, _Threejs_framework_mo);

		function Threejs_framework_loadingscreen(args) {
			_classCallCheck(this, Threejs_framework_loadingscreen);

			return _possibleConstructorReturn(this, (Threejs_framework_loadingscreen.__proto__ || Object.getPrototypeOf(Threejs_framework_loadingscreen)).call(this, args));
		}

		_createClass(Threejs_framework_loadingscreen, [{
			key: 'initloadingscreen',
			value: function initloadingscreen() {
				var styleloadingscreen = document.createElement("style");
				styleloadingscreen.innerHTML = '';
				styleloadingscreen.innerHTML += '.loader {border: 16px solid #f3f3f3;border-top: 16px solid #3498db;border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;}';
				styleloadingscreen.innerHTML += '\n@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg);}}';
				styleloadingscreen.type = 'text/css';
				document.getElementsByTagName('head')[0].appendChild(styleloadingscreen);

				var divloadingscreen = document.createElement("div");
				divloadingscreen.id = "loadingscreen";
				divloadingscreen.style['background-color'] = '#dddddd';
				divloadingscreen.style.position = 'absolute';
				divloadingscreen.style.top = 0;
				divloadingscreen.style.left = 0;
				divloadingscreen.style.width = '100%';
				divloadingscreen.style.height = '100%';
				divloadingscreen.innerHTML = "<div style='background-color: #dddddd;position: absolute;left: 0;height: 50%;width: 100%;top: 50%;'><center><div class='loader'></div></center> <center id='loadingscreentext'>Loading...</center></div>";
				document.getElementsByTagName('body')[0].appendChild(divloadingscreen);
			}
		}, {
			key: 'loadingscreentext',
			value: function loadingscreentext() {
				var _TEXT = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "loading......";

				document.getElementById('loadingscreentext').innerHTML = _TEXT;
			}
		}, {
			key: 'showloadingscreen',
			value: function showloadingscreen() {
				document.getElementById('loadingscreen').style.display = 'block';
			}
		}, {
			key: 'hideloadingscreen',
			value: function hideloadingscreen() {
				document.getElementById('loadingscreen').style.display = 'none';
			}
		}]);

		return Threejs_framework_loadingscreen;
	}(_threejs_framework_module.Threejs_framework_module);
});