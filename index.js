const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/" , (req , res) =>
{
    res.sendFile(join(__dirname , "index.html"));
})

io.on('connection' , (socket) =>
{
    console.log("A user connected");
    socket.on('disconnect' , () =>
    {
        console.log("A user disconnected");
    })
    socket.on('chat message' , (msg) =>
    {
        io.emit('chat message' , msg);
        console.log("message :" + msg)
    })
})

// io.emit('some event' , {
//     someProperty: 'some value',
//     otherProperty: 'other value'
// }) instead of this we can put it in chat message

server.listen(3000 , () =>
{
    console.log("Server is running ast port 3000");
})
