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

}
