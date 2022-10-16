const title = document.getElementById("title");
const coverImg = document.getElementById("coverimg");
const audio = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const currentT = document.getElementById("ct");
const dur = document.getElementById("dur");
const musicContainer = document.getElementById("musiccontainer");
const progressBar = document.querySelector("input[type='range']")

const songs = [
  "arjun reddy",
  "jilibili palukula",
  "kgf",
  "mirzapur",
  "way down we go",
];
let songIndex = 0;
//to load songs form songs array

const playSong = () => {
  playBtn.src = `icons/pause-solid.svg`;
  musicContainer.classList.add("play");
  audio.play();
};
const pauseSong = () => {
  playBtn.src = `icons/play-solid.svg`;
  musicContainer.classList.remove("play");
  audio.pause();
};

const loadSongs = (song) => {
  title.innerText = `${song}`;
  audio.src = ` music/${song}.mp3 `;
  coverImg.src = ` coverimg/${song}.jpg `;
  playSong();
};

playBtn.addEventListener("click", () => {
  const isplaying = musiccontainer.classList.contains("play");
  console.log("click");
  if (isplaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// loadSongs(songs[songIndex])
// console.log(songIndex)

const playPrevSong = ()=>{
  songIndex--
  loadSongs(songs[songIndex])
  playSong()
  if(songIndex < 0){
      songIndex = songs.length-1
      loadSongs(songs[songIndex])
      playSong()
  }
}
const playNextSong = ()=>{
  songIndex++
  loadSongs(songs[songIndex])
  playSong()
  if(songIndex > songs.length-1)
  {
      songIndex = 0
      loadSongs(songs[songIndex])
      playSong()
  }
}

const timeUpdate = (e)=>{
  // console.log(e.target.currentTime)
  // console.log(e.target.duration)
  const ctMin = Math.floor(e.target.currentTime/60)
  const ctSec = Math.floor(e.target.currentTime%60)
  currentT.innerHTML = `${ctMin}:${ctSec<10?'0':''}${ctSec}`
  const duMin = Math.floor(e.target.duration/60)
  const duSec = Math.floor(e.target.duration%60)
  dur.innerHTML = `${duMin}:${duSec}`

  //update progressbar

  //per = (ct/du)*100
  const progressWidth = (e.target.currentTime/e.target.duration)*100
progressBar.value = `${progressWidth}`
// console.log(progressBar.value)
}

prevBtn.addEventListener('click',playPrevSong)
nextBtn.addEventListener('click',playNextSong)
audio.addEventListener('ended',playNextSong)
audio.addEventListener('timeupdate',timeUpdate)
progressBar.addEventListener('click',()=>{
  console.log('clicked')
  //(per*du)/100 = ct
  audio.currentTime = (progressBar.value*audio.duration)/100
})