/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

//http://stackoverflow.com/questions/15696963/three-js-set-and-read-camera-look-vector
THREE.Utils = {
    cameraLookDir: function(camera) {
        var vector = new THREE.Vector3(0, 0, -1);
        vector.applyEuler(camera.rotation, camera.rotation.order);
        return vector;
    }
};

export class Threejs_game_character extends Threejs_game_module{

    constructor(args){
        super(args);
    }

    simple_pawn(){
        var terrainMaxHeight = 8;

        var self = this;
        // SPHERE
        var threeObject = null;
        var shape = null;

        var objectSize = 3;
        var margin = 0.05;

        var radius = 1 + Math.random() * objectSize;
        //threeObject = new THREE.Mesh( new THREE.SphereGeometry( radius, 20, 20 ), this.createObjectMaterial() );
        var geometry;
        geometry = new THREE.ConeBufferGeometry( 1, 2, 4 );
        //geometry = new THREE.SphereGeometry( radius, 20, 20 );
        geometry.rotateX( - Math.PI / 2 );

        threeObject = new THREE.Mesh( geometry, this.createObjectMaterial() );

        //=======================================



        shape = new Ammo.btSphereShape( radius );
        shape.setMargin( margin );

        //threeObject.position.set( ( Math.random() - 0.5 ) * terrainWidth * 0.6, terrainMaxHeight + objectSize + 2, ( Math.random() - 0.5 ) * terrainDepth * 0.6 );
        //threeObject.position.set( 64, terrainMaxHeight + objectSize + 2, 64);
        threeObject.position.set( 0, terrainMaxHeight + objectSize + 2, 0);

        var mass = objectSize * 5;
        var localInertia = new Ammo.btVector3( 0, 0, 0 );
        shape.calculateLocalInertia( mass, localInertia );
        var transform = new Ammo.btTransform();
        transform.setIdentity();
        var pos = threeObject.position;
        transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
        var motionState = new Ammo.btDefaultMotionState( transform );
        var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, localInertia );
        var body = new Ammo.btRigidBody( rbInfo );

        threeObject.userData.physicsBody = body;

        this.scene.add( threeObject );
        //dynamicObjects.push( threeObject );
        this.world.addRigidBody( body );

        var transformAux1 = new Ammo.btTransform();

        var vecdir = new THREE.Vector3(); // create once and reuse it!
        console.log(self.controlOrbit);
        var axis = new THREE.Vector3( 0, 1, 0 );

        var rotate = 0;

        threeObject.update= function(){
            var objPhys = threeObject.userData.physicsBody;
            var ms = objPhys.getMotionState();
            if ( ms ) {
                ms.getWorldTransform( transformAux1 );
                var p = transformAux1.getOrigin();
                var q = transformAux1.getRotation();
                threeObject.position.set( p.x(), p.y(), p.z() );
                //threeObject.quaternion.set( q.x(), q.y(), q.z(), q.w() );
                //console.log("update?");
            }


            if(self.character !=null){
                //console.log(self.keys.left);
                vecdir = self.camera.getWorldDirection();
                vecdir.normalize();
                var theta = Math.atan2(vecdir.x,vecdir.z);
                var vecface;
                //self.camera.useQuaternion = true;

                if(rotate > 360){
                    rotate = 0;
                }

                if(rotate < 0){
                    rotate = 360;
                }

                if(self.keys.rotate_left){
                    rotate += 0.1;
                }

                if(self.keys.rotate_right){
                    rotate -= 0.1;
                }

                //rotate = rotate + 0.01;
                //console.log(rotate);
                var constant = rotate;
                var elapsedTime = 1;
                var radius = 10;

                self.camera.position.x = threeObject.position.x + radius * Math.cos( constant * elapsedTime );
                self.camera.position.y = threeObject.position.y + 5;
                self.camera.position.z = threeObject.position.z + radius * Math.sin( constant * elapsedTime );
                self.camera.lookAt( threeObject.position );


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

                var speed = 5;

                if(self.keys.left){
                    threeObject.rotation.y = theta - Math.PI/2 ;

                    vecface = new THREE.Vector3( 0, 0, -1).applyAxisAngle( axis, theta - Math.PI/2 );
                    vecface.normalize();
                    vecface.multiplyScalar(speed);
                    //threeObject.position.x += vecface.x;
                    //threeObject.position.z += vecface.z;

                    self.tbv30.setValue(vecface.x,0,vecface.z);
                    threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                    //self.camera.translateX(  -10 );
                }
                if(self.keys.right){
                    threeObject.rotation.y = theta + Math.PI/2 ;

                    vecface = new THREE.Vector3( 0, 0, -1).applyAxisAngle( axis, theta + Math.PI/2 );
                    vecface.normalize();
                    vecface.multiplyScalar(speed);
                    //threeObject.position.x += vecface.x;
                    //threeObject.position.z += vecface.z;

                    self.tbv30.setValue(vecface.x,0,vecface.z);
                    threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                    //self.camera.translateX(  10 );
                }
                if(self.keys.forward){
                    threeObject.rotation.y = theta + Math.PI ;

                    vecface = new THREE.Vector3( 0, 0, 1).applyAxisAngle( axis, theta );
                    vecface.normalize();
                    vecface.multiplyScalar(speed);
                    //console.log(vecface);
                    //threeObject.position.x += vecface.x;
                    //threeObject.position.z += vecface.z;

                    self.tbv30.setValue(vecface.x,0,vecface.z);
                    threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);
                }
                if(self.keys.back){
                    threeObject.rotation.y = theta;

                    vecface = new THREE.Vector3( 0, 0, -1).applyAxisAngle( axis, theta );
                    vecface.normalize();
                    vecface.multiplyScalar(speed);
                    //threeObject.position.x += vecface.x;
                    //threeObject.position.z += vecface.z;

                    self.tbv30.setValue(vecface.x,0,vecface.z);
                    threeObject.userData.physicsBody.setLinearVelocity(self.tbv30);

                }
                theta = null;
            }
        }
        this.character = threeObject;
    }
}
