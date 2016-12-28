define(['exports', './ObjectRPGID'], function (exports, _ObjectRPGID2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RPGWeapon = undefined;

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

    var RPGWeapon = exports.RPGWeapon = function (_ObjectRPGID) {
        _inherits(RPGWeapon, _ObjectRPGID);

        _createClass(RPGWeapon, null, [{
            key: 'getClass',
            value: function getClass() {
                return 'RPGTexture';
            }
        }]);

        function RPGWeapon(args) {
            _classCallCheck(this, RPGWeapon);

            var _this = _possibleConstructorReturn(this, (RPGWeapon.__proto__ || Object.getPrototypeOf(RPGWeapon)).call(this, args));

            _this.objtype = "weapon";
            _this.nameClass = "RPGWeapon";
            return _this;
        }

        return RPGWeapon;
    }(_ObjectRPGID2.ObjectRPGID);
});