define(['exports', './ObjectRPGID'], function (exports, _ObjectRPGID2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RPGNPCCharacter = undefined;

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

    var RPGNPCCharacter = exports.RPGNPCCharacter = function (_ObjectRPGID) {
        _inherits(RPGNPCCharacter, _ObjectRPGID);

        _createClass(RPGNPCCharacter, null, [{
            key: 'getClass',
            value: function getClass() {
                return 'RPGNPCCharacter';
            }
        }]);

        function RPGNPCCharacter(args) {
            _classCallCheck(this, RPGNPCCharacter);

            var _this = _possibleConstructorReturn(this, (RPGNPCCharacter.__proto__ || Object.getPrototypeOf(RPGNPCCharacter)).call(this, args));

            _this.objtype = "npc";
            _this.nameClass = "RPGNPCCharacter";
            return _this;
        }

        return RPGNPCCharacter;
    }(_ObjectRPGID2.ObjectRPGID);
});