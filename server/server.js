const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const pathPublic = path.join(__dirname, '/../', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

app.use(express.static(pathPublic));

var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New Connection is established.');


    socket.on('disconnect', ()=>{
        console.log('New Connection disconnected.');
    });

   socket.on('createMessage', (message)=>{
    // console.log(message);
    socket.broadcast.emit('readMessage', {
        from: message.from,
        text: message.text
    });
   });
    
});

server.listen(port, ()=>{
    console.log(`Server is listen on port ${port}`);
});
