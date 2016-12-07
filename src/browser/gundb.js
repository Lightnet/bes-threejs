/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

//https://github.com/amark/gun/wiki/snippets-(v0.3.x)#savinggetting-images-in-gun

Gun.chain.image = function (img) {
  if (!img.src) {
    return this.val(function (src) {
      img.src = src;
    });
  }
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var data = canvas.toDataURL();
  return this.put(data);
};

Gun.chain.local = function (data, cb, opt) {
  opt = opt || {};
  opt.peers = {};
  return this.put(data, cb, opt);
};

Gun.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments);
};

Gun.create = function () {
  return Gun.apply(this, arguments);
};

Gun.chain.live = function (cb, opt) {
  return this.on(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
};

Gun.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
};

// connecting to any peers array list
var peers = ['http://localhost/gun'];
var gun = Gun(peers);

//gun.map(function(message, id) {
    //console.log(id,message);
//});
//gun.map().val(function(message, id) {
    //console.log(id,message);
//});
//var betamap = gun.key("beta/map/key");
//betamap.put({"config":{"autosave":false}});

//gun.put({"config":{"autosave":false}}).key("beta/key");//create key first

//var betakey = gun.get("beta/key");

//betakey.put({"config":{"autosave":true}});

//betakey.put({"backupconfig":{"autosave":true}});

//works
//betakey.val();

//works
//betakey.map().val(function(message, id) {
    //console.log("id: ",id, " msg: ",message);
//});

//betakey.map(function(value, id) {
    //console.log("id: ",id, " msg: ",value);
//});



// Create an interface for the `greetings`
// key, storing it in a variable.
var greetings = gun.get('greetings');

greetings.put({ hello: 's' });

// subscribe to changes to my player bucket
//greetings.value(function(data){
    //console.log(data);
//});

gun.get('greetings').each(function (example) {
  console.log(example)
})


//greetings.live(function (data) {
	//console.log('Update!', data)
//},{change: false});


// Update the value on `greetings`.
//greetings.put({ hello: 'worlds' });
//greetings.put({ time: 'worlds' }); //no id
//greetings.set({ message: 'hello' }); //set id
// Read the value and listen for
// any changes.
//greetings.set({ message: 'hello world' }); //set id

//greetings.get('GTWOCegaO9HArs8jK8dGJKiP').put(null);
//greetings.path('GTWOCegaO9HArs8jK8dGJKiP').put(null);

//greetings.get('GTWOCegaO9HArs8jK8dGJKiP').map().val(function(message, id) {
    //console.log(id,message);
//});

//greetings.map().val(function(message, id) {
    //console.log("id: ",id, " msg: ",message);
//});

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
