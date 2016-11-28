/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

//var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
//var path = require('path');
//file for index.html
app.use("/", express.static('./public'));
// Imports the `Gun` library
const Gun = require('gun');
// Imported for side effects, adds level adapters.
require('gun-level');
// Import the two libraries
const levelup = require('levelup');
const leveldown = require('leveldown');
// Create a new level instance which saves
// to the `data/` folder.
const levelDB = levelup('data', {
     db: leveldown,
});
 // create a new gun instance
 //https://github.com/amark/gun/issues/139
 var gun = new Gun({
	 level: levelDB,
	 file:false, //disable data.json save file
 	//init: true,
});
http.on('request', gun.wsp.server);


var io = require('socket.io')(http);
gun.wsp(http);

//socket.io
io.on('connection', function (socket) {
	console.log("client connect.");
	socket.on('disconnect', function (data) {
		console.log('client disconnect');
	});
});

var HOSTIP = process.env.IP || "0.0.0.0";
var HOSTPORT = process.env.PORT || 80;
http.listen(HOSTPORT, HOSTIP, function () {
    console.log('listening on:' + HOSTIP + ':' + HOSTPORT);
    console.log(new Date());
});