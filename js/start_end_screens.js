/**
 * Changes the start/stop button image to start the game and updates its functionality.
 * The button will now initialize the game when clicked, and the image will change to a "start" icon.
 */
function changeImgToStartGame() {
  let startStopButton = document.querySelector('#startStopGame .startButton');
  startStopButton.setAttribute('onclick', 'init()');
  startStopButton.querySelector('img').src = 'img/9_intro_outro_screens/919983_end_play_preview_start_icon.png';
  startStopButton.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  });
}

/**
 * Changes the start/stop button image to stop the game and updates its functionality.
 * The button will now stop the game when clicked, and the image will change to a "pause" icon.
 */
function changeImgToStopGame() {
  let startStopButton = document.querySelector('#startStopGame .startButton');
  startStopButton.setAttribute('onclick', 'stopGame()');
  startStopButton.querySelector('img').src = 'img/9_intro_outro_screens/pause-145677_640.png';
  startStopButton.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  });
}

/**
 * Displays the "You Lost" screen with appropriate styling and hides the canvas.
 * The screen will show the "You Lost" image and reveal the win/lose buttons.
 */
function showLoseScreen() {
  introScreen.style.display = 'flex';
  introScreen.src = 'img/9_intro_outro_screens/game_over/you lost.png';
  introScreen.style.backgroundColor = 'rgba(0,0,0, 0.5)';
  winLoseButtons.classList.remove('d-none');
  canvas.style.display = 'none';
}

/**
 * Displays the "You Win" screen with appropriate styling and hides the canvas.
 * The screen will show the "You Win" image and reveal the win/lose buttons.
 */
function showWinScreen() {
  introScreen.style.display = 'flex';
  introScreen.style.backgroundColor = 'rgba(0,0,0, 0.5)';
  introScreen.src = 'img/9_intro_outro_screens/win/win_1.png';
  winLoseButtons.classList.remove('d-none');
  canvas.style.display = 'none';
}

/**
 * Toggles the visibility of keyboard information on click and attaches/removes an outside click listener.
 * @param {Event} event - The click event that triggered the function.
 */
function toggleKeyBoardInfo(event) {
  if (keyboardInfo.classList.contains('d-none')) {
    keyboardInfo.classList.remove('d-none');
    document.addEventListener('click', outsideClickListener);
  } else {
    keyboardInfo.classList.add('d-none');
    document.removeEventListener('click', outsideClickListener);
  }
  event.stopPropagation();
}

/**
 * Hides the keyboard information if a click occurs outside of the keyboard information element.
 * @param {Event} event - The click event that triggered the function.
 */
function outsideClickListener(event) {
  if (!keyboardInfo.contains(event.target)) {
    keyboardInfo.classList.add('d-none');
    document.removeEventListener('click', outsideClickListener);
  }
}

/**
 * Displays the legal notice by removing its 'd-none' class and hides the keyboard information.
 */
function showLegalNotice() {
  legalNotice.classList.remove('d-none');
  keyboardInfo.classList.add('d-none');
}

/**
 * Adds an event listener to hide the legal notice if a click occurs outside of it.
 * @param {Event} event - The click event that triggered the function.
 */
document.addEventListener('click', hideLegalNoticeOnClickOutside);

/**
 * Hides the legal notice if a click occurs outside of the legal notice element.
 * @param {Event} event - The click event that triggered the function.
 */
function hideLegalNoticeOnClickOutside(event) {
  if (!legalNotice.contains(event.target)) {
    legalNotice.classList.add('d-none');
  }
}