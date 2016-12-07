// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        babylonjs_framework: '../babylonjs_framework',
        app: '../babylonjs_game'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['./app/babylonjs_game_boot']);
