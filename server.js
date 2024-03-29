const express = require('express');
const app =express();
const {Server} = require('socket.io');
const http = require('http');
const ACTIONS = require('./src/Actions');
const path = require('path');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
    //mapping of socketId and corresponding userName
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) =>{
            return {
                socketId,
                userName: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) =>{
    console.log(socket.id); 

    socket.on(ACTIONS.JOIN, ({roomId, userName})=>{
        userSocketMap[socket.id]=userName;
        socket.join( roomId );

        const clients = getAllConnectedClients(roomId);
        console.log(clients);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    })

    socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    })
    

    socket.on('disconnecting', ()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) =>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.port || 5000;
server.listen( PORT, () => console.log(`server started on ${PORT}`));
