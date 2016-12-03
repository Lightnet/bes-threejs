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

// We're not connecting to any peers
// just yet...
var peers = ['http://localhost/gun'];
var gun = Gun(peers);

var gamemap = gun.get('gamemap');
console.log(gamemap);
window.addEventListener('DOMContentLoaded', function () {

    $('form').on('submit', function(event) {
        event.preventDefault();
        var message = {};
        message.who = $('form').find('input').val();
        message.what = $('form').find('textarea').val();
        message.when = new Date().getTime();
        //console.log(message);
        gamemap.set(message);
        $('form').find('textarea').val("");
    });

    gamemap.map().val(function(message, id) {
        console.log(id,message);
        if (!message) {
            return;
        }
        var $li = $(
            $('#' + id).get(0) ||
            $('.model').find('.message').clone(true).attr('id', id).appendTo('ul')
        );
        $li.find('.who').text(message.who);
        $li.find('.what').text(message.what);
        $li.find('.when').text(message.when);
    });

    $('body').on('dblclick', 'li', function(event){
        console.log("id:"+this.id);
        //gamemap.path(this.id).put(null);
    });

    console.log("=======");
    gamemap.get('AGTeuPSPm4REMqdjWIF2BAXa').map(function(message, id) {
        console.log(">>>>",message," : ",id);
    });

    /*
    gamemap.get('AGTeuPSPm4REMqdjWIF2BAXa').map().val(function(message, id) {
    //gamemap.get('AGTeuPSPm4REMqdjWIF2BAXa').map().val(function(value) {
        //console.log(">>>>");
        //console.log(">>>>",value);
        console.log("id: ",id," message: ",message);
    });
    */

});

function AddGameMap(){

}

function DeleteGameMap(){
    console.log("Delete!");
}






/*
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
*/

//console.log(autosave);

//greetings.path('hello').val();//works
//console.log(greetings.val());
//console.log(greetings.path('hello').val());//doesn't work

//greetings.on(function (data) {
	//console.log('Update!', data)
//},{change: false});
