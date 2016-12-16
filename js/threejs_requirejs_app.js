'use strict';

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

var threejsapi;

requirejs.config({
    baseUrl: 'lib',
    paths: {
        //app: '../threejs_framework' //default testing
        threejs_framework: '../threejs_framework',
        app: '../threejs_game'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
//requirejs(['./app/threejs_framework_boot']); //default testing
requirejs(['./app/threejs_game_boot']);