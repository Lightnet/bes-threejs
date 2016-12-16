"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
/*
	Javascript compile: babeljs ES6
	Simple example to extends threejs game API to run simple test game.
	That run on higher javascript to low javascript when compile with extra features
	from the web browser.
*/

//place holder id
function object3d() {
    this.uuid = "";
    this.name = "";
    return this;
}

var Threejsbes6 = (function () {
    function Threejsbes6(settings) {
        _classCallCheck(this, Threejsbes6);

        this.version = "0.0.1";
        this.antialias = true; //threejs
        this.bfixedassetpath = true;
        this.reload = false; //web browser editor reload url

        this.ToRad = 0.0174532925199432957;

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

        this.bablephysics = false;
        this.physicsIndex = 2;
        this.setPhysicsType = ['Oimo.js', 'Cannon.js', 'Ammo.js'];
        this.timeSteptimeStep = 1 / 60;
        this.world = null;
        this.meshs = [];
        this.bodies = [];
        this.grounds = [];

        this.scenenodes = []; //editor scene
        this.mapscenenodes = [];
        this.scriptcomponents = []; //javascript

        this.mappdata;
        this.scriptcount = 0;
        this.loader = new THREE.XHRLoader();
        //this.CLASSGAME;

        this.scriptlist = ['/js/libs/threex.domevents.js', 'js/loaders/FBXLoader.js', 'js/loaders/collada/Animation.js', 'js/loaders/collada/AnimationHandler.js', 'js/loaders/collada/KeyFrameAnimation.js', 'js/loaders/ColladaLoader.js', 'js/loaders/OBJLoader.js', '/js/controls/TrackballControls.js', '/js/renderers/CSS3DRenderer.js', '/js/shaders/CopyShader.js', '/js/postprocessing/EffectComposer.js', '/js/postprocessing/ClearPass.js', '/js/postprocessing/RenderPass.js', '/js/postprocessing/MaskPass.js', '/js/postprocessing/ShaderPass.js'];

        var self = this;

        this.initloadingscreen();
        this.showloadingscreen();
        //this.loadingscreentext('test...');

        if (settings != null) {
            if (settings['mode'] != null) {
                this.mode = settings['mode'];
            } else {
                this.mode = "game;";
            }
            console.log("mode: " + this.mode);
            if (settings['bupdateobjects'] != null) {
                this.bupdateobjects = settings['bupdateobjects'];
            }
            if (settings['bfixedassetpath'] != null) {
                this.bfixedassetpath = settings['bfixedassetpath'];
            }
            if (settings['bablephysics'] != null) {
                this.bablephysics = settings['bablephysics'];
            }
            //if (settings['_class'] != null) {
            //this.CLASSGAME = settings['_class'];
            //}else{
            //this.CLASSGAME = Threejsbes6;
            //}
            //this need to be last else it variable are not assign
            if (settings['onload'] == true) {
                this.addListener("load", window, (function () {
                    console.log('init window listen threejs setup... ');
                    //_this.init();
                    self.loadlibraries();
                }));
            } else {
                console.log('init threejs setup...');
                //this.init();
                this.loadlibraries();
            }

            if (settings['load'] != null) {
                this.bmap = true;
                this.mapurl = settings['load'];
            } else {
                this.bmap = false;
                this.mapurl = "";
            }
            console.log("Map: " + this.bmap + " url: " + this.mapurl);
        }
        //this.hideloadingscreen();
        //this.showloadingscreen();
    }

    _createClass(Threejsbes6, [{
        key: "initloadingscreen",
        value: function initloadingscreen() {
            var styleloadingscreen = document.createElement("style");
            styleloadingscreen.innerHTML = '';
            styleloadingscreen.innerHTML += '.loader {border: 16px solid #f3f3f3;border-top: 16px solid #3498db;border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;}';
            styleloadingscreen.innerHTML += '\n@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg);}}';
            styleloadingscreen.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(styleloadingscreen);

            var divloadingscreen = document.createElement("div");
            divloadingscreen.id = "loadingscreen";
            divloadingscreen.style['background-color'] = '#dddddd';
            divloadingscreen.style.position = 'absolute';
            divloadingscreen.style.top = 0;
            divloadingscreen.style.left = 0;
            divloadingscreen.style.width = '100%';
            divloadingscreen.style.height = '100%';
            divloadingscreen.innerHTML = "<div style='background-color: #dddddd;position: absolute;left: 0;height: 50%;width: 100%;top: 50%;'><center><div class='loader'></div></center> <center id='loadingscreentext'>Loading...</center></div>";
            document.getElementsByTagName('body')[0].appendChild(divloadingscreen);
        }
    }, {
        key: "loadingscreentext",
        value: function loadingscreentext() {
            var _TEXT = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "loading......";

            document.getElementById('loadingscreentext').innerHTML = _TEXT;
        }
    }, {
        key: "showloadingscreen",
        value: function showloadingscreen() {
            document.getElementById('loadingscreen').style.display = 'block';
        }
    }, {
        key: "hideloadingscreen",
        value: function hideloadingscreen() {
            document.getElementById('loadingscreen').style.display = 'none';
        }
    }, {
        key: "loadlibraries",
        value: function loadlibraries() {
            var scriptcount = 0;
            var scriptlist = this.scriptlist;
            var self = this;
            for (var i = 0; i < scriptlist.length; i++) {
                //threejsapi.addScript(mappdata.scripts[i]);
                this.loadjavascript(scriptlist[i], (function () {
                    //initialization code
                    scriptcount++;
                    //console.log("script: "+scriptcount + ":" + (scriptlist.length));
                    if (scriptcount == scriptlist.length) {
                        //make sure the scripts are load else it can't used script components
                        console.log("script: " + scriptcount + ":" + scriptlist.length);
                        console.log('Finish load javascript libs!');
                        self.init();
                    }
                }));
            }
        }
    }, {
        key: "loadjavascript",
        value: function loadjavascript(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                //Others
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        //script <div id="scriptcomponents"></div> list <script></script>

    }, {
        key: "loadScript",
        value: function loadScript(url, callback) {
            var scriptcomponents;
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                //Others
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            scriptcomponents = document.getElementById('scriptcomponents');
            if (scriptcomponents == null) {
                console.log("<div id='scriptcomponents'> </div> Not found!");
                console.log("creating div id scriptcomponents");
                var _div = document.createElement('div');
                _div.id = 'scriptcomponents';
                document.getElementsByTagName('head')[0].appendChild(_div);
                _div = null;
                scriptcomponents = document.getElementById('scriptcomponents');
            }
            //document.getElementsByTagName("head")[0].appendChild(script);
            scriptcomponents.appendChild(script);
        }
    }, {
        key: "addListener",
        value: function addListener(event, obj, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(event, fn, false); // modern browsers
            } else {
                obj.attachEvent("on" + event, fn); // older versions of IE
            }
        }
    }, {
        key: "setup_network",
        value: function setup_network() {
            var self = this;
            this.socket = io();
            this.socket.on('connect', (function () {
                console.log('server connected');
                if (this.reload) {
                    location.reload();
                }
            }));

            this.socket.on('disconnect', (function () {
                console.log('server disconnected');
                this.reload = true;
            }));
        }
    }, {
        key: "setup_css3d",
        value: function setup_css3d() {
            var container = document.getElementById('container');
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

            this.cameracss3d = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
            //this.cameracss3d.position.set( 500, 350, 750 );
            this.cameracss3d.position.set(0, 0, 1024);
            this.scenecss3d = new THREE.Scene();
            this.renderercss3d = new THREE.CSS3DRenderer();
            this.renderercss3d.setSize(window.innerWidth, window.innerHeight);
            this.renderercss3d.domElement.style.position = 'absolute';
            this.renderercss3d.domElement.style.top = 0;
            container.appendChild(this.renderercss3d.domElement);

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
                self.renderercss3d.setSize(window.innerWidth, window.innerHeight);
            }
            window.addEventListener('resize', onWindowResize, false);
        }

        //css3d

    }, {
        key: "setup_trackcamera_css3d",
        value: function setup_trackcamera_css3d() {
            var trackcontrolcss3d = new THREE.TrackballControls(this.cameracss3d);
            trackcontrolcss3d.rotateSpeed = 4;
            trackcontrolcss3d.zoomSpeed = 0.01;
            this.trackcontrolcss3d = trackcontrolcss3d;
        }

        //webgl

    }, {
        key: "setup_trackcamera",
        value: function setup_trackcamera() {
            var controls = new THREE.TrackballControls(this.camera);
            controls.rotateSpeed = 4;
            controls.zoomSpeed = 0.01;
            this.trackcamera = controls;
            controls = null;
        }
    }, {
        key: "setup_webgl",
        value: function setup_webgl() {
            if (this.mode == "editor" || this.mode == "css3dwebgl") {
                var webgldiv = document.createElement('div');
                webgldiv.style.width = '800px';
                webgldiv.style.height = '600px';
                webgldiv.style.backgroundColor = '#000';
            }

            this.scene = new THREE.Scene();
            this.scene.name = "scene";
            this.scene.uuid = 'B1E79603-A80E-4CE5-9C5E-34B223CEECF9';
            this.scenenodes.push(this.scene);
            //this.scene.background = new THREE.Color( 0xff0000 );
            this.scene.background = new THREE.Color(0xEEEEEE);
            this.camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
            //renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
            if (this.mode == "editor" || this.mode == "css3dwebgl") {
                this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                this.renderer.domElement.style.position = 'absolute';
                this.renderer.domElement.style.top = 0;
                this.renderer.setSize(800, 600);
            } else {
                this.canvas = document.getElementById("container");
                this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.canvas.appendChild(this.renderer.domElement);
            }
            //this.renderer.setClearColor( 0xffffff, 0);
            //this.renderer.setClearColor(0xEEEEEE);
            this.renderer.autoClear = false;
            //this.renderer.shadowMap.enabled = true;
            //this.renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.BasicShadowMap;

            if (this.mode == "editor" || this.mode == "css3dwebgl") {
                webgldiv.appendChild(this.renderer.domElement);
                var object = new THREE.CSS3DObject(webgldiv);
                object.position.set(0, 0, 0);
                object.rotation.y = 0;
                var group = new THREE.Group();
                group.add(object);
                if (this.mode == "editor") {
                    this.setup_editor(group);
                }
                this.scenecss3d.add(group);
            }
            //this.setup_webgl_basics();
            //this.setup_trackcamera();
        }

        //works mesh over lap scenes

    }, {
        key: "setup_hud",
        value: function setup_hud() {
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
        }
    }, {
        key: "setup_hud_draw",
        value: function setup_hud_draw() {
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
            this.hudTexture.minFilter = THREE.LinearFilter;
            this.hudTexture.needsUpdate = true;
            var material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
            material.transparent = true;
            var planeGeometry = new THREE.PlaneGeometry(width, height);
            var plane = new THREE.Mesh(planeGeometry, material);
            this.scenehud.add(plane);
        }
    }, {
        key: "setup_webgl_basics",
        value: function setup_webgl_basics() {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            this.cube = new THREE.Mesh(geometry, material);
            this.scene.add(this.cube);
            //custom update for threejs render call
            this.cube.update = function () {
                this.rotation.x += 0.1;
                this.rotation.y += 0.1;
                //console.log("update?");
            };
            this.camera.position.z = 5;
            this.objects.push(this.cube); //ray cast
            this.setup_mouseraycast();
        }
    }, {
        key: "setup_mouseraycast",
        value: function setup_mouseraycast() {
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            var self = this;
            function onDocumentMouseMove(event) {
                event.preventDefault();
                self.mouse.x = event.clientX / window.innerWidth * 2 - 1;
                self.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                self.raycaster.setFromCamera(self.mouse, self.camera);
                var intersects = self.raycaster.intersectObjects(self.scene.children);

                if (intersects.length > 0) {
                    //console.log(intersects[ 0 ].object);
                }
            }
        }
    }, {
        key: "setup_editor",
        value: function setup_editor(group) {
            var _ref;

            //ASSETS
            //autowidth:true,
            var assetstable = new webix.ui({
                container: "assets",
                view: "datatable",
                columns: [{ id: "filetype", header: "Type" }, { id: "title", header: "Assets", fillspace: true }],
                data: [{ id: 1, title: "test" }, { id: 2, title: "test2" }],
                select: "row",
                on: {
                    "onItemClick": function onItemClick(id, e, trg) {
                        webix.message("Click on row: " + id.row + ", column: " + id.column);
                    }
                } //default click behavior that is true for any datatable cell
            });

            assetstable.add({
                title: "Best film ever"
            });

            var _div_l = document.createElement('div');
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
            _div_l.appendChild(assetsid);

            var object = new THREE.CSS3DObject(_div_l);
            object.position.set(-600, 100, 10);
            object.rotation.y = 0;

            group.add(object);

            // SCENE
            var _div_r = document.createElement('div');
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

            var scenetable = new webix.ui((_ref = {
                container: "scene",
                view: "tree",
                select: true,
                data: [{ id: "root", value: "Cars", open: true, data: [{ id: "1", open: true, value: "Toyota", data: [{ id: "1.1", value: "Avalon" }, { id: "1.2", value: "Corolla" }, { id: "1.3", value: "Camry" }] }, { id: "2", open: true, value: "Skoda", data: [{ id: "2.1", value: "Octavia" }, { id: "2.2", value: "Superb" }] }] }]
            }, _defineProperty(_ref, "select", true), _defineProperty(_ref, "on", { "onItemClick": function onItemClick(id, e, node) {
                    //alert("item has just been clicked");
                    var item = this.getItem(id);
                    console.log(item);
                } }), _ref));
            //http://docs.webix.com/api__link__ui.tree_onitemclick_event.html
            //console.log(scenetable);

            scenetable.add({ value: "New item" }, 0);

            //scenetable.add( {value:"New item"}, 0, parentId);
            //var nodeId = tree.getSelectedId();
            scenetable.add({ value: "New item" }, 0, 2);

            var sceneid = document.getElementById('scene');
            _div_r.appendChild(sceneid);

            var object = new THREE.CSS3DObject(_div_r);
            object.position.set(600, 100, 10);
            object.rotation.y = 0;

            group.add(object);
        }
    }, {
        key: "setup_renderpass",
        value: function setup_renderpass() {
            var copyPass = new THREE.ShaderPass(THREE.CopyShader);
            copyPass.renderToScreen = true;

            var renderpass1 = new THREE.RenderPass(this.scene, this.camera);
            renderpass1.renderToScreen = false;
            if (this.scenehud != null && this.camerahud != null) {
                var renderpass2 = new THREE.RenderPass(this.scenehud, this.camerahud);
                renderpass2.clear = false;
            }

            this.effectComposer = new THREE.EffectComposer(this.renderer);
            this.effectComposer.addPass(renderpass1);
            if (this.scenehud != null && this.camerahud != null) {
                this.effectComposer.addPass(renderpass2);
            }

            this.effectComposer.addPass(copyPass);
        }
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            requestAnimationFrame((function () {
                _this.render();
            }));
            //this.cube.rotation.x += 0.1;
            //this.cube.rotation.y += 0.1;
            this.update();
            if (this.trackcamera != null) {
                this.trackcamera.update();
            }

            if (this.trackcontrolcss3d != null) {
                this.trackcontrolcss3d.update();
            }

            //custom update function check
            if (this.scene != null) {
                if (this.bupdateobjects == true) {
                    this.scene.traverse((function (object) {
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
                    }));
                }
            }

            if (this.bablephysics == true) {
                this.updatePhysics();
            }

            if (this.renderercss3d != null) {
                this.renderercss3d.render(this.scenecss3d, this.cameracss3d);
                //console.log("render?");
            }

            //this.renderer.render(this.scene, this.camera);
            if (this.effectComposer != null) {
                this.effectComposer.render();
            }
        }

        //===============================================
        // Load game map
        //===============================================

    }, {
        key: "load",
        value: function load() {
            console.log("loading map file!");
            var self = this;
            var mappdata = self.mappdata;
            var scriptcount = self.scriptcount;
            //this.mapurl
            //loader.load( 'post-app.json', function ( text ) {
            this.loader.load(this.mapurl, (function (text) {
                var modelfiles = [];
                var modelcount = 0;

                mappdata = JSON.parse(text);
                console.log(mappdata);
                //threejsapi = new CLASSGAME({onload:false,bcanvasRatio:true,bfixedassetpath:false});//config
                //threejsapi = new CLASSGAME(args);//config
                threejsapi = self;
                scriptcount = 0;

                function loadmodelfiles() {
                    console.log("init models loading files");
                    if (mappdata.assets != null) {
                        console.log("Assets files: " + mappdata.assets.length);
                        //if there no model files
                        if (mappdata.assets.length == 0) {
                            loadscriptfiles();
                        }

                        for (var i = 0; i < mappdata.assets.length; i++) {
                            console.log(mappdata.assets[i]);
                            if (mappdata.assets[i].type == "model") {
                                modelfiles.push(mappdata.assets[i]);
                                //modelcount += 1;
                            }
                        }

                        //console.log("model checking...");
                        for (var mi = 0; mi < modelfiles.length; mi++) {
                            //console.log(modelfiles[mi].uuid);
                            var _id = modelfiles[mi].uuid;
                            var _name = modelfiles[mi].path;
                            //console.log('//=========================');
                            //console.log(modelfiles[mi].path);
                            threejsapi.LoadModelFile(modelfiles[mi], (function (object) {
                                console.log('//========================================');
                                //console.log(object.name);
                                //object.name = _name;
                                //console.log(object.uuid);
                                //object.uuid = _id;
                                console.log(object);
                                //console.log(object.uuid);
                                modelcount++;
                                console.log("models: " + modelcount + ":" + modelfiles.length);
                                if (modelcount == modelfiles.length) {
                                    //console.log('Finish loading file models!');
                                    //console.log('init scripts!');
                                    loadscriptfiles();
                                }
                            }));
                        }
                    }
                }

                //load scripts
                function loadscriptfiles() {
                    if (mappdata.scripts != null) {
                        console.log("init script loading files...");
                        console.log("Scripts files: " + mappdata.scripts.length);
                        if (mappdata.scripts.length == 0) {
                            loadentities();
                        }
                        for (var i = 0; i < mappdata.scripts.length; i++) {
                            //threejsapi.addScript(mappdata.scripts[i]);
                            loadScript(mappdata.scripts[i], (function () {
                                //initialization code
                                scriptcount++;
                                //console.log("script: "+scriptcount + ":" + (mappdata.scripts.length));
                                if (scriptcount == mappdata.scripts.length) {
                                    //make sure the scripts are load else it can't used script components
                                    //console.log('Finish script components!');
                                    //console.log('init load entities!');
                                    loadentities();
                                }
                            }));
                        }
                    }
                }
                //load entities
                function loadentities() {
                    console.log('loading entities?');
                    if (mappdata.entities != null) {
                        console.log("Entities count:" + mappdata.entities.length);
                        for (var i = 0; i < mappdata.entities.length; i++) {
                            threejsapi.parseObject(mappdata.entities[i]);
                        }
                        console.log('Finish loading!');

                        self.hideloadingscreen();

                        //self.loadScript("/assets/test1.js", function(){
                        //initialization code
                        //console.log("test? js");
                        //});
                        //console.log(threejsapi);
                    }
                }

                loadmodelfiles();
            }));
        }

        //===============================================
        // scripts components
        //===============================================

    }, {
        key: "clearScripts",
        value: function clearScripts() {
            var myNode = document.getElementById('scriptcomponents');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
    }, {
        key: "addScript",
        value: function addScript(filename) {
            var head = document.getElementById('scriptcomponents');
            var escript = document.createElement('script');
            escript.src = filename;
            escript.type = "text/javascript";
            head.appendChild(escript);
        }
    }, {
        key: "createscript",
        value: function createscript(scriptname, args) {
            console.log('loaded script component name: ' + scriptname);
            this.scriptcomponents[scriptname] = args;
        }
    }, {
        key: "createComponent",
        value: function createComponent(object, name) {
            var capp;
            for (var sc in this.scriptcomponents) {
                if (name == sc) {
                    capp = this.scriptcomponents[sc];
                    //console.log('found!');
                    break;
                }
            }
            if (capp != null) {
                var sapp = capp(this);
                object.script[name] = new sapp(object);
                capp = null;
                sapp = null;
            }
        }

        //===============================================
        // Manager
        //===============================================

    }, {
        key: "initManger",
        value: function initManger() {
            this.manager = new THREE.LoadingManager();
            this.manager.onProgress = function (item, loaded, total) {
                console.log(item, loaded, total);
            };
        }
    }, {
        key: "onProgressModel",
        value: function onProgressModel(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
            }
        }
    }, {
        key: "onErrorModel",
        value: function onErrorModel(xhr) {
            console.log(xhr);
        }

        //===============================================
        // Tool bar
        //===============================================

    }, {
        key: "toolbar",
        value: function toolbar(action) {
            //console.log(action);
            if (action == 'EditorComponents:Object3D') {
                this.createshape({ shape: "Object3D" });
            }
            if (action == 'EditorComponents:Scene') {
                this.createshape({ shape: "Scene" });
            }
            if (action == 'EditorComponents:BoxGeometry') {
                this.createshape({ shape: "BoxGeometry" });
            }
            if (action == 'EditorComponents:CylinderGeometry') {
                this.createshape({ shape: "CylinderGeometry" });
            }
            if (action == 'EditorComponents:CircleGeometry') {
                this.createshape({ shape: "CircleGeometry" });
            }
            if (action == 'EditorComponents:PlaneGeometry') {
                this.createshape({ shape: "PlaneGeometry" });
            }
            if (action == 'EditorComponents:SphereGeometry') {
                this.createshape({ shape: "SphereGeometry" });
            }
            if (action == 'EditorComponents:DodecahedronGeometry') {
                this.createshape({ shape: "DodecahedronGeometry" });
            }
            if (action == 'EditorComponents:IcosahedronGeometry') {
                this.createshape({ shape: "IcosahedronGeometry" });
            }
            if (action == 'EditorComponents:OctahedronGeometry') {
                this.createshape({ shape: "OctahedronGeometry" });
            }
            if (action == 'EditorComponents:RingGeometry') {
                this.createshape({ shape: "RingGeometry" });
            }
            if (action == 'EditorComponents:TetrahedronGeometry') {
                this.createshape({ shape: "TetrahedronGeometry" });
            }
            if (action == 'EditorComponents:TorusGeometry') {
                this.createshape({ shape: "TorusGeometry" });
            }
            if (action == 'EditorComponents:TorusKnotGeometry') {
                this.createshape({ shape: "TorusKnotGeometry" });
            }
            if (action == 'EditorComponents:TextGeometry') {
                this.createshape({ shape: "TextGeometry" });
            }
            if (action == 'EditorComponents:ArrowHelper') {
                this.createshape({ shape: "ArrowHelper" });
            }
            if (action == 'EditorComponents:AxisHelper') {
                this.createshape({ shape: "AxisHelper" });
            }
            if (action == 'EditorComponents:BoundingBoxHelper') {
                this.createshape({ shape: "BoundingBoxHelper" });
            }
            if (action == 'EditorComponents:EdgesHelper') {
                this.createshape({ shape: "EdgesHelper" });
            }
            if (action == 'EditorComponents:FaceNormalsHelper') {
                this.createshape({ shape: "FaceNormalsHelper" });
            }
            if (action == 'EditorComponents:GridHelper') {
                this.createshape({ shape: "GridHelper" });
            }
            if (action == 'EditorComponents:PointLightHelper') {
                this.createshape({ shape: "PointLightHelper" });
            }
            if (action == 'EditorComponents:SpotLightHelper') {
                this.createshape({ shape: "SpotLightHelper" });
            }
            if (action == 'EditorComponents:VertexNormalsHelper') {
                this.createshape({ shape: "VertexNormalsHelper" });
            }
            if (action == 'EditorComponents:WireframeHelper') {
                this.createshape({ shape: "WireframeHelper" });
            }
            if (action == 'EditorComponents:Sprite2D') {
                this.createshape({ shape: "Sprite" });
            }
            if (action == 'EditorComponents:CubeCamera') {
                this.createObjectScene({ object: 'CubeCamera' });
            }
            if (action == 'EditorComponents:PerspectiveCamera') {
                this.createObjectScene({ object: 'PerspectiveCamera' });
            }
            if (action == 'EditorComponents:OrthographicCamera') {
                this.createObjectScene({ object: 'OrthographicCamera' });
            }
            if (action == 'EditorComponents:AmbientLight') {
                this.createObjectScene({ object: 'AmbientLight' });
            }
            if (action == 'EditorComponents:DirectionalLight') {
                this.createObjectScene({ object: 'DirectionalLight' });
            }
            if (action == 'EditorComponents:HemisphereLight') {
                this.createObjectScene({ object: 'HemisphereLight' });
            }
            if (action == 'EditorComponents:Light') {
                this.createObjectScene({ object: 'Light' });
            }
            if (action == 'EditorComponents:PointLight') {
                this.createObjectScene({ object: 'PointLight' });
            }
            if (action == 'EditorComponents:SpotLight') {
                this.createObjectScene({ object: 'SpotLight' });
            }
        }

        //===============================================
        //
        //===============================================

    }, {
        key: "createObjectScene",
        value: function createObjectScene(args) {
            if (args != null) {
                if (args['object'] != null) {
                    var objscene;
                    if (args['object'] == 'PerspectiveCamera') {
                        objscene = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
                        objscene.name = "PerspectiveCamera";
                        var cameraHelper = new THREE.CameraHelper(objscene);
                        //this.scene.add(cameraHelper);
                        objscene.add(cameraHelper);
                    }
                    if (args['object'] == 'OrthographicCamera') {
                        objscene = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 10000);
                        objscene.name = "OrthographicCamera";
                        var cameraHelper = new THREE.CameraHelper(objscene);
                        objscene.helper = cameraHelper;
                        this.scene.add(cameraHelper);
                    }
                    if (args['object'] == 'CubeCamera') {
                        objscene = new THREE.CubeCamera(1, 100000, 128);
                        objscene.name = "CubeCamera";
                    }
                    if (args['object'] == 'AmbientLight') {
                        objscene = new THREE.AmbientLight(0x404040); // soft white light
                        objscene.name = "AmbientLight";
                    }
                    if (args['object'] == 'DirectionalLight') {
                        objscene = new THREE.DirectionalLight(0xffffff, 0.5);
                        objscene.position.set(0, 1, 0);
                        objscene.name = "DirectionalLight";
                        var dlightHelper = new THREE.DirectionalLightHelper(objscene, 5);
                        objscene.helper = dlightHelper;
                        this.scene.add(dlightHelper);
                    }
                    if (args['object'] == 'HemisphereLight') {
                        objscene = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
                        objscene.name = "HemisphereLight";
                        var HLightHelper = new THREE.HemisphereLightHelper(objscene, 5);
                        objscene.helper = HLightHelper;
                        this.scene.add(HLightHelper);
                    }
                    if (args['object'] == 'Light') {
                        objscene = new THREE.Light(0xff0000);
                        objscene.name = "Light";
                    }
                    if (args['object'] == 'PointLight') {
                        objscene = new THREE.PointLight(0xff0000, 1, 100);
                        objscene.name = "PointLight";
                        var pointLightHelper = new THREE.PointLightHelper(objscene, 5);
                        objscene.helper = pointLightHelper;
                        this.scene.add(pointLightHelper);
                    }
                    if (args['object'] == 'SpotLight') {
                        objscene = new THREE.SpotLight(0xffffff);
                        objscene.name = "SpotLight";
                        var spotLightHelper = new THREE.SpotLightHelper(objscene);
                        objscene.helper = spotLightHelper;
                        this.scene.add(spotLightHelper);
                    }
                    if (objscene != null) {
                        if (this.selectobject != null) {
                            this.selectobject.add(objscene); //attach to current selected
                        } else {
                            this.scene.add(objscene);
                        }
                        this.scenenodes.push(objscene);
                        //console.log('create object?');
                        console.log(objscene);
                        NodeSelectObject({ object: objscene });
                        var tmpmap = this.copyobjectprops(objscene);
                        //console.log(tmpmap);
                        this.mapscenenodes.push(tmpmap);
                    }
                }
            }
        }

        //===============================================
        //
        //===============================================

    }, {
        key: "parentObj",
        value: function parentObj(object, uuid) {
            //console.log("ADDED");
            //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            //var cube = new THREE.Mesh( geometry, material );
            //this.scene.add(cube);
            //this.scene.add(object);
            //this.camera.position.z = 5;
            for (var i = 0; i < this.scenenodes.length; i++) {
                if (this.scenenodes[i].uuid == uuid) {
                    //console.log("added?");
                    this.scenenodes[i].add(object);
                    //console.log(this.scenenodes[i]);
                    //console.log("===?");
                    break;
                }
            }
        }
    }, {
        key: "parseObject",
        value: function parseObject(strobj) {
            var tmpobj;
            var geometry;
            var objmesh;
            var edges;
            var material;
            var obj;

            material = new THREE.MeshPhongMaterial({
                color: 0x156289,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            });
            if (typeof strobj == 'string') {
                obj = JSON.parse(strobj);
            } else {
                obj = strobj;
            }
            //console.log(obj);
            //this.mapscenenodes.push(obj);
            if (obj.type == "Object3D") {
                objmesh = new THREE.Object3D();
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
            }
            if (obj.type == "CubeCamera") {
                objmesh = new THREE.CubeCamera(obj.near, obj.far, obj.cubeResolution);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
            }
            if (obj.type == "OrthographicCamera") {
                objmesh = new THREE.OrthographicCamera(obj.left, obj.right, obj.top, obj.bottom, obj.near, obj.far);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
                var cameraHelper = new THREE.CameraHelper(objmesh);
                objmesh.helper = cameraHelper;
                this.scene.add(cameraHelper);
            }
            if (obj.type == "PerspectiveCamera") {
                objmesh = new THREE.PerspectiveCamera(obj.fov, obj.aspect, obj.near, obj.far);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
                var cameraHelper = new THREE.CameraHelper(objmesh);
                objmesh.helper = cameraHelper;
                this.scene.add(cameraHelper);
            }
            if (obj.type == "AmbientLight") {
                objmesh = new THREE.AmbientLight(obj.color, obj.intensity);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
            }
            if (obj.type == "DirectionalLight") {
                objmesh = new THREE.DirectionalLight(obj.color, obj.intensity);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
                var dlightHelper = new THREE.DirectionalLightHelper(objmesh, 5);
                objmesh.helper = dlightHelper;
                this.scene.add(dlightHelper);
            }
            if (obj.type == "HemisphereLight") {
                objmesh = new THREE.HemisphereLight(obj.skyColor, obj.groundColor, obj.intensity);
                //console.log(obj.skyColor);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
                var HLightHelper = new THREE.HemisphereLightHelper(objmesh, 5);
                objmesh.helper = HLightHelper;
                this.scene.add(HLightHelper);
            }
            if (obj.type == "Light") {
                objmesh = new THREE.Light(obj.color, obj.intensity);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
            }
            if (obj.type == "PointLight") {
                objmesh = new THREE.PointLight(obj.color, obj.intensity, obj.distance, obj.decay);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
                var pointLightHelper = new THREE.PointLightHelper(objmesh, 5);
                objmesh.helper = pointLightHelper;
                this.scene.add(pointLightHelper);
            }
            if (obj.type == "SpotLight") {
                objmesh = new THREE.SpotLight(obj.color, obj.intensity, obj.distance, obj.angle, obj.penumbra, obj.decay);
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
                var spotLightHelper = new THREE.SpotLightHelper(objmesh);
                objmesh.helper = spotLightHelper;
                this.scene.add(spotLightHelper);
            }
            if (obj.type == "Scene") {
                objmesh = new THREE.Scene();
                objmesh.uuid = obj.uuid;
                objmesh.name = obj.name;
            }
            //console.log(objmesh);
            if (obj.type == "Mesh") {
                if (obj.geometrytype == "BoxGeometry") {
                    geometry = new THREE.BoxGeometry(obj.parameters.width, obj.parameters.height, obj.parameters.depth, obj.parameters.widthSegments, obj.parameters.heightSegments, obj.parameters.depthSegments);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "CircleGeometry") {
                    geometry = new THREE.CircleGeometry(obj.parameters.radius, obj.parameters.segments, obj.parameters.thetaStart, obj.parameters.thetaLength);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "CylinderGeometry") {
                    geometry = new THREE.CylinderGeometry(obj.parameters.radiusTop, obj.parameters.radiusBottom, obj.parameters.height, obj.parameters.radiusSegments, obj.parameters.heightSegments, obj.parameters.openEnded, obj.parameters.thetaStart, obj.parameters.thetaLength);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "PlaneGeometry") {
                    geometry = new THREE.PlaneGeometry(obj.parameters.width, obj.parameters.height, obj.parameters.widthSegments, obj.parameters.heightSegments);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "PlaneGeometry") {
                    geometry = new THREE.PlaneGeometry(obj.parameters.width, obj.parameters.height, obj.parameters.widthSegments, obj.parameters.heightSegments);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "SphereGeometry") {
                    geometry = new THREE.SphereGeometry(obj.parameters.radius, obj.parameters.widthSegments, obj.parameters.heightSegments, obj.parameters.phiStart, obj.parameters.phiLength, obj.parameters.thetaStart, obj.parameters.thetaLength);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "DodecahedronGeometry") {
                    geometry = new THREE.DodecahedronGeometry(obj.parameters.radius, obj.parameters.detail);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "IcosahedronGeometry") {
                    geometry = new THREE.IcosahedronGeometry(obj.parameters.radius, obj.parameters.detail);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "OctahedronGeometry") {
                    geometry = new THREE.OctahedronGeometry(obj.parameters.radius, obj.parameters.detail);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "RingGeometry") {
                    geometry = new THREE.RingGeometry(obj.parameters.innerRadius, obj.parameters.outerRadius, obj.parameters.thetaSegments, obj.parameters.phiSegments, obj.parameters.thetaStart, obj.parameters.thetaLength);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "TetrahedronGeometry") {
                    geometry = new THREE.TetrahedronGeometry(obj.parameters.radius, obj.parameters.detail);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "TorusGeometry") {
                    geometry = new THREE.TorusGeometry(obj.parameters.radius, obj.parameters.tube, obj.parameters.radialSegments, obj.parameters.tubularSegments, obj.parameters.arc);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
                if (obj.geometrytype == "TorusKnotGeometry") {
                    geometry = new THREE.TorusKnotGeometry(obj.parameters.radius, obj.parameters.tube, obj.parameters.radialSegments, obj.parameters.tubularSegments, obj.parameters.p, obj.parameters.q, obj.parameters.heightScale);
                    objmesh = new THREE.Mesh(geometry, material);
                    objmesh.uuid = obj.uuid;
                    objmesh.name = obj.name;
                }
            }
            //check if script component exist
            if (obj.script != null) {
                if (objmesh != null) {
                    objmesh.script = {};
                    for (var os in obj.script) {
                        this.createComponent(objmesh, os);
                        for (var sv in obj.script[os]) {
                            if (typeof obj.script[os][sv] != 'function') {
                                //need make object data variable work current doesn't work
                                if (_typeof(obj.script[os][sv]) == 'object') {
                                    //console.log('OBJECT    script');
                                    //console.log('obj.script'+ os+'.'+sv);
                                    if (Array.isArray(obj.script[os][sv])) {
                                        //console.log('found array object');
                                        objmesh.script[os][sv] = obj.script[os][sv];
                                    } else {
                                        if (obj.script[os][sv].type != null) {
                                            //console.log('found type! :'+obj.script[os][sv].type);
                                            if (obj.script[os][sv].type == 'THREE.Vector2') {
                                                objmesh.script[os][sv] = new THREE.Vector2(obj.script[os][sv].x, obj.script[os][sv].y);
                                            }
                                            if (obj.script[os][sv].type == 'THREE.Vector3') {
                                                objmesh.script[os][sv] = new THREE.Vector3(obj.script[os][sv].x, obj.script[os][sv].y, obj.script[os][sv].z);
                                            }
                                            if (obj.script[os][sv].type == 'THREE.Vector4') {
                                                objmesh.script[os][sv] = new THREE.Vector4(obj.script[os][sv].x, obj.script[os][sv].y, obj.script[os][sv].z, obj.script[os][sv].w);
                                            }
                                            if (obj.script[os][sv].type == 'THREE.Quaternion') {
                                                objmesh.script[os][sv] = new THREE.Quaternion(obj.script[os][sv].x, obj.script[os][sv].y, obj.script[os][sv].z, obj.script[os][sv].w);
                                            }
                                        }
                                    }
                                } else {
                                    //console.log('Script object:'+os);
                                    //console.log('VAR OTHER:'+sv);
                                    //console.log(typeof obj.script[os][sv]);
                                    //console.log(obj.script[os][sv]);
                                    //console.log(objmesh.script[os]);
                                    //console.log('VAR OTHER:'+sv);
                                    objmesh.script[os][sv] = obj.script[os][sv]; //copy variable
                                }
                            }
                        }
                    }
                }
            }
            if (objmesh != null) {
                //console.log(obj.position);
                //console.log(parseFloat(obj.position.x),parseFloat(obj.position.y),parseFloat(obj.position.z));
                objmesh.position.set(parseFloat(obj.position.x), parseFloat(obj.position.y), parseFloat(obj.position.z));
                //console.log(obj.rotation);
                objmesh.rotation.x = parseFloat(obj.rotation._x);
                objmesh.rotation.y = parseFloat(obj.rotation._y);
                objmesh.rotation.z = parseFloat(obj.rotation._z);
                objmesh.scale.set(parseFloat(obj.scale.x), parseFloat(obj.scale.y), parseFloat(obj.scale.z));
                //objmesh.rotation = obj.rotation;
                //objmesh.scale = obj.scale;
                tmpobj = objmesh;
            }
            if (tmpobj != null) {
                /*
                if(this.selectobject != null){
                    this.selectobject.add(tmpobj); //attach to current selected
                }else{
                    this.scene.add(tmpobj);
                }
                */
                this.parentObj(tmpobj, obj.parent);
                //console.log(tmpobj);
                this.scenenodes.push(tmpobj);
                //NodeSelectObject({object:tmpobj});
                var tmpmap = this.copyobjectprops(objmesh);
                //console.log("obj");
                //console.log(obj);
                //console.log("tmpmap");
                //console.log(tmpmap);
                this.mapscenenodes.push(tmpmap);
                //console.log(tmpobj);
                tmpobj = null;
                geometry = null;
                objmesh = null;
                edges = null;
                material = null;
            }
        }
    }, {
        key: "updateGroupGeometry",
        value: function updateGroupGeometry(mesh, geometry) {
            mesh.geometry.dispose();
            mesh.geometry = geometry;
        }
    }, {
        key: "SetParamGeom",
        value: function SetParamGeom(mesh) {
            if (mesh.geometry.type == "BoxGeometry") {
                this.updateGroupGeometry(mesh, new THREE.BoxGeometry(mesh.geometry.parameters.width, mesh.geometry.parameters.height, mesh.geometry.parameters.depth, mesh.geometry.parameters.widthSegments, mesh.geometry.parameters.heightSegments, mesh.geometry.parameters.depthSegments));
            }
            if (mesh.geometry.type == "CircleGeometry") {
                this.updateGroupGeometry(mesh, new THREE.CircleGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.segments, mesh.geometry.parameters.thetaStart, mesh.geometry.parameters.thetaLength));
            }
            if (mesh.geometry.type == "CylinderGeometry") {
                this.updateGroupGeometry(mesh, new THREE.CylinderGeometry(mesh.geometry.parameters.radiusTop, mesh.geometry.parameters.radiusBottom, mesh.geometry.parameters.height, mesh.geometry.parameters.radiusSegments, mesh.geometry.parameters.heightSegments, mesh.geometry.parameters.openEnded, mesh.geometry.parameters.thetaStart, mesh.geometry.parameters.thetaLength));
            }
            if (mesh.geometry.type == "PlaneGeometry") {
                this.updateGroupGeometry(mesh, new THREE.PlaneGeometry(mesh.geometry.parameters.width, mesh.geometry.parameters.height, mesh.geometry.parameters.widthSegments, mesh.geometry.parameters.heightSegments));
            }
            if (mesh.geometry.type == "SphereGeometry") {
                this.updateGroupGeometry(mesh, new THREE.SphereGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.widthSegments, mesh.geometry.parameters.heightSegments, mesh.geometry.parameters.phiStart, mesh.geometry.parameters.phiLength, mesh.geometry.parameters.thetaStart, mesh.geometry.parameters.thetaLength));
            }
            if (mesh.geometry.type == "DodecahedronGeometry") {
                this.updateGroupGeometry(mesh, new THREE.DodecahedronGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.detail));
            }
            if (mesh.geometry.type == "IcosahedronGeometry") {
                this.updateGroupGeometry(mesh, new THREE.IcosahedronGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.detail));
            }
            if (mesh.geometry.type == "OctahedronGeometry") {
                this.updateGroupGeometry(mesh, new THREE.OctahedronGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.detail));
            }
            if (mesh.geometry.type == "RingGeometry") {
                this.updateGroupGeometry(mesh, new THREE.RingGeometry(mesh.geometry.parameters.innerRadius, mesh.geometry.parameters.outerRadius, mesh.geometry.parameters.thetaSegments, mesh.geometry.parameters.phiSegments, mesh.geometry.parameters.thetaStart, mesh.geometry.parameters.thetaLength));
            }
            if (mesh.geometry.type == "TetrahedronGeometry") {
                this.updateGroupGeometry(mesh, new THREE.TetrahedronGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.detail));
            }
            if (mesh.geometry.type == "TorusGeometry") {
                this.updateGroupGeometry(mesh, new THREE.TorusGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.tube, mesh.geometry.parameters.radialSegments, mesh.geometry.parameters.tubularSegments, mesh.geometry.parameters.arc));
            }
            if (mesh.geometry.type == "TorusKnotGeometry") {
                this.updateGroupGeometry(mesh, new THREE.TorusKnotGeometry(mesh.geometry.parameters.radius, mesh.geometry.parameters.tube, mesh.geometry.parameters.radialSegments, mesh.geometry.parameters.tubularSegments, mesh.geometry.parameters.p, mesh.geometry.parameters.q, mesh.geometry.parameters.heightScale));
            }
        }
    }, {
        key: "copyobjectprops",
        value: function copyobjectprops(obj) {
            //console.log('//  = processing ');
            var o3d = new object3d();
            o3d.uuid = obj.uuid;
            o3d.name = obj.name;
            o3d.type = obj.type;
            if (obj.parent != null) {
                o3d.parent = obj.parent.uuid;
            } else {
                o3d.parent = null;
            }
            if (obj.bdisplay != null) {
                o3d.bdisplay = obj.bdisplay;
            }
            if (obj.type == "CubeCamera") {
                o3d.near = obj.near;
                o3d.far = obj.far;
                o3d.cubeResolution = obj.cubeResolution;
            }
            if (obj.type == "PerspectiveCamera") {
                o3d.fov = obj.fov;
                o3d.aspect = obj.aspect;
                o3d.near = obj.near;
                o3d.far = obj.far;
            }
            if (obj.type == "OrthographicCamera") {
                o3d.left = obj.left;
                o3d.right = obj.right;
                o3d.top = obj.top;
                o3d.bottom = obj.bottom;
                o3d.near = obj.near;
                o3d.far = obj.far;
            }
            if (obj.type == "AmbientLight") {
                o3d.color = obj.color;
                o3d.intensity = obj.intensity;
            }
            if (obj.type == "DirectionalLight") {
                o3d.color = obj.color;
                o3d.intensity = obj.intensity;
            }
            if (obj.type == "HemisphereLight") {
                o3d.skyColor = obj.color;
                //console.log(obj.color);
                o3d.groundColor = obj.groundColor;
                o3d.intensity = obj.intensity;
            }
            if (obj.type == "Light") {
                o3d.skyColor = obj.color;
                o3d.intensity = obj.intensity;
            }
            if (obj.type == "PointLight") {
                o3d.color = obj.color;
                o3d.intensity = obj.intensity;
                o3d.distance = obj.distance;
                o3d.decay = obj.decay;
            }
            if (obj.type == "SpotLight") {
                o3d.color = obj.color;
                o3d.intensity = obj.intensity;
                o3d.distance = obj.distance;
                o3d.angle = obj.angle;
                o3d.penumbra = obj.penumbra;
                o3d.decay = obj.decay;
            }
            o3d.children = [];
            if (obj.geometry != null) {
                o3d.geometrytype = obj.geometry.type;
                if (obj.geometry.parameters != null) {
                    o3d.parameters = obj.geometry.parameters;
                }
            }
            if (obj.script != null) {
                /*
                var is_array = function (value) {
                    return value &&
                    typeof value === 'object' &&
                    typeof value.length === 'number' &&
                    typeof value.splice === 'function' &&
                    !(value.propertyIsEnumerable('length'));
                };
                */
                o3d.script = {}; //create script object
                for (var os in obj.script) {
                    o3d.script[os] = {}; //create object
                    for (var param in obj.script[os]) {
                        //console.log(typeof obj.script[os][param]);
                        //console.log(obj.script[os][param]);
                        if (_typeof(obj.script[os][param]) == 'object') {
                            if (param != 'entity') {
                                //console.log('checking object type?');
                                //console.log('obj.script.'+os+'.'+''+param);
                                if (obj.script[os][param] instanceof THREE.Object3D) {
                                    if (obj.script[os][param].type == 'Object3D') {
                                        //console.log(obj.script[os][param]);
                                        //console.log('found Object3D!');
                                        //o3d.script[os][param] = obj.script[os][param]; // error on geometry uuid if not set
                                        o3d.script[os][param] = { type: 'Object3D', uuid: obj.script[os][param].uuid };
                                    }
                                }
                                if (obj.script[os][param] instanceof THREE.Mesh) {
                                    console.log(obj.script[os][param]);
                                    console.log('found Mesh!');
                                    //o3d.script[os][param] = obj.script[os][param]; // error on geometry uuid if not set
                                    o3d.script[os][param] = { type: 'Mesh', uuid: obj.script[os][param].uuid };
                                }
                                if (Object.prototype.toString.call(obj.script[os][param]) === '[object Array]') {
                                    console.log(obj.script[os][param]);
                                    //console.log('found object Array!');
                                    o3d.script[os][param] = obj.script[os][param];
                                }
                                if (obj.script[os][param] instanceof THREE.Vector2) {
                                    //console.log(obj.script[os][param]);
                                    //console.log('found THREE.Vector2!');
                                    o3d.script[os][param] = obj.script[os][param];
                                    o3d.script[os][param] = { type: 'THREE.Vector2', x: obj.script[os][param].x, y: obj.script[os][param].y };
                                }
                                if (obj.script[os][param] instanceof THREE.Vector3) {
                                    //console.log(obj.script[os][param]);
                                    //console.log('found THREE.Vector3!');
                                    //o3d.script[os][param] = obj.script[os][param];
                                    o3d.script[os][param] = { type: 'THREE.Vector3', x: obj.script[os][param].x, y: obj.script[os][param].y, z: obj.script[os][param].z };
                                }
                                if (obj.script[os][param] instanceof THREE.Vector4) {
                                    //console.log(obj.script[os][param]);
                                    //console.log('found THREE.Vector4!');
                                    //o3d.script[os][param] = obj.script[os][param];
                                    o3d.script[os][param] = { type: 'THREE.Vector4', x: obj.script[os][param].x, y: obj.script[os][param].y, z: obj.script[os][param].z, w: obj.script[os][param].w };
                                }
                                if (obj.script[os][param] instanceof THREE.Quaternion) {
                                    //console.log(obj.script[os][param]);
                                    //console.log('found THREE.Quaternion!');
                                    //o3d.script[os][param] = obj.script[os][param];
                                    o3d.script[os][param] = { type: 'THREE.Quaternion', x: obj.script[os][param].x, y: obj.script[os][param].y, z: obj.script[os][param].z, w: obj.script[os][param].w };
                                }
                            }
                        }
                        if (typeof obj.script[os][param] == 'string') {
                            o3d.script[os][param] = obj.script[os][param]; //assign var
                        }
                        if (typeof obj.script[os][param] == 'string') {
                            o3d.script[os][param] = obj.script[os][param]; //assign var
                        }
                        if (typeof obj.script[os][param] == 'boolean') {
                            o3d.script[os][param] = obj.script[os][param]; //assign var
                        }
                        if (typeof obj.script[os][param] == 'number') {
                            o3d.script[os][param] = obj.script[os][param]; //assign var
                        }
                    }
                }
            }
            o3d.position = obj.position;
            o3d.rotation = obj.rotation;
            o3d.scale = obj.scale;
            return o3d;
        }
    }, {
        key: "createshape",
        value: function createshape(args) {
            if (args != null) {
                if (args['shape'] != null) {
                    var tmpobj;
                    var geometry;
                    var objmesh;
                    var edges;
                    var material;
                    var tmpmap;
                    if (args['shape'] == 'Scene') {
                        objmesh = new THREE.Scene();
                        objmesh.name = "Scene";
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'Sprite') {
                        //var map = new THREE.Textureer().( "sprite.png" );
                        //var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
                        material = new THREE.SpriteMaterial({ color: 0xffffff, fog: true });
                        objmesh = new THREE.Sprite(material);
                        objmesh.name = 'Sprite';
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'Object3D') {
                        //console.log('object 3d??');
                        objmesh = new THREE.Object3D();
                        objmesh.name = 'Object3D';
                        //console.log(objmesh);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'BoxGeometry') {
                        geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
                        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "BoxGeometry";
                        console.log(objmesh);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'CircleGeometry') {
                        geometry = new THREE.CircleGeometry(2, 8, 0, 2 * Math.PI);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "CircleGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'CylinderGeometry') {
                        geometry = new THREE.CylinderGeometry(5, 5, 10, 8, 1, false, 0, 2 * Math.PI);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "CylinderGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'PlaneGeometry') {
                        geometry = new THREE.PlaneGeometry(10, 10, 1, 1);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "PlaneGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'SphereGeometry') {
                        geometry = new THREE.SphereGeometry(5, 32, 32, 0, 2 * Math.PI, 0, 2 * Math.PI);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "SphereGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'DodecahedronGeometry') {
                        geometry = new THREE.DodecahedronGeometry(1, 0);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "DodecahedronGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'IcosahedronGeometry') {
                        geometry = new THREE.IcosahedronGeometry(1, 0);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "IcosahedronGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'OctahedronGeometry') {
                        geometry = new THREE.OctahedronGeometry(1, 0);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "OctahedronGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'RingGeometry') {
                        geometry = new THREE.RingGeometry(1, 5, 8, 1, 0, 2 * Math.PI);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "RingGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'TetrahedronGeometry') {
                        geometry = new THREE.TetrahedronGeometry(1, 0);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "TetrahedronGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'TorusGeometry') {
                        geometry = new THREE.TorusGeometry(10, 3, 16, 100, 2 * Math.PI);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "TorusGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'TorusKnotGeometry') {
                        geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16, 2, 3, 1);
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "TorusKnotGeometry";
                        console.log(objmesh.geometry.parameters);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'TextGeometry') {
                        geometry = new THREE.TextGeometry('Text', {});
                        material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        objmesh = new THREE.Mesh(geometry, material);
                        objmesh.name = "TextGeometry";
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'ArrowHelper') {
                        var dir = new THREE.Vector3(1, 0, 0);
                        var origin = new THREE.Vector3(0, 0, 0);
                        var length = 1;
                        var hex = 0xffff00;
                        var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
                        tmpobj = arrowHelper;
                    }
                    if (args['shape'] == 'AxisHelper') {
                        var axisHelper = new THREE.AxisHelper(5);
                        tmpobj = axisHelper;
                    }
                    if (args['shape'] == 'BoundingBoxHelper') {
                        objmesh = new THREE.Object3D();
                        var hex = 0xff0000;
                        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
                        var sphere = new THREE.Mesh(new THREE.SphereGeometry(30, 12, 12), sphereMaterial);
                        objmesh.add(sphere);
                        var bbox = new THREE.BoundingBoxHelper(sphere, hex);
                        bbox.update();
                        objmesh.add(bbox);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'EdgesHelper') {
                        objmesh = new THREE.Object3D();
                        geometry = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2);
                        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                        var object = new THREE.Mesh(geometry, material);
                        edges = new THREE.EdgesHelper(object, 0x00ff00);
                        objmesh.add(object);
                        objmesh.add(edges);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'FaceNormalsHelper') {
                        objmesh = new THREE.Object3D();
                        geometry = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2);
                        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                        var object = new THREE.Mesh(geometry, material);
                        edges = new THREE.FaceNormalsHelper(object, 2, 0x00ff00, 1);
                        objmesh.add(object);
                        objmesh.add(edges);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'GridHelper') {
                        var size = 10;
                        var step = 1;
                        var gridHelper = new THREE.GridHelper(size, step);
                        tmpobj = gridHelper;
                    }
                    if (args['shape'] == 'PointLightHelper') {
                        objmesh = new THREE.Object3D();
                        var pointLight = new THREE.PointLight(0xff0000, 1, 100);
                        pointLight.position.set(10, 10, 10);
                        objmesh.add(pointLight);
                        var sphereSize = 1;
                        var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
                        objmesh.add(pointLightHelper);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'SpotLightHelper') {
                        objmesh = new THREE.Object3D();
                        var spotLight = new THREE.SpotLight(0xffffff);
                        spotLight.position.set(10, 10, 10);
                        objmesh.add(spotLight);
                        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
                        objmesh.add(spotLightHelper);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'VertexNormalsHelper') {
                        objmesh = new THREE.Object3D();
                        geometry = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2);
                        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                        var object = new THREE.Mesh(geometry, material);
                        edges = new THREE.VertexNormalsHelper(object, 2, 0x00ff00, 1);
                        objmesh.add(object);
                        objmesh.add(edges);
                        tmpobj = objmesh;
                    }
                    if (args['shape'] == 'WireframeHelper') {
                        objmesh = new THREE.Object3D();
                        geometry = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2);
                        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                        var object = new THREE.Mesh(geometry, material);
                        var wireframe = new THREE.WireframeHelper(object, 0x00ff00);
                        objmesh.add(object);
                        objmesh.add(wireframe);
                        tmpobj = objmesh;
                    }
                    if (tmpobj != null) {
                        if (this.selectobject != null) {
                            this.selectobject.add(tmpobj); //attach to current selected
                        } else {
                            this.scene.add(tmpobj);
                        }
                        this.scenenodes.push(tmpobj);
                        console.log('create object?');
                        console.log(tmpobj);
                        NodeSelectObject({ object: tmpobj });
                        tmpmap = this.copyobjectprops(objmesh);
                        //console.log(tmpmap);
                        this.mapscenenodes.push(tmpmap);
                        //var test3d = new object3d();
                        //console.log(test3d);
                        tmpobj = null;
                        geometry = null;
                        objmesh = null;
                        edges = null;
                        material = null;
                    }
                }
            }
        }

        //===============================================
        // Load File
        //===============================================

    }, {
        key: "getext",
        value: function getext(filename) {
            return filename.substr(filename.lastIndexOf('.'));
        }
    }, {
        key: "LoadFile",
        value: function LoadFile(filename) {
            console.log('file: ' + filename);
            var self = this;
            if (this.getext(filename) == '.fbx') {
                this.LoadFBX(filename, (function (object) {
                    self.scene.add(object);
                }));
            }
            if (this.getext(filename) == '.dae') {
                this.LoadDAE(filename, (function (object) {
                    self.scene.add(object);
                }));
            }
            if (this.getext(filename) == '.obj') {
                this.LoadOBJ(filename, (function (object) {
                    self.scene.add(object);
                }));
            }
            if (this.getext(filename) == '.js') {
                this.LoadJSONObj(filename, (function (object) {
                    self.scene.add(object);
                }));
            }
            if (this.getext(filename) == '.json') {
                this.LoadJSONObj(filename, (function (object) {
                    self.scene.add(object);
                }));
            }
        }
    }, {
        key: "LoadModelFile",
        value: function LoadModelFile(args, callback) {
            console.log('file: ' + args.path);
            var self = this;
            if (this.getext(args.path) == '.fbx') {
                this.LoadFBX(args.path, (function (object) {
                    //self.scene.add(object);
                    object.uuid = args.uuid;
                    callback(object);
                }));
            }
            if (this.getext(args.path) == '.dae') {
                this.LoadDAE(args.path, (function (object) {
                    //self.scene.add(object);
                    object.uuid = args.uuid;
                    callback(object);
                }));
            }
            if (this.getext(args.path) == '.obj') {
                this.LoadOBJ(args.path, (function (object) {
                    //self.scene.add(object);
                    //console.log("done object loading????");
                    object.uuid = args.uuid;
                    callback(object);
                }));
            }
            if (this.getext(args.path) == '.js') {
                this.LoadJSONObj(args.path, (function (object) {
                    //self.scene.add( object );
                    object.uuid = args.uuid;
                    callback(object);
                }));
            }
            if (this.getext(args.path) == '.json') {
                this.LoadJSONObj(args.path, (function (object) {
                    //self.scene.add( object );
                    object.uuid = args.uuid;
                    callback(object);
                }));
            }
        }
    }, {
        key: "LoadJSONObj",
        value: function LoadJSONObj(filename, callback) {
            var filepath;
            if (this.bfixedassetpath) {
                filepath = "/assets/" + filename;
            } else {
                filename;
                filepath = filename;
            }
            var loader = new THREE.JSONLoader();
            var name = filename;
            var self = this;
            var name = filename;
            loader.load(filepath, (function (geometry, materials) {
                var material = materials[0];
                material.morphTargets = true;
                material.color.setHex(0xffaaaa);
                var faceMaterial = new THREE.MultiMaterial(materials);
                var mesh = new THREE.Mesh(geometry, faceMaterial);
                mesh.name = name;
                callback(mesh);
                //self.scene.add( mesh );
                name = null;
                loader = null;
            }), this.onProgressModel, this.onErrorModel);
        }
    }, {
        key: "LoadFBX",
        value: function LoadFBX(filename, callback) {
            var filepath;
            if (this.bfixedassetpath) {
                filepath = "/assets/" + filename;
            } else {
                filename;
                filepath = filename;
            }
            var name = filename;
            //console.log(filepath);
            var loader = new THREE.FBXLoader(this.manager);
            var self = this;
            loader.load(filepath, (function (object) {
                object.traverse((function (child) {
                    if (child instanceof THREE.Mesh) {}
                    if (child instanceof THREE.SkinnedMesh) {
                        if (child.geometry.animations !== undefined || child.geometry.morphAnimations !== undefined) {
                            child.mixer = new THREE.AnimationMixer(child);
                            //mixers.push( child.mixer );
                            var action = child.mixer.clipAction(child.geometry.animations[0]);
                            action.play();
                        }
                    }
                }));
                //self.scene.add( object );
                object.name = filename;
                //console.log("///////////////////////////////");
                //console.log(object.name);
                callback(object);
                name = null;
                loader = null;
            }), this.onProgressModel, this.onErrorModel);
        }
    }, {
        key: "LoadDAE",
        value: function LoadDAE(filename, callback) {
            var filepath;
            if (this.bfixedassetpath) {
                filepath = "/assets/" + filename;
            } else {
                filename;
                filepath = filename;
            }
            var loader = new THREE.ColladaLoader(this.manager);
            var self = this;
            loader.options.convertUpAxis = true;
            loader.load(filepath, (function (collada) {
                var dae = collada.scene;
                dae.traverse((function (child) {
                    if (child instanceof THREE.SkinnedMesh) {
                        var animation = new THREE.Animation(child, child.geometry.animation);
                        animation.play();
                    }
                }));
                //dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
                dae.updateMatrix();
                //init();
                //animate();
                //self.scene.add( dae );
                dae.name = filepath;
                callback(dae);
                console.log("added");
                //name = null;
                loader = null;
            }), this.onProgressModel, this.onErrorModel);
        }
    }, {
        key: "LoadOBJ",
        value: function LoadOBJ(filename, callback) {
            var self = this;
            //var name = filename;
            var filepath;
            if (this.bfixedassetpath) {
                filepath = "/assets/" + filename;
            } else {
                filename;
                filepath = filename;
            }
            var loader = new THREE.OBJLoader(this.manager);
            //var loader = new THREE.OBJLoader();
            loader.load(filepath, (function (object) {
                object.traverse((function (child) {
                    if (child instanceof THREE.Mesh) {}
                }));
                //object.position.y = - 95;
                //self.scene.add( object );
                object.name = filename;
                callback(object);
                //name = null;
                loader = null;
            }), this.onProgressModel, this.onErrorModel);
        }
        //===============================================
        // Physics
        //===============================================

    }, {
        key: "initCannonPhysics",
        value: function initCannonPhysics() {
            if ((typeof CANNON === "undefined" ? "undefined" : _typeof(CANNON)) != undefined) {
                this.world = new CANNON.World();
                this.world.gravity.set(0, -9.82, 0);
                this.world.broadphase = new CANNON.NaiveBroadphase();
                this.world.solver.iterations = 10;
            }
            //this.createCannonScene();
        }
    }, {
        key: "updateCannonPhysics",
        value: function updateCannonPhysics() {
            if (typeof this.world == 'undefined' || this.world == null) {
                return;
            }
            if ((typeof CANNON === "undefined" ? "undefined" : _typeof(CANNON)) != undefined) {
                //var timeStep = 1.0 / 60.0; // seconds
                //this.world.step(timeStep);
                //timeStep = null;
                //world.gravity.set(0,0,-9.82);
                this.world.step(this.timeSteptimeStep);
                //https://github.com/schteppe/cannon.js/issues/188
                //var result = [];
                //this.world.narrowphase.getContacts([bodyA], [bodyB], this.world, result, [], [], []);
                //var overlaps = result.length > 0;
                //console.log(this.bodies.length);
                /*
                for (var i = 0; i < this.bodies.length; i++) {
                	var mesh = this.meshs[i];
                	var body = this.bodies[i];
                	//console.log(body.sleeping);
                	//if(!body.sleeping){
                	//console.log(body.position.x);
                	//check if mesh and body is not null
                	if((body != null)&&(mesh != null)){
                		//console.log(mesh.position);
                		//console.log(body.position);
                		mesh.position.copy(body.position);
                				mesh.quaternion.copy(body.quaternion);
                	}
                }
                */
            }
        }
    }, {
        key: "destroyCannonPhysics",
        value: function destroyCannonPhysics() {
            console.log('destroyCannonPhysics');
        }
    }, {
        key: "initAmmoPhysics",
        value: function initAmmoPhysics() {
            //https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
            if ((typeof Ammo === "undefined" ? "undefined" : _typeof(Ammo)) != undefined) {
                console.log('init Ammo');
                this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
                this.dispatcher = this.dp = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
                //console.log(dispatcher);
                this.overlappingPairCache = new Ammo.btDbvtBroadphase();
                this.solver = new Ammo.btSequentialImpulseConstraintSolver();
                this.world = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration);
                this.world.setGravity(new Ammo.btVector3(0, -10, 0));
                this.trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking
                //this.createAmmoScene();
            }
        }
    }, {
        key: "updateAmmoPhysics",
        value: function updateAmmoPhysics() {
            if (typeof this.world == 'undefined' || this.world == null) {
                return;
            }
            if ((typeof Ammo === "undefined" ? "undefined" : _typeof(Ammo)) != undefined) {
                this.world.stepSimulation(1 / 60, 10);
                /*
                var i, dp = this.dp, num = dp.getNumManifolds(), manifold, num_contacts, j, pt;
                for (i = 0; i < num; i++) {
                	manifold = dp.getManifoldByIndexInternal(i);
                	num_contacts = manifold.getNumContacts();
                	if (num_contacts === 0) {
                		continue;
                	}
                	for (j = 0; j < num_contacts; j++) {
                		pt = manifold.getContactPoint(j);
                	}
                }
                var tbv30 = new Ammo.btVector3();
                for (var ii = 0; ii < this.bodies.length; ii++) {
                	var mesh = this.meshs[ii];
                	var body = this.bodies[ii];
                	//console.log(body.sleeping);
                	if (body.getMotionState()) {
                		//get location or position
                		body.getMotionState().getWorldTransform(this.trans);
                		//console.log("world pos = " + [this.trans.getOrigin().x().toFixed(2), this.trans.getOrigin().y().toFixed(2), this.trans.getOrigin().z().toFixed(2)]);
                		if(mesh !=null){
                			//console.log(mesh);
                			mesh.position.set(this.trans.getOrigin().x().toFixed(2), this.trans.getOrigin().y().toFixed(2), this.trans.getOrigin().z().toFixed(2));
                			mesh.rotation.set(this.trans.getRotation().x().toFixed(2), this.trans.getRotation().y().toFixed(2), this.trans.getRotation().z().toFixed(2), this.trans.getRotation().w().toFixed(2));
                		}
                				if (this.trans.getOrigin().y().toFixed(2) < -100) {
                			var x = 150;
                			var z = -100 + Math.random() * 200;
                			var y = 100 + Math.random() * 1000;
                			body.setLinearVelocity(tbv30);
                			body.setAngularVelocity(tbv30);
                			var transform = body.getCenterOfMassTransform();
                			console.log(transform);
                			transform.setOrigin(new Ammo.btVector3(x, y, z));
                			console.log("reset?");
                		}
                	}
                }
                tbv30 = null;
                */
            }
        }
    }, {
        key: "destroyAmmoPhysics",
        value: function destroyAmmoPhysics() {
            //https://github.com/kripken/ammo.js/blob/master/examples/hello_world.js
            // Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
            Ammo.destroy(this.collisionConfiguration);
            Ammo.destroy(this.dispatcher);
            Ammo.destroy(this.overlappingPairCache);
            Ammo.destroy(this.solver);
        }
    }, {
        key: "initOimoPhysics",
        value: function initOimoPhysics() {
            if ((typeof OIMO === "undefined" ? "undefined" : _typeof(OIMO)) != undefined) {
                this.world = new OIMO.World(1 / 60, 2);
                //this.world.gravity = new OIMO.Vec3(0, -1, 0);
                this.world.clear();
                //this.createOimoScene();
                //this.infos = document.getElementById("info");
            }
        }
    }, {
        key: "updateOimoPhysics",
        value: function updateOimoPhysics() {
            //https://github.com/lo-th/Oimo.js/blob/gh-pages/test_moving.html
            if (typeof this.world == 'undefined' || this.world == null) {
                return;
            }
            this.world.step();
            //this.infos.innerHTML = this.world.performance.show();
            /*
            for (var i = 0; i < this.bodies.length; i++) {
            	var mesh = this.meshs[i];
            	var body = this.bodies[i];
            	if (!body.sleeping) {
            		mesh.position.copy(body.getPosition());
            		//console.log(mesh.position);
            		mesh.quaternion.copy(body.getQuaternion());
            		//console.log(body.numContacts);
            		//if (body.numContacts > 0) {
            		//}
            		if (mesh.position.y < -100) {
            			var x = 150;
            			var z = -100 + Math.random() * 200;
            			var y = 100 + Math.random() * 1000;
            			body.resetPosition(x, y, z);
            		}
            	}
            }
            */
        }
    }, {
        key: "destroyOimoPhysics",
        value: function destroyOimoPhysics() {
            console.log('destroyOimoPhysics');
        }
    }, {
        key: "updatePhysics",
        value: function updatePhysics() {
            if (typeof this.world == 'undefined' || this.world == null) {
                return;
            }
            if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
                this.updateOimoPhysics();
            }
            if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
                this.updateCannonPhysics();
            }
            if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
                this.updateAmmoPhysics();
            }
        }
    }, {
        key: "initPhysics",
        value: function initPhysics() {

            if (this.setPhysicsType[this.physicsIndex] == 'Oimo.js') {
                this.initOimoPhysics();
            }
            if (this.setPhysicsType[this.physicsIndex] == 'Cannon.js') {
                this.initCannonPhysics();
            }
            if (this.setPhysicsType[this.physicsIndex] == 'Ammo.js') {
                this.initAmmoPhysics();
            }
            console.log("init physics type:" + this.setPhysicsType[this.physicsIndex]);
        }

        //===============================================
        //
        //===============================================

    }, {
        key: "setup_render",
        value: function setup_render() {
            this.setup_network();

            if (this.mode == "css3dwebgl" || this.mode == "editor") {
                //css3d render
                this.setup_css3d();
            }

            //webgl render
            this.setup_webgl();
            this.setup_hud();

            if (this.bmap) {
                this.load();
            }

            //render pass with two secnes
            this.setup_renderpass();
            this.render();
            if (this.bmap == false) {
                this.hideloadingscreen();
            }
        }
    }, {
        key: "init",
        value: function init() {
            this.setup_render();
            //this.hideloadingscreen();
            if (this.bablephysics) {
                this.initPhysics();
            }
            //console.log("game init");
        }
    }]);

    return Threejsbes6;
})();

//var game = new Game();
//console.log(game);
//set up and listen window loads
//game.init();