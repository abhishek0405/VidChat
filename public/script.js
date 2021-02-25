

//frontend Javascript

//const { PeerServer } = require("peer");

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;
let peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:3000
});

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
}).then(stream=>{
    myVideoStream = stream;
    addVideoStream(myVideo,myVideoStream);
    peer.on('call',call=>{
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream',userVideoStream=>{
            addVideoStream(video,userVideoStream);
        })
    })
    
    //videoGrid.append(myVideo);

    socket.on('user-connected',(userId)=>{
        connectToNewUser(userId,myVideoStream);
    })

})
  

//whenever connected to peer server hence first this occurs
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
})





const connectToNewUser = (userId,stream)=>{
    console.log(userId);
    const call  = peer.call(userId,stream);
    const video = document.createElement('video');
    //add the received video stream
    call.on('stream',userVideoStream=>{
        addVideoStream(video,userVideoStream);
    })
    
}



const addVideoStream = (video,stream)=>{
    //video is the video HTML element created
    //stream is my live stream from webcam
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
    
}