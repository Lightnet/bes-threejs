/*
    Project Name: bes-threejs
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
console.log(__dirname + '/../public');
app.use("/", express.static(__dirname + '/../public'));

var io = require('socket.io')(http);

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
    console.log('listening on: ' + HOSTIP + ':' + HOSTPORT);
});

var http = require('http');
var server = new http.Server();
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
server.on('request', gun.wsp.server);
gun.wsp(server);

// Start the server on port 8080.
server.listen(8080, HOSTIP, function () {
  console.log('listening on: ' + HOSTIP + ':8080/gun');
})

console.log(new Date());
