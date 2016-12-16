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

    //world
    create_terrain03(){
        var self = this;
        var light = new THREE.HemisphereLight( 0xeeeeee, 0x888888, 1 );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );
        this.scene.add( new THREE.AxisHelper( 20 ) );

        var geometry = new THREE.PlaneBufferGeometry( 128, 128,4,4 );
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
        var heightData = [];
        var vertices = geometry.attributes.position.array;
        for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
            vertices[ j + 1 ] = Math.floor(Math.random() * 10);
            heightData.push(vertices[ j + 1 ]);
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

        var terrainWidthExtents = 100;
        var terrainDepthExtents = 100;
        var terrainWidth = 128;
        var terrainDepth = 128;
        var terrainHalfWidth = terrainWidth / 2;
        var terrainHalfDepth = terrainDepth / 2;
        var terrainMaxHeight = 8;
        var terrainMinHeight = -2;

        var groundShape;
        groundShape = this.createTerrainShape( heightData );
        //var groundShape = new Ammo.btBoxShape( new Ammo.btVector3(128, 0.1, 128 ) );
        //console.log(groundShape);

        var groundTransform = new Ammo.btTransform();
        groundTransform.setIdentity();
        // Shifts the terrain, since bullet re-centers it on its bounding box.
        groundTransform.setOrigin( new Ammo.btVector3( 0, ( terrainMaxHeight + terrainMinHeight ) / 2, 0 ) );
        var groundMass = 0;
        var groundLocalInertia = new Ammo.btVector3( 0, 0, 0 );
        var groundMotionState = new Ammo.btDefaultMotionState( groundTransform );
        var groundBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( groundMass, groundMotionState, groundShape, groundLocalInertia ) );
        this.world.addRigidBody( groundBody );

    }

    //world
    create_terrain04(){
        var self = this;
        var light = new THREE.HemisphereLight( 0xeeeeee, 0x888888, 1 );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );
        this.scene.add( new THREE.AxisHelper( 20 ) );

        var geometry = new THREE.PlaneBufferGeometry( 128, 128,4,4 );
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
        var heightData = [];
        var vertices = geometry.attributes.position.array;
        for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
            //vertices[ j + 1 ] = Math.floor(Math.random() * 10);
            heightData.push(vertices[ j + 1 ]);
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

        var terrainWidthExtents = 100;
        var terrainDepthExtents = 100;
        var terrainWidth = 128;
        var terrainDepth = 128;
        var terrainHalfWidth = terrainWidth / 2;
        var terrainHalfDepth = terrainDepth / 2;
        var terrainMaxHeight = 8;
        var terrainMinHeight = -2;

        var groundShape;
        groundShape = this.createTerrainShape( heightData );
        //var groundShape = new Ammo.btBoxShape( new Ammo.btVector3(128, 0.1, 128 ) );
        //console.log(groundShape);

        var groundTransform = new Ammo.btTransform();
        groundTransform.setIdentity();
        // Shifts the terrain, since bullet re-centers it on its bounding box.
        groundTransform.setOrigin( new Ammo.btVector3( 0, ( terrainMaxHeight + terrainMinHeight ) / 2, 0 ) );
        var groundMass = 0;
        var groundLocalInertia = new Ammo.btVector3( 0, 0, 0 );
        var groundMotionState = new Ammo.btDefaultMotionState( groundTransform );
        var groundBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( groundMass, groundMotionState, groundShape, groundLocalInertia ) );
        this.world.addRigidBody( groundBody );

    }

    createObjectMaterial() {
        var c = Math.floor( Math.random() * ( 1 << 24 ) );
        return new THREE.MeshPhongMaterial( { color: c } );
    }

    createTerrainShape(heightData) {
        var terrainWidthExtents = 128;
        var terrainDepthExtents = 128;
        //var terrainWidth = 128;
        //var terrainDepth = 128;
        var terrainWidth = 5;
        var terrainDepth = 5;

        var terrainHalfWidth = terrainWidth / 2;
        var terrainHalfDepth = terrainDepth / 2;
        var terrainMaxHeight = 8;
        var terrainMinHeight = -2;
        var ammoHeightData = null;

        // This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
        var heightScale = 1;
        // Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
        var upAxis = 1;
        // hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
        var hdt = "PHY_FLOAT";
        // Set this to your needs (inverts the triangles)
        var flipQuadEdges = false;
        // Creates height data buffer in Ammo heap
        ammoHeightData = Ammo._malloc( 4 * terrainWidth * terrainDepth );
        // Copy the javascript height data array to the Ammo one.
        var p = 0;
        var p2 = 0;
        for ( var j = 0; j < terrainDepth; j ++ ) {
            for ( var i = 0; i < terrainWidth; i ++ ) {
                // write 32-bit float data to memory
                Ammo.HEAPF32[ammoHeightData + p2 >> 2] = heightData[ p ];
                //console.log(heightData[ p ]);
                p ++;
                // 4 bytes/float
                p2 += 4;
            }
        }

        // Creates the heightfield physics shape
        var heightFieldShape = new Ammo.btHeightfieldTerrainShape(

            terrainWidth,
            terrainDepth,

            ammoHeightData,

            heightScale,
            terrainMinHeight,
            terrainMaxHeight,

            upAxis,
            hdt,
            flipQuadEdges
        );

        // Set horizontal scale
        var scaleX = terrainWidthExtents / ( terrainWidth - 1 );
        var scaleZ = terrainDepthExtents / ( terrainDepth - 1 );
        heightFieldShape.setLocalScaling( new Ammo.btVector3( scaleX, 1, scaleZ ) );

        heightFieldShape.setMargin( 0.05 );

        return heightFieldShape;

    }

}
