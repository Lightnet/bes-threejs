/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Threejs_framework} from '../threejs_framework/threejs_framework';

import {Threejs_game_css3d} from './threejs_game_css3d';
import {Threejs_game_terrain} from './threejs_game_terrain';
import {Threejs_game_scene} from './threejs_game_scene';
import {Threejs_game_hud} from './threejs_game_hud';
import {Threejs_game_controller} from './threejs_game_controller';
import {Threejs_game_character} from './threejs_game_character';
import {Threejs_game_physics} from './threejs_game_physics';

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

//RFC Type 4 (random) schema
var uuid = function() {
    var buf = new Uint32Array(4);
    window.crypto.getRandomValues(buf);
    var idx = -1;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        idx++;
        var r = (buf[idx>>3] >> ((idx%8)*4))&15;
        var v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

export class Threejs_game extends Threejs_framework{
    constructor(args){
        super(args);
        console.log("init Threejs_game...");
        if(!args){
            args = {};
        }

        this.character = null;
        this.controllerid = 0;
		this.keys={left:0,right:0,forward:0,back:0,rotate_right:0,rotate_left:0};
		this.moveVector = THREE.Vector3(0,0,0)
        this.tbv30 = new Ammo.btVector3();
        this.transformAux1 = new Ammo.btTransform();
        //console.log(this.tbv30);

        new Threejs_game_css3d(this);
        new Threejs_game_terrain(this);
        new Threejs_game_scene(this);
        new Threejs_game_hud(this);
        new Threejs_game_controller(this);
        new Threejs_game_character(this);
        new Threejs_game_physics(this);

    }

    init(){
        super.init();
        this.setup();
    }

    update(){
        super.update();
        //console.log("update?");
        if(this.controlOrbit !=null){
            this.controlOrbit.update();
            //console.log("update??");
        }
    }

    simulate(dt) {
        this.updatePhysics(dt);
    }

    start_physics(){
        console.log("start_physics");
        var self = this;
        var last = Date.now();
        function mainLoop() {
            var now = Date.now();
            self.simulate(now - last);
            last = now;
        }

        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(mainLoop, 1000/60);
    }

    create_sphere_physics(){
        var self = this;
        var geometry = new THREE.SphereBufferGeometry( 1, 4, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );
        this.scene.add( sphere );
        sphere.position.set(0,10,0);
        //var body = this.create_playershape({obj:threeObject});
        var body = this.create_boxshape({obj:sphere});
        sphere.userData.physicsBody = body;

        sphere.update= function(){
            var objPhys = sphere.userData.physicsBody;
            var ms = objPhys.getMotionState();
            if ( ms ) {
                ms.getWorldTransform( self.transformAux1 );
                var p = self.transformAux1.getOrigin();
                var q = self.transformAux1.getRotation();
                sphere.position.set( p.x(), p.y(), p.z() );
                //sphere.quaternion.set( q.x(), q.y(), q.z(), q.w() );
                //console.log("update?");
            }
        }

        this.world.addRigidBody( body );

    }

    setup(){
        this.bablephysics = true;
        this.initPhysics();
        this.create_input();
        this.camera.position.set(0,20,512);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.start_physics();
        //this.controlOrbit = new THREE.OrbitControls( this.camera );
        this.hideloadingscreen();

        //console.log(window.width);
        //console.log(screen.width);
        console.log("setup");
        //this.createBaseHUD();
        //this.createbasescene();
        //this.create_terrain03();
        this.create_terrain04();
        this.simple_pawn();
        //this.createinterface();

        var geometry = new THREE.BoxGeometry( 2, 2, 2 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
		var cube = new THREE.Mesh( geometry, material );
        cube.position.set(0,13,5);
        //cube.update =function(){
            //cube.rotation.x += 0.1;
            //cube.rotation.y += 0.1;
        //};
		this.scene.add( cube );
        this.create_sphere_physics();

        //console.log(this.world);
    }
}
