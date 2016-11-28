window.addEventListener('DOMContentLoaded', function() {
    // your code here
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function(){
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

        model.update=function(){
            //if(controllerid == uniqueId){

                if(diffAngle !=null){
                    model.rotation.y = diffAngle;
                }
                if(keys.left){
				}
                if(keys.right){
				}
				if(keys.forward){
                    dirvec = forwardvec.normalize().scale(0.1);
                    //console.log(dirvec);
                    model.moveWithCollisions(dirvec);
				}

                if(keys.back){
                    dirvec.x = (-forwardvec.x);
                    dirvec.z = (-forwardvec.z);
                    dirvec.normalize().scale(1);//reduce speed direct
                    //wconsole.log(dirvec);
                    model.moveWithCollisions(dirvec);
                }
			//}

		}

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
        var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
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
