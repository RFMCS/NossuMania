let audio;
let isPlaying = false;

// Load the song
function loadSong() {
    audio = new Audio('assets/audio/our_song.mp3');
    audio.addEventListener('loadeddata', function () {
        console.log('Song loaded');
    });
}

// Play the song
function playSong() {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    }
}

// Pause the song
function pauseSong() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    }
}

// Synchronize game events with the song's beats
function syncWithBeats() {
    // Code to synchronize game events with the song's beats
}

// Initialize audio
function initAudio() {
    loadSong();
}

// Call initAudio to initialize audio
initAudio();


document.getElementById('pausebutton').addEventListener('click', function () {
    pauseSong();
})