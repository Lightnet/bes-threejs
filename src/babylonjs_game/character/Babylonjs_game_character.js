/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/Babylonjs_game_module';

export class Babylonjs_game_character extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    create_character(args){
        //console.log('create_character');
        args = args || {};
        var self = this;
        var tmpmodel = this.getmesh("CubeBody");
        //console.log("here tmp model?");
        tmpmodel.isVisible = true;
        //var objphysics = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, this.scene);
        var objphysics = BABYLON.MeshBuilder.CreateSphere("indicator", {diameter: 1,diameterX:1}, this.scene);
        objphysics.isVisible = false;
        tmpmodel.objphysics = objphysics;
        tmpmodel.objtype = "npc";

        //console.log(tmpmodel.id);
        //console.log(tmpmodel.uniqueId);

        objphysics.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, move:true, restitution: 0, mass:1, friction:10});
        //console.log(typeof args['x']);
        objphysics.position.x = (typeof args['x'] === 'number') ? args['x'] : 4;
        objphysics.position.y = (typeof args['y'] === 'number') ? args['y'] : 0.5;
        objphysics.position.z = (typeof args['z'] === 'number') ? args['z'] : 0;
        //console.log(args['x'],":",args['y'],":",args['z']);
        //console.log(objphysics.position.x,":",objphysics.position.y,":",objphysics.position.z);
        objphysics.showBoundingBox = true;

        var keys = self.keys;
        tmpmodel.facedir = 0;
        var currentAngle = 0;

        var Material = new BABYLON.StandardMaterial("material", this.scene);
        Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

        var hit = BABYLON.Mesh.CreateBox("hit", 0.5, this.scene);
        hit.material = Material;

        tmpmodel.update=function(){
            //console.log(leftstickmove);
            //console.log(this.uniqueId);
            var needMove = false;
            if(self.controllerid == this.id){
                //vector forward direction
                //this breaks
                var forward = self.scene.activeCamera.getFrontPosition(1).subtract(self.scene.activeCamera.position).normalize();
                forward.y = 0;
                //get rotation dir
                //var diffAngle = Math.atan2(-forward.x,-forward.z);
                var diffAngle = Math.atan2(forward.x,forward.z);
                //var currentAngle = 0;
                //console.log(keys.left);
                if(keys.left){
                    //console.log("left");
                    currentAngle = diffAngle + (Math.PI/2);
                    needMove = true;
				}
                if(keys.right){
                    currentAngle = diffAngle - (Math.PI/2);
                    needMove = true;
				}
				if(keys.forward){
                    currentAngle = diffAngle + (Math.PI);;
                    needMove = true;
				}
                if(keys.back){
                    currentAngle = diffAngle ;
                    needMove = true;
                }

                //gamepad
                if(self.leftstickmove){
                    var joyangle = Math.atan2(self.joyleftdir.x,-self.joyleftdir.z);
                    currentAngle = diffAngle + joyangle + Math.PI;
                    tmpmodel.rotation.y = currentAngle;
                    var rot = diffAngle + joyangle;
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 10), BABYLON.Matrix.RotationY(rot));
                    tmpmodel.objphysics.physicsImpostor.setLinearVelocity(v2);
                }

                if (needMove) {
                    var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -10), BABYLON.Matrix.RotationY(currentAngle));
                    tmpmodel.objphysics.physicsImpostor.setLinearVelocity(v2);
                    tmpmodel.rotation.y = currentAngle;
                    v2 = null;
                    tmpmodel.facedir = currentAngle;
                }

                var objpos = tmpmodel.objphysics.position.clone();
                objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                tmpmodel.position = objpos;

                if (needMove == false) {
                    tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                }

                diffAngle = null;
                currentAngle = null;
                forward = null;
			}else{
                if (needMove == false) {
                    tmpmodel.objphysics.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                }

                var objpos = tmpmodel.objphysics.position.clone();
                objpos = objpos.add(new BABYLON.Vector3(0, -0.5, 0));
                tmpmodel.position = objpos;
            }
		}

        tmpmodel.interact=function(){
            console.log("interact");
            //console.log("???" + model.facedir);
            var fdir = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -2), BABYLON.Matrix.RotationY(tmpmodel.facedir));
            var rayPick = new BABYLON.Ray(tmpmodel.objphysics.position, fdir,2);
            var meshFound = self.scene.pickWithRay(rayPick, function (item) {
                //console.log(item.name);
                //console.log(item.objtype);
                if(item.objtype == null){
                    return false;
                }
                if (item.objtype.indexOf("npc") == 0){
                    return true;
                }else{
                    return false;
                }
            });
            if (meshFound != null && meshFound.pickedPoint != null) {
                console.log("found!");
                //meshFound
                console.log(meshFound.pickedMesh);
                if(typeof meshFound.pickedMesh.interactmenu  === 'function' ){
                    meshFound.pickedMesh.interactmenu();
                }

                hit.position = meshFound.pickedPoint;
          }else{
              //console.log("not found!");
          }
            rayPick=null;
            fdir=null;
        }

        tmpmodel.interactmenu=function(){
            //console.log(this);
            if(this.status !=null){
                self.npc = this.status;
                if(this.status.bshop){
                    self.checkshop();
                }
            }
        }



        //var name = args['name'] || "none";
        //console.log(name)
        return tmpmodel;
    }
}
