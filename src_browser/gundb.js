// We're not connecting to any peers
// just yet...
var peers = ['http://localhost/gun'];
var gun = Gun(peers);

// Create an interface for the `greetings`
// key, storing it in a variable.
var greetings = gun.get('greetings');
// Update the value on `greetings`.
//greetings.put({ hello: 'worlds' });
//greetings.put({ time: 'worlds' });
// Read the value and listen for
// any changes.


greetings.val(function(value){//works
    console.log(value);
}); // outputs the user object at 'greetings'

greetings.path('hello').val(function(value){//works
    console.log(value);
}); // outputs the user object at 'greetings'

var autosave = gun.get('autosave');
autosave.put({setting:{savemap:false,autoload:false}});

autosave.path('setting').val(function(value){//works
    console.log(value);
});

//console.log(autosave);

//greetings.path('hello').val();//works
//console.log(greetings.val());
//console.log(greetings.path('hello').val());//doesn't work

//greetings.on(function (data) {
	//console.log('Update!', data)
//},{change: false});
