

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
    audio:true
}).then(stream=>{
    myVideoStream = stream;
    addVideoStream(myVideo,myVideoStream);
    videoGrid.append(myVideo);

    socket.on('user-connected',(userId)=>{
        connectToNewUser(userId,stream);
    })

})
  .catch(err=>{
      console.log(err);
  })


peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
})


peer.on('call',call=>{
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream',userVideoStream=>{
        addVideoStream(video,userVideoStream);
    })
})


const connectToNewUser = (userId,stream)=>{
    console.log(userId);
    const call  = peer.call(userId,stream);
    const video = document.createElement('video');
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
    
}