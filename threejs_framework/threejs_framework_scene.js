/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Threejs_framework_scene{

    constructor(args){
        if(!args){
            args = {};
            //console.log("no args...");
        }

        var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for(var fun in propertyNames){
            //console.log(fun);
            //console.log(propertyNames[fun]);
            if(propertyNames[fun] != "constructor"){
                args[propertyNames[fun]] = this[propertyNames[fun]];
            }else{
                //console.log('ignore ' + propertyNames[fun] );
            }
        }

        //args.
    }

    setup_css3d(){
		var container = document.getElementById( 'container' );
		/*
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
		*/

		this.cameracss3d = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
		//this.cameracss3d.position.set( 500, 350, 750 );
		this.cameracss3d.position.set( 0, 0, 1024 );
		this.scenecss3d = new THREE.Scene();
		this.renderercss3d = new THREE.CSS3DRenderer();
		this.renderercss3d.setSize( window.innerWidth, window.innerHeight );
		this.renderercss3d.domElement.style.position = 'absolute';
		this.renderercss3d.domElement.style.top = 0;
		container.appendChild( this.renderercss3d.domElement );

		var self = this;
		//function animate() {
			//requestAnimationFrame( animate );
			//trackcontrolcss3d.update();
			//console.log("update?");
			//self.renderercss3d.render( self.scenecss3d, self.cameracss3d );
		//}
		//animate();

		function onWindowResize() {
			self.cameracss3d.aspect = window.innerWidth / window.innerHeight;
			self.cameracss3d.updateProjectionMatrix();
			self.renderercss3d.setSize( window.innerWidth, window.innerHeight );
		}
		window.addEventListener( 'resize', onWindowResize, false );
	}

    //css3d
	setup_trackcamera_css3d(){
		var trackcontrolcss3d = new THREE.TrackballControls( this.cameracss3d );
		trackcontrolcss3d.rotateSpeed = 4;
		trackcontrolcss3d.zoomSpeed = 0.01;
		this.trackcontrolcss3d = trackcontrolcss3d;
	}

    //webgl
	setup_trackcamera(){
		var controls = new THREE.TrackballControls( this.camera );
		controls.rotateSpeed = 4;
		controls.zoomSpeed = 0.01;
		this.trackcamera = controls;
		controls = null;
	}

    setup_webgl(){
		if((this.mode == "editor")||(this.mode == "css3dwebgl")){
			var webgldiv = document.createElement( 'div' );
			webgldiv.style.width = '800px';
			webgldiv.style.height = '600px';
			webgldiv.style.backgroundColor = '#000';
		}

		this.scene = new THREE.Scene();
		this.scene.name = "scene";
		this.scene.uuid = 'B1E79603-A80E-4CE5-9C5E-34B223CEECF9';
		this.scenenodes.push(this.scene);
		//this.scene.background = new THREE.Color( 0xff0000 );
		this.scene.background = new THREE.Color( 0xEEEEEE );
		this.camera = new THREE.PerspectiveCamera( 75, 800/600, 0.1, 1000 );
		//renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
		if((this.mode == "editor")||(this.mode == "css3dwebgl")){
			this.renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true  });
			this.renderer.domElement.style.position = 'absolute';
			this.renderer.domElement.style.top = 0;
			this.renderer.setSize( 800, 600 );
		}else{
			this.canvas = document.getElementById("container");
			this.renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true  });
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.canvas.appendChild(this.renderer.domElement);
		}
		//this.renderer.setClearColor( 0xffffff, 0);
		//this.renderer.setClearColor(0xEEEEEE);
		this.renderer.autoClear = false;
		//this.renderer.shadowMap.enabled = true;
		//this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;

		if((this.mode == "editor")||(this.mode == "css3dwebgl")){
			webgldiv.appendChild(this.renderer.domElement);
			var object = new THREE.CSS3DObject( webgldiv );
			object.position.set( 0, 0, 0 );
			object.rotation.y = 0;
			var group = new THREE.Group();
			group.add( object );
			if(this.mode == "editor"){
				this.setup_editor(group);
			}
			this.scenecss3d.add( group );
		}
		//this.setup_webgl_basics();
		//this.setup_trackcamera();
	}

    setup_renderpass(){
		var copyPass = new THREE.ShaderPass(THREE.CopyShader);
		copyPass.renderToScreen = true;

		var renderpass1 = new THREE.RenderPass(this.scene, this.camera);
		renderpass1.renderToScreen = false;
		if((this.scenehud !=null)&&(this.camerahud != null)){
			var renderpass2 = new THREE.RenderPass(this.scenehud, this.camerahud);
			renderpass2.clear = false;
		}

		this.effectComposer = new THREE.EffectComposer(this.renderer);
		this.effectComposer.addPass(renderpass1);
		if((this.scenehud !=null)&&(this.camerahud != null)){
        	this.effectComposer.addPass(renderpass2);
		}

		this.effectComposer.addPass(copyPass);
	}

    render(){
		requestAnimationFrame(()=>{this.render()});
		//this.cube.rotation.x += 0.1;
		//this.cube.rotation.y += 0.1;
		this.update();
		if(this.trackcamera !=null){
			this.trackcamera.update();
		}

		if(this.trackcontrolcss3d !=null){
			this.trackcontrolcss3d.update();
		}

		//custom update function check
        if (this.scene != null) {
            if (this.bupdateobjects == true) {
                this.scene.traverse(function (object) {
                    if (typeof object.update != 'undefined') {
                        object.update();
                    }
                    if (typeof object.script != 'undefined') {
                        for (var obs in object.script) {
                            if (object.script[obs].update != null) {
                                object.script[obs].update();
                            }
                        }
                    }
                });
            }
        }

		if (this.bablephysics == true) {
            this.updatePhysics();
        }

		if(this.renderercss3d !=null){
			this.renderercss3d.render( this.scenecss3d, this.cameracss3d );
			//console.log("render?");
		}

		//this.renderer.render(this.scene, this.camera);
		if(this.effectComposer !=null){
			this.effectComposer.render();
		}

	}



}
