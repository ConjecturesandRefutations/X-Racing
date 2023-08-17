let crash = new Audio('./audio/crash.mp3');

let drive = new Audio('./audio/drive.mp3');

let turn = new Audio('./audio/turn.mp3');

let congrats = new Audio('./audio/congrats.mp3');

let opening = new Audio('./audio/opening.mp3');

let closing = new Audio('./audio/closing.mp3');

let yummy = new Audio('./audio/yummy.mp3');

let skull = new Audio('./audio/skull.mp3');

// Function to start playing the opening audio

let openingAudioPlaying = false;

// Function to start playing the opening audio
function playOpeningAudio() {
  opening.play()
    .then(() => {
      openingAudioPlaying = true;
    })
    .catch((error) => {
      console.error('Error playing opening audio:', error);
      openingAudioPlaying = false;
    });
}

// Function to pause the opening audio
function pauseOpeningAudio() {
  opening.pause();
  openingAudioPlaying = false;
}

const openingAudio = document.querySelector('.play-music');


// Add a simple interaction event to play/pause the opening audio when the user clicks
openingAudio.onclick = () => {
  if (openingAudioPlaying) {
    pauseOpeningAudio();
  } else {
    playOpeningAudio();
  }
};