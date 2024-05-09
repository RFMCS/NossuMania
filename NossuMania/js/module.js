let menuAudio;
let isBeating = false;
// Load the song
function loadMenuSong() {
  menuAudio = new Audio('/assets/audio/main-menu-music.mp3');
  menuAudio.addEventListener('loadeddata', function () {
  });
}
function initMenuAudio() {
  loadMenuSong();
}

initMenuAudio();

// Play the song
function playMenuSong() {
  if (!isBeating) {
    menuAudio.play();
    isBeating = true;
  }
}
// Pause the song
function pauseMenuSong() {
  if (isBeating) {
    menuAudio.pause();
    isBeating = false;
  }
}
// Synchronize game events with the song's beats
//function syncWithBeats() {
  // Code to synchronize game events with the song's beats
//}

document.getElementById('playButton').addEventListener('click', function () {
  playMenuSong();
});
document.getElementById('muteButton').addEventListener('click', function () {
  pauseMenuSong();
});