const container=document.querySelector('.video-container');
const videoElement=document.getElementById('vid')
const playPause=document.querySelector('.fa-play');
const volume=document.querySelector('.fa-volume-high');
const volumeBar=document.querySelector('.volume-bar');
const currVolumeBar=document.querySelector('.current-vol');
const playback=document.querySelector('.playback-speed');
const durationBar=document.querySelector('.bar');
const currDurationBar=document.querySelector('.current-dur');
const currTime=document.querySelector('.curr-time');
const totalDur=document.querySelector('.duration');
const maximize=document.querySelector('.fa-expand');
const controlContainer=document.querySelector('.fa-video')

let isPlaying=false;
let isMuted=false;
function togglePlay()
{
    if(videoElement.paused)
    {
        videoElement.play();
        playPause.classList.replace('fa-play','fa-pause');
        playPause.setAttribute('title','Pause');
    }
    else
    {
        videoElement.pause();
        playPause.classList.replace('fa-pause','fa-play');
        playPause.setAttribute('title','Play');
   
    }

}
function updateBar(e)
{
    if(!videoElement.paused)
    {
        const {currentTime,duration}=e.srcElement;
        let min=Math.floor(duration/60);
        let sec=Math.floor(duration%60);
        totalDur.textContent=sec<10?`${min}:0${sec}`:`${min}:${sec}`;
        min=Math.floor(currentTime/60);
        sec=Math.floor(currentTime%60);
        currTime.textContent=sec<10?`${min}:0${sec}/`:`${min}:${sec}/`;
        currDurationBar.style.width=`${(currentTime/duration)*100}%`;
    }
}

function seek(e)
{
    console.log(e);
    const totalWidth=durationBar.offsetWidth;
    console.log(totalWidth);
    const clickedWidth=e.offsetX;
    console.log(clickedWidth);
    const {duration}=videoElement;
    console.log(duration);
    videoElement.currentTime=(clickedWidth/totalWidth)*duration;
    currDurationBar.style.width=`${(clickedWidth/totalWidth)*100}%`;
}
function changeVolumeIcon(volumePercent)
{
    volume.className="fa-solid";
    volumeInRange=volumePercent/100;
    if(volumePercent===0)
    {
        volume.classList.add('fa-volume-off');
        videoElement.volume=0;
    }
    else if(volumePercent<80)
    {
        volume.classList.add('fa-volume-low');
        videoElement.volume=volumeInRange;
    }
    else
    {
        volume.classList.add('fa-volume-high');
        videoElement.volume=1;
    }
}
function toggleMute()
{ 
    volume.className="fa-solid";
    if(isMuted)
    {
        volume.classList.add('fa-volume-high');
        isMuted=false;
        currVolumeBar.style.width="100%";   
        videoElement.volume=1;
     }
    else
    {
        volume.classList.add('fa-volume-xmark');
        isMuted=true;
        currVolumeBar.style.width="0%";
        videoElement.volume=0;
    }
}
function updateVolume(e)
{
    console.log(e);
    const maxWidth=volumeBar.offsetWidth;
    const currWidth=e.offsetX;
    const volumePercent=(currWidth/maxWidth)*100;
    currVolumeBar.style.width=`${volumePercent}%`;
    changeVolumeIcon(volumePercent);
}
function changePlaybackRate()
{
    videoElement.playbackRate=playback.value;
}
function openFullscreen(elem)
 {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    videoElement.classList.add('video-fullscreen');
  }
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    videoElement.classList.remove('video-fullscreen');
  }
let fullscreen=false;
function toggleFullscreen()
{
    if(!fullscreen)
    {
        openFullscreen(container);
        maximize.classList.replace('fa-expand','fa-compress');
    }
    else
    {
        closeFullscreen();
        maximize.classList.replace('fa-compress','fa-expand');
    }
    fullscreen=!fullscreen;
}

maximize.addEventListener('click',toggleFullscreen);
playback.addEventListener('change',changePlaybackRate);
volume.addEventListener('click',toggleMute);
volumeBar.addEventListener('click',updateVolume);
videoElement.addEventListener('timeupdate',updateBar)
durationBar.addEventListener('click',seek)
videoElement.addEventListener('ended',()=>{videoElement.play();togglePlay()});
videoElement.addEventListener('click',togglePlay);
playPause.addEventListener('click',togglePlay);
