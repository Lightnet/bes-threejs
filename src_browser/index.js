var socket = io();

socket.on('connect', function () {
    console.log('server connected');
    socket.emit('getguildlist');
});

socket.on('disconnect', function () {
    console.log('server disconnected');
});

console.log("web?");
