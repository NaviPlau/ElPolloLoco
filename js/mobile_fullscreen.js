/**
 * Determines if the device is a touch device based on the presence of touch events or touch points.
 * @returns {boolean} True if the device supports touch events, otherwise false.
 */
function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Shows or hides mobile-specific buttons based on whether the device is a touch device.
 */
function showMobileButtons() {
  if (isTouchDevice()) {
    mobileButtons.classList.remove('d-none');
  } else {
    mobileButtons.classList.add('d-none');
  }
}

/**
 * Checks the browser's inner width and adjusts the UI accordingly.
 * If the width is less than 650 pixels, it stops the game and shows a specific screen for smaller devices.
 * Otherwise, it shows the normal screen and mobile buttons if applicable.
 */
function checkInnerWidth() {
  const adjustUI = () => {
    if (window.innerWidth < 650) {
      stopGame();
      showChangeScreen();
    } else {
      showNormalScreen();
      showMobileButtons();
    }
  };
  adjustUI();
  window.addEventListener('resize', adjustUI);
}

/**
 * Shows the normal screen for larger devices by hiding mobile-specific elements and updating the intro screen.
 */
function showNormalScreen() {
  mobileText.classList.add('d-none');
  buttonsArea.classList.remove('d-none');
  introScreen.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
  mobileTurnDevice.classList.add('d-none');
}

/**
 * Shows a screen designed for smaller devices by displaying mobile-specific elements and updating the intro screen.
 */
function showChangeScreen() {
  mobileText.classList.remove('d-none');
  buttonsArea.classList.add('d-none');
  introScreen.src = 'img/9_intro_outro_screens/iphone-160307_1280.png';
  mobileButtons.classList.add('d-none');
  mobileTurnDevice.classList.remove('d-none');
}

/**
 * Toggles fullscreen mode for the game canvas and intro screen.
 * Updates the fullscreen icon based on the current state.
 */
function toggleFullscreen() {
  let gameTitle = document.getElementById('gametitle');
  let fullScreenIcon = document.getElementById('fullScreenIcon');
  canvas.classList.toggle('displayFullScreen');
  introScreen.classList.toggle('displayFullScreen');
  gameTitle.classList.toggle('d-none');
  if (fullScreenIcon.src.includes('expand.png')) {
    fullScreenIcon.src = 'img/9_intro_outro_screens/collapse.png';
  } else {
    fullScreenIcon.src = 'img/9_intro_outro_screens/expand.png';
  }
}