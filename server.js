const http = require('http');
const port = process.env.PORT || 3000;
const app = require('./app');

const server = http.createServer(app) // inside this listener added ie excecuted whenever we get request.
const io = require('socket.io')(server);
const {ExpressPeerServer} = require('peer');
const peerServer  = ExpressPeerServer(server,{
    debug:true
});
app.use('/peerjs',peerServer);

console.log(port);
io.on('connection',socket=>{
    
    socket.on('join-room',(roomId,userId)=>{
        socket.join(roomId);
        console.log("we have joined room");
        socket.to(roomId).broadcast.emit('user-connected',userId);//broadcasts to other users sin the same room.
        
    })
     
})
server.listen(port,()=>{
    console.log('Server Started');
});
