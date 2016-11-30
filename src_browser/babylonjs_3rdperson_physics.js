

window.addEventListener('DOMContentLoaded', function() {
    // your code here
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function(){
        // Converts from degrees to radians.
        Math.radians = function(degrees) {
          return degrees * Math.PI / 180;
        };

        // Converts from radians to degrees.
        Math.degrees = function(radians) {
          return radians * 180 / Math.PI;
        };
        var keys={letft:0,right:0,forward:0,back:0};
        var diffAngle;
        var pickResult;
        var manState = 'idle';
        var pickResultPos = new BABYLON.Vector3(0,0,0);
        var joydir = new BABYLON.Vector3(0,0,0);
        var pickResultPosClicked = new BABYLON.Vector3(0,0,100);

        var leftstickmove = false;


        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);
        scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin());
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        //var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
        // target the camera to scene origin
        //camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        //camera.attachControl(canvas, false);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        //var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
        light0.diffuse = new BABYLON.Color3(0.1, 0, 0);
        //light0.specular = new BABYLON.Color3(0.1, 0.1, 0.1);
        //http://doc.babylonjs.com/tutorials/Customizing_Camera_Inputs
        var camera = new BABYLON.ArcRotateCamera("arcCamera1",0,0,10,BABYLON.Vector3.Zero(),scene);
        //camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
        camera.attachControl(canvas,false);//default?
        //camera.attachControl(canvas,true);
        //console.log(camera);
        camera.setPosition(new BABYLON.Vector3(0,5,5));

        var box1 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box1.position.x = -5;
        box1.position.y = 1;
        //box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:true, restitution: 1, mass:3, friction:0.5});
        box1.showBoundingBox = true;
        var box2 = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box2.position.x = 5;
        box2.position.y = 1;
        //box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:true, restitution: 1, mass:3, friction:0.5});
        box2.showBoundingBox = true;
        box2.updatePhysicsBody();


        var model = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, scene);
        //var model = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);

        model.rotation.x = -Math.PI / 2;
        model.bakeCurrentTransformIntoVertices();
        var Material = new BABYLON.StandardMaterial("material", scene);
        Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        model.material = Material;
        camera.setTarget(model);
        //model.scaling.z = 1.5;
        //model.physicsImpostor = new BABYLON.PhysicsImpostor(model, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.1 }, scene);
        model.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, move:true, restitution: 0.1, mass:10, friction:10});
        model.position.y =3;
        model.showBoundingBox = true;

        console.log(model);

        //var animate = function() {
            //model.applyImpulse(new BABYLON.Vector3(.05, 0, 0), new BABYLON.Vector3(1, 1, 0))
        //}
        //scene.registerBeforeRender(animate);
        //console.log(model);
        model.update=function(){
            //if(controllerid == uniqueId){
                //vector forward direction
                //this breaks
                //var forward = camera.getFrontPosition(1).subtract(camera.position).normalize(); //does not work bug
                //this works
                var target = model.position.clone();
                var forward = target.subtract(camera.position).normalize();
                var needMove = false;
                forward.y = 0;
                //get rotation dir
                //var diffAngle = Math.atan2(-forward.x,-forward.z);
                var diffAngle = Math.atan2(forward.x,forward.z);
                var currentAngle = 0;
                if(keys.left){
                    currentAngle = diffAngle + (Math.PI/2);
                    //model.rotation.y = currentAngle;
                    needMove = true;
				}
                if(keys.right){
                    currentAngle = diffAngle - (Math.PI/2);
                    //model.rotation.y = currentAngle;
                    needMove = true;
				}
				if(keys.forward){
                    //console.log(Math.degrees(  diffAngle ));
                    currentAngle = diffAngle + (Math.PI);;
                    //model.rotation.y = currentAngle;
                    needMove = true;
				}
                if(keys.back){
                    currentAngle = diffAngle ;
                    //model.rotation.y = diffAngle;
                    needMove = true;
                }

                //gamepad
                if(leftstickmove){
                    var joyangle = Math.atan2(joydir.x,-joydir.z);
                    model.rotation.y = diffAngle + joyangle + Math.PI;
                    var rot = diffAngle + joyangle;
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0.5), BABYLON.Matrix.RotationY(rot));
                    model.position.addInPlace(v2);
                }

                if (needMove) {
                    model.rotate(BABYLON.Axis.Y, 1);
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -1), BABYLON.Matrix.RotationY(currentAngle));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -0.5), BABYLON.Matrix.RotationY(currentAngle));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -0.5), BABYLON.Matrix.RotationY(model.rotation.y));
                    //model.position.addInPlace(v2);
                    //model.moveWithCollisions(v2);
                    model.applyImpulse(v2, model.getAbsolutePosition());//workist
                    model.rotation.y = 0;
                    //model.setLinearVelocity(v2);//nope
                    //model.setAngularVelocity(new BABYLON.Matrix.RotationY(currentAngle));
                    v2 = null;
                }

                if (needMove == false) {
                    model.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                }

                /*
                if (needMove) {
                    model.rotate(BABYLON.Axis.Y, currentAngle);
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -1), BABYLON.Matrix.RotationY(currentAngle));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -0.5), BABYLON.Matrix.RotationY(currentAngle));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -0.5), BABYLON.Matrix.RotationY(model.rotation.y));
                    //model.position.addInPlace(v2);
                    //model.moveWithCollisions(v2);
                    model.applyImpulse(v2, model.getAbsolutePosition());//workist
                    //model.setLinearVelocity(v2);//nope
                    //model.setAngularVelocity(new BABYLON.Matrix.RotationY(currentAngle));
                    v2 = null;
                }
                */

                diffAngle = null;
                currentAngle = null;
                forward = null;
			//}
		}

        var gamepadConnected = function (gamepad) {
            console.log(gamepad);
            //console.log(gamepad.gamepad);
            if(typeof gamepad.onlefttriggerchanged === 'function'){
                gamepad.onlefttriggerchanged(function (values) {
                    console.log(values);
                });
            }else{
                console.log("left trigger function doesn't exist");
            }
            if(typeof gamepad.onrighttriggerchanged === 'function'){
                gamepad.onrighttriggerchanged(function (values) {
                    console.log(values);
                });
            }else{
                console.log("right trigger function doesn't exist");
            }


            gamepad.onleftstickchanged(function (values) {
    			if (values.y < 0){//sphere.chooseDirection(0, 1);
                }
    			if (values.y > 0){//sphere.chooseDirection(1, 1);
                }
                if (values.x < 0){//sphere.chooseDirection(2, 1);
                }
    			if (values.x > 0){//sphere.chooseDirection(3, 1);
                }
                leftstickmove = false;
    			if (values.y < 0.1 && values.y > -0.1) {
    				//sphere.chooseDirection(0, 0);
    				//sphere.chooseDirection(1, 0);
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                    joydir.z = values.y;
                    leftstickmove = true;
                }
    			if (values.x < 0.1 && values.x > -0.1) {
    				//sphere.chooseDirection(2, 0);
    				//sphere.chooseDirection(3, 0);
                    //console.log("x: ",values.x, " y: " , values.y );
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                    joydir.x = values.x;
                    leftstickmove = true;
                }
                //console.log("x: ",values.x, " y: " , values.y );
    		});

            gamepad.onrightstickchanged(function (values) {
    			if (values.y < 0){//sphere.chooseDirection(0, 1);
                }
    			if (values.y > 0){//sphere.chooseDirection(1, 1);
                }
    			if (values.x < 0){//sphere.chooseDirection(2, 1);
                }
    			if (values.x > 0){//sphere.chooseDirection(3, 1);
                }

    			if (values.y < 0.1 && values.y > -0.1) {
    				//sphere.chooseDirection(0, 0);
    				//sphere.chooseDirection(1, 0);
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                }
    			if (values.x < 0.1 && values.x > -0.1) {
    				//sphere.chooseDirection(2, 0);
    				//sphere.chooseDirection(3, 0);
                    //console.log("x: ",values.x, " y: " , values.y );
    			}else{
                    //console.log("x: ",values.x, " y: " , values.y );
                }
                //console.log("x: ",values.x, " y: " , values.y );
    		});

    		gamepad.onbuttondown(function (buttonIndex) {
    			//alert(buttonIndex);
                //console.log(buttonIndex);
    		});

    		gamepad.onbuttonup(function (buttonIndex) {

    		});

    	};

        var gamepads = new BABYLON.Gamepads(gamepadConnected);

    	// for google chrome start the monitoring if navigator.getGamepads() has a gamepad at index 0 for example
    	// this is because chrome doesn't seem to support the gamepadconnected/gamepaddisconnected events perfectly yet,
    	// it only detects the gamepad if you plug it in again but not if it is already connected
    	if(navigator.getGamepads()[0]){
    		gamepads._startMonitoringGamepads();
    	}

        engine.runRenderLoop(function(){
            if(model !=null){
                model.update();
            }
        });

        window.addEventListener("keydown", handleKeyDown, false);
		window.addEventListener("keyup", handleKeyUp, false);
		function handleKeyDown(evt){
            if (evt.keyCode==65){//A
				keys.left=1;
			}
			if (evt.keyCode==68){//D
                keys.right=1;
			}
			if (evt.keyCode==87){//W
				keys.forward=1;
			}
			if (evt.keyCode==83){//S
				keys.back=1;
			}
		}

		function handleKeyUp(evt){
			if (evt.keyCode==65){
				keys.left=0;
			}
			if (evt.keyCode==68){
				keys.right=0;
			}
			if (evt.keyCode==87){
				keys.forward=0;
			}
			if (evt.keyCode==83){
				keys.back=0;
			}
		}
        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        var ground = BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
        //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:true, restitution: 0,  mass:0, friction:10});
        ground.showBoundingBox = true;
        // return the created scene
        return scene;
    }

    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });

});
