/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/


// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../babylonjs_app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
//requirejs(['./app/babylonjs_framework_boot']);
requirejs(['./app/babylonjs_framework_boot']);
