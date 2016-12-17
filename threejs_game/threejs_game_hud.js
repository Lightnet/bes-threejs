define(["exports", "./threejs_game_module"], function (exports, _threejs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_hud = undefined;

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

    var Threejs_game_hud = exports.Threejs_game_hud = function (_Threejs_game_module) {
        _inherits(Threejs_game_hud, _Threejs_game_module);

        function Threejs_game_hud(args) {
            _classCallCheck(this, Threejs_game_hud);

            return _possibleConstructorReturn(this, (Threejs_game_hud.__proto__ || Object.getPrototypeOf(Threejs_game_hud)).call(this, args));
        }

        _createClass(Threejs_game_hud, [{
            key: "createBaseHUD",
            value: function createBaseHUD() {
                var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
                var self = this;

                function updateHUDSprites() {
                    console.log(window.innerWidth);
                    var width = window.innerWidth / 2;
                    var height = window.innerHeight / 2;
                    var material = spriteTL.material;
                    var imageWidth = material.map.image.width / 2;
                    var imageHeight = material.map.image.height / 2;
                    spriteTL.position.set(-width + imageWidth, height - imageHeight, 0); // top left
                    spriteTR.position.set(width - imageWidth, height - imageHeight, 0); // top right
                    spriteBL.position.set(-width + imageWidth, -height + imageHeight, 0); // bottom left
                    spriteBR.position.set(width - imageWidth, -height + imageHeight, 0); // bottom right
                    spriteC.position.set(0, 0, 0); // center
                }

                function createHUDSprites(texture) {
                    var material = new THREE.SpriteMaterial({ map: texture });
                    var width = material.map.image.width;
                    var height = material.map.image.height;
                    spriteTL = new THREE.Sprite(material);
                    spriteTL.scale.set(width, height, 1);
                    self.scenehud.add(spriteTL);

                    spriteTR = new THREE.Sprite(material);
                    spriteTR.scale.set(width, height, 1);
                    self.scenehud.add(spriteTR);
                    spriteBL = new THREE.Sprite(material);
                    spriteBL.scale.set(width, height, 1);
                    self.scenehud.add(spriteBL);
                    spriteBR = new THREE.Sprite(material);
                    spriteBR.scale.set(width, height, 1);
                    self.scenehud.add(spriteBR);
                    spriteC = new THREE.Sprite(material);
                    spriteC.scale.set(width, height, 1);
                    self.scenehud.add(spriteC);

                    updateHUDSprites();
                }
                var textureLoader = new THREE.TextureLoader();
                var mapA = textureLoader.load("assets/sprite0.png", createHUDSprites);
            }
        }, {
            key: "createhud",
            value: function createhud() {
                var self = this;
                var textureLoader = new THREE.TextureLoader();

                function createHUDSprites(texture) {
                    var material = new THREE.SpriteMaterial({ map: texture });

                    var spriteTL = new THREE.Sprite(material);

                    var spriteTLL = new THREE.Sprite(material);
                    var material = spriteTL.material;
                    var imageWidth = material.map.image.width / 2;
                    var imageHeight = material.map.image.height / 2;
                    var width = material.map.image.width;
                    var height = material.map.image.height;
                    console.log(width, ":", height);
                    spriteTL.scale.set(width, height, 1);
                    spriteTLL.scale.set(width, height, 1);
                    var width = window.innerWidth / 2;
                    var height = window.innerHeight / 2;
                    spriteTL.position.set(-width + imageWidth, height - imageHeight, 0); // top left
                    spriteTLL.position.set(-width + imageWidth, height - imageHeight - 50, 0); // top left

                    self.scenehud.add(spriteTL);

                    self.scenehud.add(spriteTLL);

                    console.log(spriteTL);
                    function onDocumentMouseDown(event) {
                        console.log("click");
                    }
                    function onDocumentOver(event) {
                        console.log("onDocumentOver");
                        spriteTL.scale.set(128 + 10, 128 + 10, 1);
                    }
                    function onDocumentOut(event) {
                        console.log("onDocumentOut");
                        spriteTL.scale.set(128, 128, 1);
                    }

                    function onDocumentOver2(event) {
                        console.log("onDocumentOver");
                        spriteTLL.scale.set(128 + 10, 128 + 10, 1);
                    }
                    function onDocumentOut2(event) {
                        console.log("onDocumentOut");
                        spriteTLL.scale.set(128, 128, 1);
                    }
                    spriteTLL.addEventListener("out", onDocumentOut2, false);
                    spriteTLL.addEventListener("over", onDocumentOver2, false);

                    //spriteTL.addEventListener("mousedown", onDocumentMouseDown, false);
                    spriteTL.addEventListener("click", onDocumentMouseDown, false);

                    spriteTL.addEventListener("out", onDocumentOut, false);
                    spriteTL.addEventListener("over", onDocumentOver, false);
                }

                var mapA = textureLoader.load("assets/sprite0.png", createHUDSprites);
            }
        }, {
            key: "create_raycast_hud",
            value: function create_raycast_hud() {
                //https://threejs.org/docs/api/core/Raycaster.html
                var self = this;
                var currentui = null;
                var oldui = null;

                var raycaster = new THREE.Raycaster();
                var mouse = new THREE.Vector2();

                function onMouseMove(event) {
                    // calculate mouse position in normalized device coordinates
                    // (-1 to +1) for both components
                    mouse.x = event.clientX / window.innerWidth * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                    raycaster.setFromCamera(mouse, self.camerahud);

                    var intersects = raycaster.intersectObjects(self.scenehud.children);
                    if (intersects.length > 0) {
                        //console.log(intersects[0].object);
                        //https://threejs.org/docs/api/core/EventDispatcher.html
                        //intersects[0].object.dispatchEvent({ type: 'click', message: 'vroom vroom!' });
                        currentui = intersects[0].object;
                        //console.log("hit!");
                    } else {
                        currentui = null;
                    }
                    if (currentui != oldui) {
                        console.log("current ui!");
                        if (oldui != null) {
                            oldui.dispatchEvent({ type: 'out', message: 'vroom vroom!' });
                        }
                        oldui = currentui;
                        if (oldui != null) {
                            oldui.dispatchEvent({ type: 'over', message: 'vroom vroom!' });
                        }
                    }
                }

                function raycast_mousedown(event) {
                    event.preventDefault();
                    // update the picking ray with the camera and mouse position
                    raycaster.setFromCamera(mouse, self.camerahud);
                    // calculate objects intersecting the picking ray
                    var intersects = raycaster.intersectObjects(self.scenehud.children);
                    if (intersects.length > 0) {
                        console.log(intersects[0].object);
                        //https://threejs.org/docs/api/core/EventDispatcher.html
                        intersects[0].object.dispatchEvent({ type: 'click', message: 'vroom vroom!' });
                    }
                    //for ( var i = 0; i < intersects.length; i++ ) {
                    //console.log("found!");
                    //intersects[ i ].object.material.color.set( 0xff0000 );
                    //}
                }

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mousedown', raycast_mousedown, false);
            }
        }]);

        return Threejs_game_hud;
    }(_threejs_game_module.Threejs_game_module);
});