/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class Threejs_framework_editor{

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
    }

    createObjectScene(args) {
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
                    }
                    else {
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

    parentObj(object, uuid) {
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

	parseObject(strobj) {
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
        }
        else {
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
                            if (typeof obj.script[os][sv] == 'object') {
                                //console.log('OBJECT    script');
                                //console.log('obj.script'+ os+'.'+sv);
                                if (Array.isArray(obj.script[os][sv])) {
                                    //console.log('found array object');
                                    objmesh.script[os][sv] = obj.script[os][sv];
                                }
                                else {
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
                            }
                            else {
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

	updateGroupGeometry(mesh, geometry) {
        mesh.geometry.dispose();
        mesh.geometry = geometry;
    }

	SetParamGeom(mesh) {
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

	copyobjectprops(obj) {
        //console.log('//  = processing ');
        var o3d = new object3d();
        o3d.uuid = obj.uuid;
        o3d.name = obj.name;
        o3d.type = obj.type;
        if (obj.parent != null) {
            o3d.parent = obj.parent.uuid;
        }
        else {
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
                    if ((typeof obj.script[os][param] == 'object')) {
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
                    if ((typeof obj.script[os][param] == 'string')) {
                        o3d.script[os][param] = obj.script[os][param]; //assign var
                    }
                    if ((typeof obj.script[os][param] == 'string')) {
                        o3d.script[os][param] = obj.script[os][param]; //assign var
                    }
                    if ((typeof obj.script[os][param] == 'boolean')) {
                        o3d.script[os][param] = obj.script[os][param]; //assign var
                    }
                    if ((typeof obj.script[os][param] == 'number')) {
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

	createshape(args) {
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
                    }
                    else {
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



}
