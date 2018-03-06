// var app = require('express')();
var express = require('express');
var app = express();
app.use(express.static('public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);

var util = require('util');
var clients = [];

io.on('connection', function(socket) {
    clients.push(socket.id);
    var clientConnectedMsg = 'User connected ' + util.inspect(socket.id) + ', total: ' + clients.length;
    console.log(clientConnectedMsg);
    socket.on('newId', function(data) {
        io.emit('newId', data);
    });

    socket.on('panleft', function(data) {
        io.emit('panleft', data);
        console.log("panleft: " + data);
    });
    socket.on('panright', function(data) {
        io.emit('panright', data);
        console.log("panright: " + data);
    });

    socket.on('panup', function(data) {
        io.emit('panup', data);
        console.log("panup: " + data);
    });
    socket.on('pandown', function(data) {
        io.emit('pandown', data);
        console.log("pandown: " + data);
    });
    socket.on('tap', function(data) {
        io.emit('tap', data);
        console.log("tapped: " + data);
    });
    socket.on('press', function(data) {
        io.emit('press', data);
        console.log("pressed: " + data);
    });

    socket.on('disconnect', function() {
        clients.pop(socket.id);
        var clientDisconnectedMsg = 'User disconnected ' + util.inspect(socket.id) + ', total: ' + clients.length;
        console.log(clientDisconnectedMsg);
    })
});


app.use(express.static('public'));
// //create route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});



http.listen(3000, function() {
    console.log('listening on *:3000');
});

// function getRandomInRange(min, max) {
//   	return Math.random() * (max - min) + min;
// }

function sendWind() {
    console.log('Wind sent to user');
    io.emit('new wind', 1);
}

setInterval(sendWind, 3000);
