/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var socket = io();

socket.on('connect', function () {
    console.log('server connected');
});

socket.on('disconnect', function () {
    console.log('server disconnected');
});
