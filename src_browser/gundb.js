// We're not connecting to any peers
// just yet...
var peers = ['http://localhost/gun'];
var gun = Gun(peers);

//gun.map(function(message, id) {
    //console.log(id,message);
//});
//gun.map().val(function(message, id) {
    //console.log(id,message);
//});

// Create an interface for the `greetings`
// key, storing it in a variable.
var greetings = gun.get('greetings');
// Update the value on `greetings`.
//greetings.put({ hello: 'worlds' });
//greetings.put({ time: 'worlds' }); //no id
//greetings.set({ message: 'hello' }); //set id
// Read the value and listen for
// any changes.
//greetings.set({ message: 'hello world' }); //set id

greetings.get('GTWOCegaO9HArs8jK8dGJKiP').put({ message: 'hello world last?' });

greetings.map().val(function(message, id) {
    console.log(id,message);
});




//greetings.val(function(value){//works
    //console.log(value);
//}); // outputs the user object at 'greetings'

//greetings.path('hello').val(function(value){//works
    //console.log(value);
//}); // outputs the user object at 'greetings'





//gamemap.get('AGTeuPSPm4REMqdjWIF2BAXa').map(function(message, id) {
    //console.log(">>>>",message," : ",id);
//});





//var autosave = gun.get('autosave');
//autosave.put({setting:{savemap:false,autoload:false}});

//autosave.path('setting').val(function(value){//works
    //console.log(value);
//});

//console.log(autosave);

//greetings.path('hello').val();//works
//console.log(greetings.val());
//console.log(greetings.path('hello').val());//doesn't work

//greetings.on(function (data) {
	//console.log('Update!', data)
//},{change: false});
