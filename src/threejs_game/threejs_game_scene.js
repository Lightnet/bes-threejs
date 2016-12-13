/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

export class Threejs_game_scene extends Threejs_game_module{

    constructor(args){
        super(args);
    }

    createbasescene(){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
        cube.update =function(){
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;
        };
		this.scene.add( cube );
        this.camera.position.z = 5;
        //console.log(this.scene);
    }

    createbasescene02(){
        var geometry = new THREE.BufferGeometry();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        var vertices = new Float32Array( [
        	-1.0, -1.0,  1.0,
        	 1.0, -1.0,  1.0,
        	 1.0,  1.0,  1.0,

        	 1.0,  1.0,  1.0,
        	-1.0,  1.0,  1.0,
        	-1.0, -1.0,  1.0
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.update =function(){
            //mesh.rotation.x += 0.1;
            //mesh.rotation.y += 0.1;
        };
		this.scene.add( mesh );
        this.camera.position.z = 5;
        //console.log(this.scene);
    }

    createbasescene03(){
        var geometry = new THREE.Geometry();
        var point = new THREE.Vector3( -1,  1, 0 );
        geometry.vertices.push(
        	point,
        	new THREE.Vector3( -1, -1, 0 ),
        	new THREE.Vector3(  1, -1, 0 )
        );
        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geometry.verticesNeedUpdate = true;
        geometry.computeBoundingSphere();

        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var mesh = new THREE.Mesh( geometry, material );
        console.log(mesh);
        mesh.update =function(){
            //mesh.geometry.verticesNeedUpdate = true;
            //mesh.rotation.x += 0.1;
            //point.x += 0.1;
            //if(point.x > 1){
                //point.x = -1;
            //}
            //mesh.rotation.y += 0.1;
        };
		this.scene.add( mesh );
        this.camera.position.z = 10;
        //console.log(this.scene);
    }

}
