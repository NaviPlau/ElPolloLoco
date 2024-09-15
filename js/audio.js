let overallSounds = [];
let backgroundMusic = new Audio('audio/background.mp3')
let smallChickenHurt = new Audio ('audio/small_chicken.mp3')
let normalChickenHurt = new Audio ('audio/chicken.mp3')
let coin_sound = new Audio('audio/coin_sound.mp3')
let pepeHurt = new Audio('audio/pepe_hurt.mp3')
let pepe_dead_sound = new Audio('audio/pepe_dead.mp3')
let pepe_walking_sound = new Audio('audio/pepe_walk.mp3')
let pepe_jump = new Audio ('audio/pepe_jump.mp3')
let bossIntro = new Audio ('audio/intro-3-205581.mp3')
let youLoseAudio = new Audio ('audio/you-lose-game-sound-230514.mp3')
let youWinAudio = new Audio('audio/youwin1.mp3')
let bottleBreakAudio = new Audio('audio/bottlebreak.mp3')
overallSounds.push(
  backgroundMusic,
  smallChickenHurt,
  normalChickenHurt,
  coin_sound,
  pepeHurt,
  pepe_dead_sound,
  pepe_walking_sound,
  pepe_jump,
  bossIntro,
  youLoseAudio,
  youWinAudio,
  bottleBreakAudio 
);
let originalVolumes = {};
let soundIsOn = true;

/**
 * Plays a sound with a specified volume if sound is enabled.
 * @param {HTMLAudioElement} audioElement - The audio element to play.
 * @param {number} [volume=1] - The volume level of the sound (default is 1).
 */
function playSound(audioElement, volume = 1) {
  if (soundIsOn) {
    audioElement.volume = volume;
    audioElement.play();
  }
}

/**
 * Stores the original volume levels of all sounds.
 */
function storeOriginalVolumes() {
  overallSounds.forEach((sound, index) => {
    originalVolumes[index] = sound.volume;
  });
}

/**
 * Mutes all sounds by setting their volume to 0.
 */
function soundOff() {
  overallSounds.forEach(sound => {
    sound.volume = 0;
  });
}

/**
 * Restores the original volume levels for all sounds.
 */
function soundOn() {
  overallSounds.forEach((sound, index) => {
    sound.volume = originalVolumes[index];
  });
}

/**
 * Toggles the sound on or off, updating the sound image and volume accordingly.
 */
function toggleSound() {
  const soundImage = document.getElementById("soundImage");
  soundIsOn = !soundIsOn;
  if (soundIsOn) {
    soundImage.src = "img/9_intro_outro_screens/loudspeaker-158394_640.png"; 
    soundImage.alt = "Sound On";
    soundOn();
  } else {
    soundImage.src = "img/9_intro_outro_screens/loudspeaker-red.png"; 
    soundImage.alt = "Sound Off";
    soundOff();
  }
}

/**
 * Disables the sound button by setting its 'disabled' attribute.
 */
function disableSoundButton() {
  let soundButton = document.getElementById('soundButton');
  soundButton.setAttribute('disabled', 'true');
}

/**
 * Enables the sound button by removing its 'disabled' attribute.
 */
function enableSoundButton() {
  let soundButton = document.getElementById('soundButton');
  soundButton.removeAttribute('disabled');
}
