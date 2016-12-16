define(['./threejs_game'], function (_threejs_game) {
    'use strict';

    var threejsapi; /*
                        Project Name: bes-threejs
                        Link:https://github.com/Lightnet/bes-threejs
                        Created By: Lightnet
                        License: cc (creative commons)
                    
                        Information: Please read the readme.md file for more information.
                    */

    //main access for setup

    //import {Threejs_framework} from './threejs_framework';
    //var Threejs_FW = new Threejs_framework();

    var config;
    //editor settings
    //config = {mode:"editor",bupdateobjects:true,bablephysics:false};
    //game HUD UI
    //config = {bupdateobjects:true, mode:"css3dwebgl"};
    config = { bupdateobjects: true };
    var game = new _threejs_game.Threejs_game(config);
    console.log(game);

    /*
    //Example script
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    
    var render = function () {
    	requestAnimationFrame( render );
    	cube.rotation.x += 0.1;
    	cube.rotation.y += 0.1;
    	renderer.render(scene, camera);
    };
    
    render();
    
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    */
});