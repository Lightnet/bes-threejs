'use strict';

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

var threejsapi;

requirejs.config({
    baseUrl: 'lib',
    paths: {
        //app: '../threejs_framework' //default testing
        //threejs_framework: '../threejs_framework',
        app: '../threejs_framework'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
//requirejs(['./app/threejs_framework_boot']); //default testing
requirejs(['./app/threejs_framework'], (function (app) {
    console.log(app);
    var threejsapi;
    var config = {
        mode: "editor",
        bupdateobjects: true,
        bablephysics: false
    };
    var ThreejsFW = new app.Threejs_framework(config);
    //ThreejsFW.init();
}));