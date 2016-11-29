

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
        var dirvec = new BABYLON.Vector3(0,0,0);
        var dirveckback = new BABYLON.Vector3(0,0,0);
        var forwardvec = new BABYLON.Vector3(0,0,0);
        var pickResultPosClicked = new BABYLON.Vector3(0,0,100);
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
        camera.attachControl(canvas,false);
        camera.setPosition(new BABYLON.Vector3(0,5,5));



        //var model = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        var model = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, scene);
        model.rotation.x = -Math.PI / 2;
        model.bakeCurrentTransformIntoVertices();
        var Material = new BABYLON.StandardMaterial("material", scene);
        Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        model.material = Material;
        camera.setTarget(model);
        model.scaling.z = 1.5;

        console.log(model);

        function rotateVector(vect, quat) {
            var matr = new BABYLON.Matrix();
            quat.toRotationMatrix(matr);
            var rotatedvect = BABYLON.Vector3.TransformCoordinates(vect, matr);
            return rotatedvect;
        }

        var rotateVector = function(vec, ang)
        {
            ang = -ang * (Math.PI/180);
            var cos = Math.cos(ang);
            var sin = Math.sin(ang);
            return new Array(Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000, Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000);
        };

        var FaceRotation = 0;

        model.update=function(){
            //if(controllerid == uniqueId){
                //vector forward direction
                //var forward = camera.getFrontPosition(1).subtract(camera.position).normalize(); //does not work
                var target = model.position.clone();
                var forward = target.subtract(camera.position).normalize();
                forward.y = 0;
                //get rotation dir
                var diffAngle = Math.atan2(-forward.x,-forward.z);
                if(keys.left){// just a bug
                    model.rotation.y = diffAngle - (Math.PI/2);
                    var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, -Math.degrees(Math.PI/2));
                    var v3 = BABYLON.Vector3.TransformCoordinates(forward, matrix);
                    model.moveWithCollisions(v3);
                    v3 = null;
				}
                if(keys.right){// just a bug
                    var currentAngle = diffAngle + (Math.PI/2);
                    model.rotation.y = currentAngle;

                    console.log( Math.degrees(currentAngle));
                    var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.degrees(Math.PI/2));
                    var v3 = BABYLON.Vector3.TransformCoordinates(forward, matrix);
                    model.moveWithCollisions(v3);
                    v3 = null;
				}
				if(keys.forward){
                    console.log(Math.degrees(  diffAngle ));
                    var currentAngle = diffAngle;
                    model.rotation.y = currentAngle;
                    model.moveWithCollisions(forward);
				}
                if(keys.back){
                    model.rotation.y = diffAngle  + (Math.PI) ;
                    model.moveWithCollisions(new BABYLON.Vector3(-forward.x,0,-forward.z));
                }
                diffAngle = null;
                forward = null;
			//}
		}

        /*
        model.update=function(){
            //if(controllerid == uniqueId){
                //vector forward direction
                var forward = camera.getFrontPosition(1).subtract(camera.position);
                forward.y = 0;
                //get rotation dir
                var diffAngle = Math.atan2(-forward.x,-forward.z);
                if(keys.left){
                    model.rotation.y = diffAngle - (Math.PI/2);
                    console.log(Math.degrees(  diffAngle - (Math.PI/2)  ));
                    //var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, diffAngle  + (Math.PI/2));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(forward, matrix);
                    //model.moveWithCollisions(v2);
				}
                if(keys.right){
                    var currentAngle = diffAngle + (Math.PI/2);
                    model.rotation.y = currentAngle;
                    console.log(Math.degrees(  currentAngle ));
                    var vec = rotateVector(currentAngle);
                    //console.log(vec);
                    //var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, diffAngle  - (Math.PI/2));
                    //console.log(diffAngle  - (Math.PI/2));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(forward, matrix);
                    //model.moveWithCollisions(v2);
				}
				if(keys.forward){
                    var currentAngle = diffAngle;
                    model.rotation.y = currentAngle;
                    //console.log(Math.degrees(  currentAngle  ));
                    currentAngle = Math.degrees(  currentAngle  );
                    //console.log(currentAngle);
                    if(currentAngle < 0){
                        currentAngle = currentAngle + 360
                    }
                    //console.log(currentAngle);

                    //var vec2 = rotateVector([forward.x,forward.z], currentAngle);
                    //console.log(vec2);
                    //model.moveWithCollisions(new BABYLON.Vector3(vec2[0],0,vec2[1]));
                    //model.position.x += vec2[0];
                    //model.position.z += vec2[1];

                    model.position.x += forward.x;
                    model.position.z += forward.z;
                    console.log(model.position);


                    //var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, 90 );
                    //var v2 = BABYLON.Vector3.TransformCoordinates(forward, matrix).normalize();
                    //console.log(v2);
                    //model.moveWithCollisions(v2);
                    //var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, diffAngle + (Math.PI * -1));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(forward, matrix);
                    //model.moveWithCollisions(v2);
				}
                if(keys.back){
                    model.rotation.y = diffAngle  + (Math.PI) ;
                    console.log(Math.degrees(  diffAngle  ));
                    //var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, diffAngle - (Math.PI * -1));
                    //var v2 = BABYLON.Vector3.TransformCoordinates(forward, matrix);
                    //model.moveWithCollisions(v2);
                }
                diffAngle = null;
                forward = null;
			//}
		}
        */


        engine.runRenderLoop(function(){
            if(model !=null){
                model.update();
            }
        });

        function mousemovef(){
        	pickResult = scene.pick(scene.pointerX, scene.pointerY);
        	if (pickResult.hit) {
        			if (manState != 'moving'){
        				pickResultPos.x = pickResult.pickedPoint.x;
        				pickResultPos.z = pickResult.pickedPoint.z;
        				var diffX = pickResultPos.x - model.position.x;
        				var diffZ = pickResultPos.z - model.position.z;
        				diffAngle = Math.atan2(-diffX,-diffZ);
                        forwardvec.x = (diffX);
                        forwardvec.z = (diffZ);
        			} // if not moving
        	}// if result
        }//mousemovef()

        window.addEventListener("mousemove", function() {
	           mousemovef();
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
