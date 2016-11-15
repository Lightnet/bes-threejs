/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

//var vec = new THREE.Vector3();
//console.log(vec);

//listen window load
function addEvent(element, eventName, fn) {
    if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
    else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
}

class Game {
	constructor(settings) {
		this.version = "0.0.1";

		if(settings != null){
			if(settings['mode'] != null){
				this.mode = settings['mode'];
			}else{
				this.mode = "game;";
			}
			console.log("mode: "+this.mode);

			if(settings['load'] !=null ){
				this.bmap = true;
				this.mapurl = settings['load'];
			}else{
				this.bmap = false;
				this.mapurl = "";
			}
			console.log("Map: " + this.bmap + " url: "+ this.mapurl);
		}

		this.scene = null;
		this.scenehud = null;
		this.camera = null;
		this.camerahud = null;
		this.canvas = null;
		this.renderer = null;
		//this.io = null;
		this.objects = [];
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		this.reload = false;
	}

	setup_network(){
		var self = this;
		this.socket = io();
		this.socket.on('connect', function () {
		    console.log('server connected');
			if(this.reload){
				location.reload();
			}
		});

		this.socket.on('disconnect', function () {
		    console.log('server disconnected');
			this.reload = true;
		});
	}

	setup_css3d(){
		var container = document.getElementById( 'container' );

		var Element = function ( id, x, y, z, ry ) {

			var div = document.createElement( 'div' );
			div.style.width = '480px';
			div.style.height = '360px';
			div.style.backgroundColor = '#000';

			var iframe = document.createElement('iframe');
			iframe.style.width = '480px';
			iframe.style.height = '360px';
			iframe.style.border = '0px';
			iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
			div.appendChild( iframe );

			var object = new THREE.CSS3DObject( div );
			object.position.set( x, y, z );
			object.rotation.y = ry;

			return object;
		};

		this.cameracss3d = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
		//this.cameracss3d.position.set( 500, 350, 750 );
		this.cameracss3d.position.set( 0, 0, 1024 );
		this.scenecss3d = new THREE.Scene();
		this.renderercss3d = new THREE.CSS3DRenderer();
		this.renderercss3d.setSize( window.innerWidth, window.innerHeight );
		this.renderercss3d.domElement.style.position = 'absolute';
		this.renderercss3d.domElement.style.top = 0;
		container.appendChild( this.renderercss3d.domElement );

		//var group = new THREE.Group();
		//group.add( new Element( '', 0, 0, 240, 0 ) );
		//group.add( new Element( '', 240, 0, 0, Math.PI / 2 ) );
		//group.add( new Element( '', 0, 0, - 240, Math.PI ) );
		//group.add( new Element( '', - 240, 0, 0, - Math.PI / 2 ) );
		//this.scenecss3d.add( group );

		var controls = new THREE.TrackballControls( this.cameracss3d );
		controls.rotateSpeed = 4;
		controls.zoomSpeed = 0.01;
		//console.log(controls);

		//var blocker = document.getElementById( 'blocker' );
		//blocker.style.display = 'none';

		document.addEventListener( 'mousedown', function () {
			//blocker.style.display = '';
		});
		document.addEventListener( 'mouseup', function () {
			//blocker.style.display = 'none';
		});
		var self = this;
		function animate() {
			requestAnimationFrame( animate );
			controls.update();
			//console.log("update?");
			self.renderercss3d.render( self.scenecss3d, self.cameracss3d );
		}
		animate();

		function onWindowResize() {

			self.cameracss3d.aspect = window.innerWidth / window.innerHeight;
			self.cameracss3d.updateProjectionMatrix();
			self.renderercss3d.setSize( window.innerWidth, window.innerHeight );

		}
		window.addEventListener( 'resize', onWindowResize, false );
	}

	setup_webgl(){
		if(this.mode == "editor"){
			var webgldiv = document.createElement( 'div' );
			webgldiv.style.width = '800px';
			webgldiv.style.height = '600px';
			webgldiv.style.backgroundColor = '#000';
		}

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, 800/600, 0.1, 1000 );

		if(this.mode == "editor"){
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.domElement.style.position = 'absolute';
			this.renderer.domElement.style.top = 0;
			this.renderer.setSize( 800, 600 );
		}else{
			this.canvas = document.getElementById("container");
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.canvas.appendChild(this.renderer.domElement);
		}

		this.renderer.autoClear = false;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;

		if(this.mode == "editor"){
			webgldiv.appendChild(this.renderer.domElement)

			var object = new THREE.CSS3DObject( webgldiv );
			object.position.set( 0, 0, 0 );
			object.rotation.y = 0;

			var group = new THREE.Group();
			group.add( object );
			this.setup_editor(group);

			this.scenecss3d.add( group );
		}
	}

	//works mesh over lap scenes
	setup_hud(){
		this.scenehud = new THREE.Scene();
		//this.cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30);
		//this.camerahud = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camerahud = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0, 30);
		//this.camerahud.position.z = 5;

		//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        //var material = new THREE.MeshBasicMaterial( { color: 0xccccff } );
        //var cube = new THREE.Mesh( geometry, material );
        //cube.position.x = 1;
		//this.scenehud.add( cube );
		this.hudCanvas = document.createElement('canvas');
		var width = window.innerWidth;
        var height = window.innerHeight;
        // Again, set dimensions to fit the screen.
        this.hudCanvas.width = window.innerWidth;
        this.hudCanvas.height = window.innerHeight;
        // Get 2D context and draw something supercool.
        this.hudBitmap = this.hudCanvas.getContext('2d');
        this.hudBitmap.font = "Normal 40px Arial";
        this.hudBitmap.textAlign = 'center';
        this.hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
        this.hudBitmap.fillText('Initializing...', width / 2, height / 2);

		this.hudTexture = new THREE.Texture(this.hudCanvas);
        this.hudTexture.needsUpdate = true;
		var material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
        material.transparent = true;
		var planeGeometry = new THREE.PlaneGeometry(width, height);
        var plane = new THREE.Mesh(planeGeometry, material);
		this.scenehud.add(plane);
	}

	basesetup(){

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		this.scene.add( this.cube );
		this.camera.position.z = 5;
		this.objects.push(this.cube);
	}

	setup_mouseraycast(){

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		var self = this;

		function onDocumentMouseMove( event ) {
			event.preventDefault();
			self.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			self.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			self.raycaster.setFromCamera( self.mouse, self.camera );
			var intersects = self.raycaster.intersectObjects( self.scene.children );

			if ( intersects.length > 0 ) {
				//console.log(intersects[ 0 ].object);
			}
		}
	}

	setup_editor(group){
		//ASSETS
		//autowidth:true,
		var assetstable = new webix.ui({
            container:"assets",
            view:"datatable",
            columns:[
				{ id:"filetype", header:"Type"},
                { id:"title", header:"Assets",fillspace:true}
            ],
			data:[
				{id:1,title:"test"},
				{id:2,title:"test2"}
			],
			select:"row",
			on:{
    			"onItemClick":function(id, e, trg){
        			webix.message("Click on row: " + id.row+", column: " + id.column);
				}
    		} //default click behavior that is true for any datatable cell
        });

		assetstable.add({
		    title:"Best film ever"
		});



		var _div_l = document.createElement( 'div' );
		_div_l.style.width = '480px';
		_div_l.style.height = '360px';
		_div_l.style.backgroundColor = '#000';

		//var _element_l  = document.createElement('div');
		//_element_l.style.width = '480px';
		//_element_l.style.height = '360px';
		//_element_l.style.border = '0px';
		//_element_l.innerHTML = 'Plain text inside a div.<br>Assets?';
    	//_element_l.className = 'three-div';
		//_div_l.appendChild( _element_l );

		var assetsid = document.getElementById('assets');
		_div_l.appendChild( assetsid );

		var object = new THREE.CSS3DObject( _div_l );
		object.position.set( -600, 100, 10 );
		object.rotation.y = 0;

		group.add( object );


		// SCENE

		var _div_r = document.createElement( 'div' );
		_div_r.style.width = '480px';
		_div_r.style.height = '360px';
		_div_r.style.backgroundColor = '#000';

		//var _element_r  = document.createElement('div');
		//_element_r.style.width = '480px';
		//_element_r.style.height = '360px';
		//_element_r.style.border = '0px';
		//_element_r.innerHTML = 'Plain text inside a div.<br>Scene?';
    	//_element_r.className = 'three-div';
		//_div_r.appendChild( _element_r );

		var scenetable = new webix.ui({
            container:"scene",
            view:"tree",
			select:true,
			data: [
		        {id:"root", value:"Cars", open:true, data:[
		            { id:"1", open:true, value:"Toyota", data:[
		                { id:"1.1", value:"Avalon" },
		                { id:"1.2", value:"Corolla" },
		                { id:"1.3", value:"Camry" }
		            ]},
		            { id:"2", open:true, value:"Skoda", data:[
		                { id:"2.1", value:"Octavia" },
		                { id:"2.2", value:"Superb" }
		            ]}
		        ]}
		    ],
			select: true,
			on: {"onItemClick": function (id, e, node) {
				//alert("item has just been clicked");
				var item = this.getItem(id);
				console.log(item);
			}}
        });
		//http://docs.webix.com/api__link__ui.tree_onitemclick_event.html
		console.log(scenetable);

		scenetable.add({ value:"New item"}, 0);

		//scenetable.add( {value:"New item"}, 0, parentId);
		//var nodeId = tree.getSelectedId();
		scenetable.add( {value:"New item"}, 0, 2);

		var sceneid = document.getElementById('scene');
		_div_r.appendChild( sceneid );

		var object = new THREE.CSS3DObject( _div_r );
		object.position.set( 600, 100, 10 );
		object.rotation.y = 0;

		group.add( object );

	}


	setup_renderpass(){
		var copyPass = new THREE.ShaderPass(THREE.CopyShader);
		copyPass.renderToScreen = true;

		var renderpass1 = new THREE.RenderPass(this.scene, this.camera);
		renderpass1.renderToScreen = false;

		var renderpass2 = new THREE.RenderPass(this.scenehud, this.camerahud);
		renderpass2.clear = false;

		this.effectComposer = new THREE.EffectComposer(this.renderer);
		this.effectComposer.addPass(renderpass1);
        this.effectComposer.addPass(renderpass2);

		this.effectComposer.addPass(copyPass);
	}

	render(){
		requestAnimationFrame(()=>{this.render()});
		this.cube.rotation.x += 0.1;
		this.cube.rotation.y += 0.1;
		//this.renderer.render(this.scene, this.camera);
		if(this.effectComposer !=null){
			this.effectComposer.render();
		}
	}

	load(){
		console.log("load map?");
	}

	init_simple(){
		this.setup_network();

		//content render
		if(this.mode == "editor"){
			this.setup_css3d();
		}

		//panel render
		this.setup_webgl();
		this.setup_hud();
		this.basesetup();

		if(this.bmap){
			this.load();
		}

		this.setup_mouseraycast();
		//render pass with two secnes
		this.setup_renderpass();
		this.render();
	}

	init(){
		addEvent(window, 'load', ()=>{
			this.init_simple();
		});
	}
}


//var game = new Game();
//console.log(game);
//set up and listen window loads
//game.init();
