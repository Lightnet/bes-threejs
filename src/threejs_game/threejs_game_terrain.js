/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

export class Threejs_game_terrain extends Threejs_game_module{

    constructor(args){
        super(args);
    }

    create_terrain01(){
        //https://threejs.org/docs/?q=PlaneBufferGeometry#Reference/Geometries/PlaneBufferGeometry
        //http://jsfiddle.net/tfjvggfu/24/
        //http://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges

        var light = new THREE.HemisphereLight( 0xeeeeee, 0x888888, 1 );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );

        // axes
        this.scene.add( new THREE.AxisHelper( 20 ) );
        var geometry = new THREE.PlaneBufferGeometry( 8, 8,4,4 );
        geometry.rotateX( - Math.PI / 2 );

        //var geometry = new THREE.SphereGeometry( 5, 12, 8 );
        //var material = new THREE.MeshBasicMaterial( {color: 0x156289, side: THREE.DoubleSide,wireframe: true} );
        //var material = new THREE.LineBasicMaterial( {color: 0xffffff,transparent: true,opacity: 0.5,side: THREE.DoubleSide} );
        //var material = new THREE.MeshPhongMaterial( {color: 0x156289,emissive: 0x072534,side: THREE.DoubleSide,shading: THREE.FlatShading});
        var material = new THREE.MeshPhongMaterial( {
            color: 0xff0000,
            shading: THREE.FlatShading,
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1,
            side: THREE.DoubleSide,
            wireframe: true
        });

        var vertices = geometry.attributes.position.array;
        for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
            vertices[ j + 1 ] = Math.random(0,1);
            //vertices[ j + 2 ] = Math.random(0,1);
        }
        var plane = new THREE.Mesh( geometry,material );
        // wireframe - new way
        //var geo = new THREE.EdgesGeometry( plane.geometry ); // or WireframeGeometry
        //var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2} );
        //var wireframe = new THREE.LineSegments( geo, mat );
        //plane.add( wireframe );
        //var vertices = geometry.attributes.position.array;
        //console.log(plane.geometry.attributes.position.array);
        //console.log(plane);
        //plane.rotation.x = 90;
        /*
        plane.update = function(){
            //plane.geometry.verticesNeedUpdate = true;
            //plane.geometry.attributes.needsUpdate = true;
            //plane.geometry.attributes.verticesNeedUpdate = true;
            plane.geometry.attributes.position.needsUpdate = true;
            //plane.rotation.x += 0.1;
            //point.x += 0.1;
            //if(point.x > 1){
                //point.x = -1;
            //}
            //plane.rotation.y += 0.1;
            var vertices = plane.geometry.attributes.position.array;
            for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
				//vertices[ j + 1 ] += 0.01;
                vertices[ j + 2 ] = Math.random(0,1);
			}
            //plane.geometry.attributes.position.array = vertices;
        };
        */
        //console.log(vertices);
        this.scene.add( plane );
        this.camera.position.z = 10;
    }


    create_terrain02(){
        //https://threejs.org/docs/?q=PlaneBufferGeometry#Reference/Geometries/PlaneBufferGeometry
        //http://jsfiddle.net/tfjvggfu/24/
        //http://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges

        var light = new THREE.HemisphereLight( 0xeeeeee, 0x888888, 1 );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );
        this.scene.add( new THREE.AxisHelper( 20 ) );
        var geometry = new THREE.PlaneBufferGeometry( 8, 8,4,4 );
        geometry.rotateX( - Math.PI / 2 );
        var material = new THREE.MeshPhongMaterial( {
            color: 0xff0000,
            shading: THREE.FlatShading,
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1,
            side: THREE.DoubleSide,
            wireframe: true
        });
        var terrainheight = [];
        var vertices = geometry.attributes.position.array;
        for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
            vertices[ j + 1 ] = Math.random(0,1);
            terrainheight.push(vertices[ j + 1 ]);
            //vertices[ j + 2 ] = Math.random(0,1);
        }


        var plane = new THREE.Mesh( geometry,material );

        //plane.update = function(){
            //plane.geometry.attributes.position.needsUpdate = true;
            //var vertices = plane.geometry.attributes.position.array;
            //for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
                //vertices[ j + 1 ] = Math.random(0,1);
			//}
        //};

        this.scene.add( plane );
        this.camera.position.z = 10;
    }

}
