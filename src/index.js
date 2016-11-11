
import express from 'express';
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import path from 'path';

//file for index.html
app.use("/", express.static('./public'));

import {Game,GamePlugin} from './app/libs/threejs_management';

//console.log(Game);
//console.log(GamePlugin);
var threejsgame = new Game();
//console.log(threejsgame);
//threejsgame.add("test");
//console.log(threejsgame.messages);

//socket.io
io.on('connection', function (socket) {
	console.log("client connect.");
	threejsgame.connect(io,socket);
	socket.on('disconnect', function (data) {
		threejsgame.disconnect(io,socket);
	});
});

var HOSTIP = process.env.IP || "0.0.0.0";
var HOSTPORT = process.env.PORT || 80;
http.listen(HOSTPORT, HOSTIP, function () {
    console.log('listening on:' + HOSTIP + ':' + HOSTPORT);
    console.log(new Date());
});

//import { createServer } from 'http';
//console.log("init server web?");
//createServer((req,res)=>{
	//res.writeHead(200,{'Content-Type':'text/plain'});
	//res.end('Hello World\n');
//}).listen(3000,'127.0.0.1');
//console.log('Server running at http://127.0.0.1:3000');
