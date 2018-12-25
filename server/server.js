const express = require('express');
const socketIO = require('socket.io');

const http = require('http');
const path = require('path');
const pathPublic = path.join(__dirname, '/../', 'public');
const port = process.env.PORT || 3000;
// console.log(pathPublic);

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();

var server = http.createServer(app);

app.use(express.static(pathPublic));

io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('Server is connected to client ...');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Node Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    socket.on('disconnect', ()=>{
        console.log('Client is disconnect from a server ...');
    });

    socket.on('createMessage', (msg)=>{
        // console.log('MESSAGE:\n', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
    });

    socket.on('createLocationMessage', (msg)=>{
        io.emit('newLocationMessage', generateLocationMessage(msg.from, msg.lat, msg.lon));
    });

});

server.listen(port, ()=>{
    console.log(`Server listen on Port ${port} ...`);
});