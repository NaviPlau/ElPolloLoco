const canvas = document.getElementById('canvas');
const introScreen = document.getElementById('introScreen');
const winLoseButtons = document.getElementById('winLoseButtons')
const keyboardInfo = document.getElementById('keyboardInfo');
const mobileButtons = document.getElementById('mobileButtonsArea');
const legalNotice = document.getElementById('legalNotice');
const mobileText  = document.getElementById('mobileText')
const buttonsArea = document.getElementById('buttonsArea')
const mobileTurnDevice = document.getElementById('mobileTurnDevice')
let world;
let keyboard = new Keyboard()



/**
 * Initializes the game by setting up the level, showing the canvas, hiding the intro screen,
 * managing sound and images, and enabling the sound button.
 */
function init() {
  initLevel();
  canvas.style.display = 'block';
  introScreen.style.display = 'none';
  winLoseButtons.classList.add('d-none');
  setContext();
  storeOriginalVolumes();
  checkWinOrLose();
  enableSoundButton();
  changeImgToStopGame();
}

/**
 * Sets the 2D drawing context for the canvas and initializes the game world.
 */
function setContext() {
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
}

/**
 * Stops the game by clearing all intervals, displaying the start screen,
 * hiding the canvas, and updating the game image.
 */
function stopGame() {
  clearAllIntervals();
  introScreen.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
  introScreen.style.display = 'flex';
  canvas.style.display = 'none';
  winLoseButtons.classList.add('d-none');
  changeImgToStartGame();
}

/**
 * Periodically checks the win or lose conditions every 300 milliseconds.
 * If the win condition is met (the end boss is dead), the win screen is displayed.
 * If the lose condition is met (the character is dead), the lose screen is displayed.
 */
function checkWinOrLose() {
  setInterval(() => {
    playWinScreen();
    playLoseScreen();
  }, 300);
}

/**
 * Checks if the win condition is met (end boss is dead).
 * If true, plays the win sound, stops all intervals, and displays the win screen after a delay.
 */
function playWinScreen() {
  if (world.endboss.enemyIsDead) {
    playSound(youWinAudio, 0.2);
    clearAllIntervals();
    setTimeout(() => {
      showWinScreen();
    }, 800);
  }
}

/**
 * Checks if the lose condition is met (character is dead).
 * If true, plays the lose sound, stops all intervals, and displays the lose screen after a delay.
 */
function playLoseScreen() {
  if (world.character.pepeIsDead) {
    playSound(youLoseAudio, 0.05);
    clearAllIntervals();
    setTimeout(() => {
      showLoseScreen();
    }, 800);
  }
}

/**
 * Clears all intervals that have been set with `setInterval`.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Prevents the default context menu from appearing on right-click (desktop)
 * or long-press (mobile).
 * 
 * This event listener is used to disable the context menu, which is typically 
 * triggered by right-clicking on desktop or long-pressing on mobile devices.
 * 
 * @param {MouseEvent} e - The event object associated with the context menu trigger.
 */
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
}, false);