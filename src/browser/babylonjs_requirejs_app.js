// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        babylonjs_framework: '../babylonjs_framework',
        //babylonjs_game: '../babylonjs_game',
        app: '../babylonjs_game'
    }
});

//GAME

// Start loading the main app file. Put all of
// your application logic in there.
//requirejs(['./app/babylonjs_game_boot']);
var BABYLONJSAPI;
function CallAPI(){
    console.log(BABYLONJSAPI);
}

requirejs(['./app/Babylonjs_game'],(app)=>{
    //console.log(app);
    var BGame = new app.Babylonjs_game();
    //console.log(BGame);
    BGame.init();
    BABYLONJSAPI = BGame;
    //CallAPI();
});

//requirejs(['./app/system/gmodule'],(app)=>{
    //console.log(app.default['value']);
    //console.log(app.default);
//});

//console.log(BABYLONJSAPI);
