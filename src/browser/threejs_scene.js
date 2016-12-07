/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

window.onload = function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

	var canvas = document.getElementById("application-canvas");

	var renderer = new THREE.WebGLRenderer({canvas:canvas});
	renderer.setSize( window.innerWidth, window.innerHeight );
	//document.body.appendChild( renderer.domElement );

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

	// your code here
	//document.body.appendChild( renderer.domElement );
	//canvas.appendChild( renderer.domElement );
	render();
	console.log('init threejs scene');
}
