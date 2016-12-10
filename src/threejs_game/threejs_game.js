/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

import {Threejs_framework} from '../threejs_framework/threejs_framework';

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
        if(!args){
            args = {};
        }

        //console.log("init Threejs_framework...");
    }

    init(){
        super.init();
        this.setup();
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

    createbasescene04(){
        //https://threejs.org/docs/?q=PlaneBufferGeometry#Reference/Geometries/PlaneBufferGeometry
        //http://jsfiddle.net/tfjvggfu/24/
        //http://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges


        var light = new THREE.HemisphereLight( 0xeeeeee, 0x888888, 1 );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );

        // axes
        this.scene.add( new THREE.AxisHelper( 20 ) );
        var geometry = new THREE.PlaneBufferGeometry( 8, 8,4,4 );
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
            vertices[ j + 2 ] = Math.random(0,1);
        }

        var plane = new THREE.Mesh( geometry,material );

        // wireframe - new way
        //var geo = new THREE.EdgesGeometry( plane.geometry ); // or WireframeGeometry
        //var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2} );
        //var wireframe = new THREE.LineSegments( geo, mat );
        //plane.add( wireframe );

        //var vertices = geometry.attributes.position.array;

        //console.log(plane.geometry.attributes.position.array);

        console.log(plane);

        plane.rotation.x = 90;
        plane.update =function(){
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

        //console.log(vertices);
        this.scene.add( plane );
        this.camera.position.z = 10;
    }

    createinterface(){
        var html = '<div method="click">Click Me</div>';
        var methods = {
            click: function (elem) {
                console.log('element clicked!', elem);
            }
        };
        var options = {
            throttle: 250,          // throttle for the renderer in milliseconds, can be disabled with false (default 250ms)
            observe: true,         // watches the element for changes and re-renders (default true)
            alwaysOnTop: false,    // ensures the UI is always on top of everything in the scene (default false)
            debug: false           // places a small sphere at the click point (default false)
        };
        var ui = new THREE.Interface(html, methods, options);
        this.scene.add(ui);
    }

    createBaseHUD(){
        var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
        var self = this;


        function updateHUDSprites () {
            console.log(window.innerWidth);
			var width = window.innerWidth / 2;
			var height = window.innerHeight / 2;
			var material = spriteTL.material;
			var imageWidth = material.map.image.width / 2;
			var imageHeight = material.map.image.height / 2;
			spriteTL.position.set( - width + imageWidth,   height - imageHeight, 0 ); // top left
			spriteTR.position.set(   width - imageWidth,   height - imageHeight, 0 ); // top right
			spriteBL.position.set( - width + imageWidth, - height + imageHeight, 0 ); // bottom left
			spriteBR.position.set(   width - imageWidth, - height + imageHeight, 0 ); // bottom right
			spriteC.position.set( 0, 0, 0 ); // center
		}


        function createHUDSprites ( texture ) {
			var material = new THREE.SpriteMaterial( { map: texture } );
			var width = material.map.image.width;
			var height = material.map.image.height;
			spriteTL = new THREE.Sprite( material );
			spriteTL.scale.set( width, height, 1 );
			self.scenehud.add( spriteTL );

			spriteTR = new THREE.Sprite( material );
			spriteTR.scale.set( width, height, 1 );
			self.scenehud.add( spriteTR );
			spriteBL = new THREE.Sprite( material );
			spriteBL.scale.set( width, height, 1 );
			self.scenehud.add( spriteBL );
			spriteBR = new THREE.Sprite( material );
			spriteBR.scale.set( width, height, 1 );
			self.scenehud.add( spriteBR );
			spriteC = new THREE.Sprite( material );
			spriteC.scale.set( width, height, 1 );
			self.scenehud.add( spriteC );

			updateHUDSprites();
		}



        var textureLoader = new THREE.TextureLoader();

        var mapA = textureLoader.load( "assets/sprite0.png", createHUDSprites );

    }

    setup(){
        this.hideloadingscreen();
        //console.log(window.width);
        //console.log(screen.width);
        console.log("setup");
        this.createBaseHUD();

        //this.createbasescene();
        this.createbasescene04();
        //this.createinterface();


    }
}
