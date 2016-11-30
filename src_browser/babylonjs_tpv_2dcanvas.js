

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

        var camera = new BABYLON.ArcRotateCamera("arcCamera1",0,0,10,BABYLON.Vector3.Zero(),scene);
        //camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
        //camera.attachControl(canvas,false);//default?
        camera.attachControl(canvas,true);
        //console.log(camera);
        camera.setPosition(new BABYLON.Vector3(0,5,5));

        var box1 = BABYLON.Mesh.CreateBox("box1", 1.0, scene);
        box1.position.x = -5;

        var box2 = BABYLON.Mesh.CreateBox("box2", 1.0, scene);
        box2.position.x = 5;

        var model = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, scene);
        model.rotation.x = -Math.PI / 2;
        model.bakeCurrentTransformIntoVertices();
        var Material = new BABYLON.StandardMaterial("material", scene);
        Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        model.material = Material;
        camera.setTarget(model);
        model.scaling.z = 1.5;

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
                if(keys.left){
                    model.rotation.y = diffAngle + (Math.PI/2);
                    needMove = true;
				}
                if(keys.right){
                    var currentAngle = diffAngle - (Math.PI/2);
                    model.rotation.y = currentAngle;
                    needMove = true;
				}
				if(keys.forward){
                    console.log(Math.degrees(  diffAngle ));
                    var currentAngle = diffAngle ;
                    model.rotation.y = currentAngle + (Math.PI);
                    needMove = true;
				}
                if(keys.back){
                    model.rotation.y = diffAngle;
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
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -0.5), BABYLON.Matrix.RotationY(model.rotation.y));
                    model.position.addInPlace(v2);
                    //model.moveWithCollisions(v2);
                    v2 = null;
                }
                diffAngle = null;
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
        //keep it as it as it need it for node tracking mesh
        var screenCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
            id: "ScreenCanvas"
        });

        var group2d = new BABYLON.Group2D({
            parent:screenCanvas,
            id:"group2d",
            scale:0.6 //limited since backgroundRoundRadius effect render
        });

        var hellotext = new BABYLON.Text2D("Hello World!", {
            parent:group2d,
            id: "text",
            marginAlignment: "h: center, v:center",
            fontName: "20pt Arial",
        });

        console.log(BABYLON);
        var EmptyPivot = new BABYLON.Mesh("pivos", scene);//this is for nodetrack since 2D can't translate it?
        EmptyPivot.position.y = 1;
        EmptyPivot.parent = box1;

        var group2d_01 = new BABYLON.Group2D({
            parent:screenCanvas,
            id:"group2d_01",
            //scale:0.6, //limited since backgroundRoundRadius effect render
            id: "GroupTag #" + 0,
            width: 80,
            height: 40,
            //trackNode: box3,
            trackNode: EmptyPivot,
            children: [
                new BABYLON.Rectangle2D({ id: "firstRect", width: 80, height: 26, x: 0, y: 0, origin: BABYLON.Vector2.Zero(), border: "#FFFFFFFF", fill: "#808080FF", children: [
                        new BABYLON.Text2D(box1.name, { marginAlignment: "h: center, v:center", fontName: "bold 12px Arial" })
                    ]
                })
            ]
        });

        /*
        var canvassc2d = new BABYLON.WorldSpaceCanvas2D(scene, new BABYLON.Size(150, 150), {
            id: "WorldSpaceCanvas",
            worldPosition: new BABYLON.Vector3(0, 0, 0),
            //worldRotation: BABYLON.Quaternion.RotationYawPitchRoll(Math.PI / 4, Math.PI / 4, 0),
            //worldRotation: BABYLON.Quaternion.RotationYawPitchRoll(0,Math.PI / 4, 0),
            worldRotation: BABYLON.Quaternion.RotationYawPitchRoll(0,Math.PI, Math.PI),
            //renderScaleFactor: 8,
            renderScaleFactor: 0.5,
            enableInteraction: true,
            backgroundFill: "#C0C0C040",
            //backgroundRoundRadius: 80,
            //scale:0.5,
            children: [
                //new BABYLON.Text2D("World Space Canvas", { fontName: "10pt Arial", marginAlignment: "h: center, v: bottom" })
            ]
        });
        //scale:0.5

        var group2d = new BABYLON.Group2D({
            parent:canvassc2d,
            id:"group2d",
            scale:0.3 //limited since backgroundRoundRadius effect render
        });

        var simpletext = new BABYLON.Text2D("World Space Canvas", { parent:group2d, fontName: "10pt Arial", marginAlignment: "h: center, v: bottom" })

        var buttonRect = new BABYLON.Rectangle2D(
            { parent: group2d, id: "button", x: 10, y: 100, width: 200, height: 80, fill: "#40C040FF",
                //roundRadius: 10,
                children:
                [
                    new BABYLON.Text2D("Click Me!", { fontName: "30pt Arial", marginAlignment: "h: center, v: center" })
                ]});

        buttonRect.pointerEventObservable.add(function (d, s) {
            //button2Rect.levelVisible = !button2Rect.levelVisible;
            console.log("clicked!");
        }, BABYLON.PrimitivePointerInfo.PointerUp);
        */

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
        //var ground = BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
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
