/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Threejs_game_module} from './threejs_game_module';

export class Threejs_game_hud extends Threejs_game_module{

    constructor(args){
        super(args);
    }

    createBaseHUD(){
        var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
        var self = this;

        function updateHUDSprites () {
            console.log(window.innerWidth);
			var width = window.innerWidth / 2;
			var height = window.innerHeight / 2;
			var material = spriteTL.material;
			var imageWidth = material.map.image.width / 2;
			var imageHeight = material.map.image.height / 2;
			spriteTL.position.set( - width + imageWidth,   height - imageHeight, 0 ); // top left
			spriteTR.position.set(   width - imageWidth,   height - imageHeight, 0 ); // top right
			spriteBL.position.set( - width + imageWidth, - height + imageHeight, 0 ); // bottom left
			spriteBR.position.set(   width - imageWidth, - height + imageHeight, 0 ); // bottom right
			spriteC.position.set( 0, 0, 0 ); // center
		}

        function createHUDSprites ( texture ) {
			var material = new THREE.SpriteMaterial( { map: texture } );
			var width = material.map.image.width;
			var height = material.map.image.height;
			spriteTL = new THREE.Sprite( material );
			spriteTL.scale.set( width, height, 1 );
			self.scenehud.add( spriteTL );

			spriteTR = new THREE.Sprite( material );
			spriteTR.scale.set( width, height, 1 );
			self.scenehud.add( spriteTR );
			spriteBL = new THREE.Sprite( material );
			spriteBL.scale.set( width, height, 1 );
			self.scenehud.add( spriteBL );
			spriteBR = new THREE.Sprite( material );
			spriteBR.scale.set( width, height, 1 );
			self.scenehud.add( spriteBR );
			spriteC = new THREE.Sprite( material );
			spriteC.scale.set( width, height, 1 );
			self.scenehud.add( spriteC );

			updateHUDSprites();
		}
        var textureLoader = new THREE.TextureLoader();
        var mapA = textureLoader.load( "assets/sprite0.png", createHUDSprites );
    }

    createhud(){
        var self = this;
        var textureLoader = new THREE.TextureLoader();

        function createHUDSprites ( texture ) {
            var material = new THREE.SpriteMaterial( { map: texture } );

            var spriteTL = new THREE.Sprite( material );
            var material = spriteTL.material;
			var imageWidth = material.map.image.width / 2;
			var imageHeight = material.map.image.height / 2;
            var width = material.map.image.width;
			var height = material.map.image.height;

            spriteTL.scale.set( width, height, 1 );
            var width = window.innerWidth / 2;
			var height = window.innerHeight / 2;
            spriteTL.position.set( - width + imageWidth,   height - imageHeight, 0 ); // top left

            self.scenehud.add( spriteTL );

            console.log(spriteTL);
            function onDocumentMouseDown(event){
                //alert('hi');
                console.log("click");
            }

            function onDocumentOver(event){
                //alert('hi');
                console.log("onDocumentOver");
            }

            function onDocumentOut(event){
                //alert('hi');
                console.log("onDocumentOut");
            }

            spriteTL.addEventListener("mousedown", onDocumentMouseDown, false);
            spriteTL.addEventListener("click", onDocumentMouseDown, false);

            spriteTL.addEventListener("out", onDocumentOut, false);
            spriteTL.addEventListener("over", onDocumentOver, false);
        }

        var mapA = textureLoader.load( "assets/sprite0.png", createHUDSprites);
    }

    create_raycast_hud(){
        //https://threejs.org/docs/api/core/Raycaster.html
        var self = this;
        var currentui = null;
        var oldui = null;

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        function onMouseMove( event ) {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, self.camerahud );

            var intersects = raycaster.intersectObjects( self.scenehud.children );
            if(intersects.length > 0){
                //console.log(intersects[0].object);
                //https://threejs.org/docs/api/core/EventDispatcher.html
                //intersects[0].object.dispatchEvent({ type: 'click', message: 'vroom vroom!' });
                currentui = intersects[0].object;
                //console.log("hit!");
            }else{
                currentui =null;
            }
            if(currentui != oldui){
                console.log("current ui!");
                if(oldui !=null){
                    oldui.dispatchEvent({ type: 'out', message: 'vroom vroom!' });
                }
                oldui = currentui;
                if(oldui !=null){
                    oldui.dispatchEvent({ type: 'over', message: 'vroom vroom!' });
                }
            }
        }

        function raycast_mousedown(event){
            event.preventDefault();
            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera( mouse, self.camerahud );
            // calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects( self.scenehud.children );
            if(intersects.length > 0){
                console.log(intersects[0].object);
                //https://threejs.org/docs/api/core/EventDispatcher.html
                intersects[0].object.dispatchEvent({ type: 'click', message: 'vroom vroom!' });
            }
            //for ( var i = 0; i < intersects.length; i++ ) {
                //console.log("found!");
            	//intersects[ i ].object.material.color.set( 0xff0000 );
            //}
        }

        document.addEventListener( 'mousemove', onMouseMove, false );
        document.addEventListener( 'mousedown', raycast_mousedown, false );
    }



}
