define(["exports", "./threejs_framework_module"], function (exports, _threejs_framework_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_framework_hud = undefined;

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

    var Threejs_framework_hud = exports.Threejs_framework_hud = function (_Threejs_framework_mo) {
        _inherits(Threejs_framework_hud, _Threejs_framework_mo);

        function Threejs_framework_hud(args) {
            _classCallCheck(this, Threejs_framework_hud);

            return _possibleConstructorReturn(this, (Threejs_framework_hud.__proto__ || Object.getPrototypeOf(Threejs_framework_hud)).call(this, args));
        }

        //works mesh over lap scenes


        _createClass(Threejs_framework_hud, [{
            key: "setup_hud",
            value: function setup_hud() {
                console.log("setup_hud");
                this.scenehud = new THREE.Scene();
                //this.cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30);
                //this.camerahud = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
                this.camerahud = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0, 30);
                //this.camerahud.position.z = 5;
                //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
                //var material = new THREE.MeshBasicMaterial( { color: 0xccccff } );
                //var cube = new THREE.Mesh( geometry, material );
                //cube.position.x = 1;
                //this.scenehud.add( cube );
            }
        }]);

        return Threejs_framework_hud;
    }(_threejs_framework_module.Threejs_framework_module);
});