define(["exports", "./threejs_game_module"], function (exports, _threejs_game_module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Threejs_game_character = undefined;

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

    //http://stackoverflow.com/questions/15696963/three-js-set-and-read-camera-look-vector
    THREE.Utils = {
        cameraLookDir: function cameraLookDir(camera) {
            var vector = new THREE.Vector3(0, 0, -1);
            vector.applyEuler(camera.rotation, camera.rotation.order);
            return vector;
        }
    };

    var Threejs_game_character = exports.Threejs_game_character = function (_Threejs_game_module) {
        _inherits(Threejs_game_character, _Threejs_game_module);

        function Threejs_game_character(args) {
            _classCallCheck(this, Threejs_game_character);

            return _possibleConstructorReturn(this, (Threejs_game_character.__proto__ || Object.getPrototypeOf(Threejs_game_character)).call(this, args));
        }

        _createClass(Threejs_game_character, [{
            key: "simple_pawn",
            value: function simple_pawn() {
                var terrainMaxHeight = 8;

                var self = this;
                // SPHERE
                var threeObject = null;
                //var shape = null;

                var objectSize = 3;
                //var margin = 0.05;

                //var radius = 1 + Math.random() * objectSize;
                //threeObject = new THREE.Mesh( new THREE.SphereGeometry( radius, 20, 20 ), this.createObjectMaterial() );
                var geometry;
                geometry = new THREE.ConeBufferGeometry(1, 2, 4);
                //geometry = new THREE.SphereGeometry( radius, 20, 20 );
                geometry.rotateX(-Math.PI / 2);

                threeObject = new THREE.Mesh(geometry, this.createObjectMaterial());
                threeObject.position.set(0, terrainMaxHeight + objectSize + 2, 0);
                //=======================================
                /*
                shape = new Ammo.btSphereShape( radius );
                shape.setMargin( margin );
                  //threeObject.position.set( ( Math.random() - 0.5 ) * terrainWidth * 0.6, terrainMaxHeight + objectSize + 2, ( Math.random() - 0.5 ) * terrainDepth * 0.6 );
                //threeObject.position.set( 64, terrainMaxHeight + objectSize + 2, 64);
                //threeObject.position.set( 0, terrainMaxHeight + objectSize + 2, 0);
                  var mass = objectSize * 5;
                var localInertia = new Ammo.btVector3( 0, 0, 0 );
                shape.calculateLocalInertia( mass, localInertia );
                  //console.log(shape);
                var transform = new Ammo.btTransform();
                transform.setIdentity();
                var pos = threeObject.position;
                transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
                var motionState = new Ammo.btDefaultMotionState( transform );
                var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, localInertia );
                var body = new Ammo.btRigidBody( rbInfo );
                console.log(body);
                body.setFriction(1);
                body.setDamping(0.8, 1.0);
                */
                var body = this.create_playershape({ obj: threeObject });

                threeObject.userData.physicsBody = body;

                this.scene.add(threeObject);
                //dynamicObjects.push( threeObject );
                this.world.addRigidBody(body);

                var transformAux1 = new Ammo.btTransform();

                var vecdir = new THREE.Vector3(); // create once and reuse it!
                //console.log(self.controlOrbit);
                var axis = new THREE.Vector3(0, 1, 0);

                var rotate = 0;

                threeObject.update = function () {
                    var objPhys = threeObject.userData.physicsBody;
                    var ms = objPhys.getMotionState();
                    if (ms) {
                        ms.getWorldTransform(transformAux1);
                        var p = transformAux1.getOrigin();
                        var q = transformAux1.getRotation();
                        threeObject.position.set(p.x(), p.y(), p.z());
                        //threeObject.quaternion.set( q.x(), q.y(), q.z(), q.w() );
                        //console.log("update?");
                    }
                    var bmove = false;
                    var bphysicscontrol = true;

                    if (self.character != null) {
                        //console.log(self.keys.left);
                        vecdir = self.camera.getWorldDirection();
                        vecdir.normalize();
                        var theta = Math.atan2(vecdir.x, vecdir.z);
                        var vecface;
                        //self.camera.useQuaternion = true;

                        if (rotate > 360) {
                            rotate = 0;
                        }
                        if (rotate < 0) {
                            rotate = 360;
                        }
                        if (self.keys.rotate_left) {
                            rotate -= 0.1;
                        }
                        if (self.keys.rotate_right) {
                            rotate += 0.1;
                        }

                        var elapsedTime = 1;
                        var radius = 10;

                        self.camera.position.x = threeObject.position.x + radius * Math.cos(rotate * elapsedTime);
                        self.camera.position.y = threeObject.position.y + 5;
                        self.camera.position.z = threeObject.position.z + radius * Math.sin(rotate * elapsedTime);
                        self.camera.lookAt(threeObject.position);

                        /*
                        if(self.controlOrbit !=null){
                            if(threeObject !=null){
                                //self.controlOrbit.target.set(threeObject.position.x, threeObject.position.y, threeObject.position.z);
                                self.controlOrbit.target.copy(threeObject.position);
                                self.controlOrbit.maxDistance = 10;
                                //self.controlOrbit.enableDamping = true;
                                //self.controlOrbit.enableDamping = true;
                                self.controlOrbit.autoRotate = false;
                            }
                        }
                        */

                        var speed = 1;
                        if (!bphysicscontrol) {
                            speed = 1;
                        } else {
                            speed = 10;
                        }

                        //var speed = 10;

                        if (self.keys.left) {
                            threeObject.rotation.y = theta - Math.PI / 2;

                            vecface = new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, theta - Math.PI / 2);
                            vecface.normalize();
                            vecface.multiplyScalar(speed);
                            if (!bphysicscontrol) {
                                threeObject.position.x += vecface.x;
                                threeObject.position.z += vecface.z;
                            }

                            self.tbv30.setValue(vecface.x, 0, vecface.z);
                            threeObject.dirvec = vecface;
                            //threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                            //self.camera.translateX(  -10 );
                            bmove = true;
                        }
                        if (self.keys.right) {
                            threeObject.rotation.y = theta + Math.PI / 2;

                            vecface = new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, theta + Math.PI / 2);
                            vecface.normalize();
                            vecface.multiplyScalar(speed);
                            if (!bphysicscontrol) {
                                threeObject.position.x += vecface.x;
                                threeObject.position.z += vecface.z;
                            }

                            self.tbv30.setValue(vecface.x, 0, vecface.z);
                            threeObject.dirvec = vecface;
                            //threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                            //self.camera.translateX(  10 );
                            bmove = true;
                        }
                        if (self.keys.forward) {
                            threeObject.rotation.y = theta + Math.PI;
                            vecface = new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, theta);
                            vecface.normalize();
                            vecface.multiplyScalar(speed);
                            //console.log(vecface);
                            if (!bphysicscontrol) {
                                threeObject.position.x += vecface.x;
                                threeObject.position.z += vecface.z;
                            }
                            //console.log(vecface);
                            threeObject.dirvec = vecface;
                            self.tbv30.setValue(vecface.x, 0, vecface.z);
                            //threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                            bmove = true;
                        }
                        if (self.keys.back) {
                            threeObject.rotation.y = theta;

                            vecface = new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, theta);
                            vecface.normalize();
                            vecface.multiplyScalar(speed);
                            if (!bphysicscontrol) {
                                threeObject.position.x += vecface.x;
                                threeObject.position.z += vecface.z;
                            }
                            threeObject.dirvec = vecface;
                            self.tbv30.setValue(vecface.x, 0, vecface.z);
                            //threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                            bmove = true;
                        }

                        if (bphysicscontrol) {
                            if (!bmove) {
                                self.tbv30.setValue(0, 0, 0);
                                //threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                            }
                            if (bmove) {
                                //console.log("move?");
                                threeObject.userData.physicsBody.activate();
                                threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                            }
                        }
                        threeObject.dirrotate = theta;
                        theta = null;
                    }
                };
                var raycaster = new THREE.Raycaster();
                raycaster.far = 2;
                //console.log(raycaster);
                //raycaster.distance = 5;

                threeObject.interact = function () {
                    if (threeObject.dirvec == null) {
                        threeObject.dirvec = new THREE.Vector3(0, 0, -1);
                        console.log(threeObject.dirvec);
                    }

                    raycaster.set(threeObject.position, threeObject.dirvec);

                    var intersects = raycaster.intersectObjects(self.scene.children);
                    console.log(intersects);
                    if (intersects.length > 0) {
                        console.log("Intersected object:", intersects.length);
                        console.log(intersects[0]);
                        intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
                    }
                };

                threeObject.impulse = function () {
                    console.log("move?");
                    self.tbv30.setValue(0, 100, 0);
                    threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                };

                threeObject.movephysics = function () {
                    //console.log("move?");
                    //self.tbv30.setValue(0,100,0);
                    var transform = new Ammo.btTransform();
                    transform.setIdentity();
                    transform.setOrigin(new Ammo.btVector3(threeObject.position.x, threeObject.position.y + 0.1, threeObject.position.z));
                    console.log(threeObject.userData.physicsBody);
                    threeObject.userData.physicsBody.setWorldTransform(transform);

                    //threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                };

                this.character = threeObject;
            }
        }]);

        return Threejs_game_character;
    }(_threejs_game_module.Threejs_game_module);
});