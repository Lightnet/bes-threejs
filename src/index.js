/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

var fs = require('fs');

var configpath = __dirname +'/app/config.json';
//console.log(configpath);
var config;
if (fs.existsSync(configpath)) {
    //console.log("config found!");
    config = require(configpath);
    //console.log('config file exists');
}
else
{
    //console.log("config not found!");
    config = {
        blocalhost: true,
        host: "127.0.0.1",
		port:80,
        database:"",
		bdatabase:true,
		token:"",
		btoken:true,
		tokentype:""
    };
    //console.log("creating config file.");
    fs.writeFile(configpath, JSON.stringify(config, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log("JSON saved to " + configpath);
        }
    });
}

//var plugin = require(__dirname + '/app/lib/plugin');
var plugin = require('./app/libs/plugin');
//console.log(plugin());
//console.log(plugin);
//plugin.AddPlugin();

//console.log(config);

import express from 'express';
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import path from 'path';

//file for index.html
app.use("/", express.static('./public'));

import {Game,GamePlugin} from './app/libs/threejsapi';

var threejsgame = new Game();
threejsgame.init();

//socket.io
io.on('connection', function (socket) {
	console.log("client connect.");
	threejsgame.connect(io,socket);
	socket.on('disconnect', function (data) {
		console.log('client disconnect');
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
