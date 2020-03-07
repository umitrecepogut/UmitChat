var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express();
var server = app.listen(4000, function(){
    console.log('Listening to requests on port 4000.')
});


//Static Files
app.use(express.static('public'));


// Socket Setup & Pass Server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle Chat Event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle Typing Event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});