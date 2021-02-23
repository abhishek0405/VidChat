//frontend Javascript
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    myVideoStream = stream;
    addVideoStream(myVideo,myVideoStream);
    videoGrid.append(myVideo);
})
  .catch(err=>{
      console.log(err);
  })

const addVideoStream = (video,stream)=>{
    //video is the video HTML element created
    //stream is my live stream from webcam
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    
}