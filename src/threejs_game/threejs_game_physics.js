/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

export class Threejs_game_physics extends Threejs_game_module{

    constructor(args){
        super(args);
    }



    create_boxshape(args){
        args = args || {};
        var shape;
        var margin = 0.05;
        //console.log(args);
        var _obj = args['obj'] || {};
        //console.log(_obj);
        var objectSize = args['objsize'] || 3;
        //console.log(objectSize);

        var radius = 1 + Math.random() * objectSize;

        var mass = objectSize * 5;
        var localInertia = new Ammo.btVector3( 0, 0, 0 );
        shape = new Ammo.btSphereShape( radius );
        shape.setMargin( margin );
        shape.calculateLocalInertia( mass, localInertia );
        //console.log(shape);
        var transform = new Ammo.btTransform();
        transform.setIdentity();
        var pos = _obj.position;
        transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
        var motionState = new Ammo.btDefaultMotionState( transform );
        var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, localInertia );
        var body = new Ammo.btRigidBody( rbInfo );
        //console.log(body);
        body.setFriction(1);
        body.setDamping(0.2, 1.0);

        return body;


    }

    //SPHERE
    create_playershape(args){
        args = args || {};
        var shape;
        var margin = 0.05;
        //console.log(args);
        var _obj = args['obj'] || {};
        //console.log(_obj);
        var objectSize = args['objsize'] || 3;
        //console.log(objectSize);

        var radius = 1 + Math.random() * objectSize;

        var mass = objectSize * 5;
        var localInertia = new Ammo.btVector3( 0, 0, 0 );
        shape = new Ammo.btSphereShape( radius );
        shape.setMargin( margin );
        shape.calculateLocalInertia( mass, localInertia );
        //console.log(shape);
        var transform = new Ammo.btTransform();
        transform.setIdentity();
        var pos = _obj.position;
        transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
        var motionState = new Ammo.btDefaultMotionState( transform );
        var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, localInertia );
        var body = new Ammo.btRigidBody( rbInfo );
        //console.log(body);
        body.setFriction(1);
        body.setDamping(0.2, 1.0);

        return body;
    }

}
