class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  F = false;

  /**
 * Initializes the Keyboard instance by setting up event listeners
 * for keyboard and touch events.
 */
constructor() {
  this.initializeKeyboard(); 
}

/**
 * Sets up event listeners for keyboard events and binds touch events
 * to the respective buttons.
 */
initializeKeyboard() {
  document.addEventListener('keydown', (e) => this.handleKeyChange(e, true));
  document.addEventListener('keyup', (e) => this.handleKeyChange(e, false));
  this.bindTouchEvents();
}

/**
 * Updates the state of the keys based on the key event and whether
 * the key is pressed or released.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {boolean} isPressed - True if the key is pressed, false if released.
 */
handleKeyChange(event, isPressed) {
  const actions = {
    39: 'RIGHT', 68: 'RIGHT',
    37: 'LEFT', 65: 'LEFT',
    38: 'UP', 87: 'UP',
    40: 'DOWN', 83: 'DOWN',
    32: 'SPACE',
    70: 'F'
  };
  const action = actions[event.keyCode];
  if (action) this[action] = isPressed;
}

/**
 * Sets the state of the specified button to true when a touch starts.
 * @param {string} button - The name of the button ('LEFT', 'RIGHT', 'JUMP', 'DOWN', 'THROW').
 */
handleTouchStart(button) {
  this[button] = true;
}

/**
 * Sets the state of the specified button to false when a touch ends.
 * @param {string} button - The name of the button ('LEFT', 'RIGHT', 'JUMP', 'DOWN', 'THROW').
 */
handleTouchEnd(button) {
  this[button] = false;
}

/**
 * Binds touch events to the buttons defined in the `buttons` object.
 * Sets up `touchstart` and `touchend` event listeners for each button
 * to call the appropriate handler methods.
 */
bindTouchEvents() {
  const buttons = {
    'btnLeft': 'LEFT',
    'btnRight': 'RIGHT',
    'btnJump': 'UP',
    'btnDown': 'DOWN',
    'btnThrow': 'F'
  };
  Object.entries(buttons).forEach(([id, action]) => {
    const button = document.getElementById(id);
    button.addEventListener('touchstart', (e) => this.handleTouchStart(action, e));
    button.addEventListener('touchend', (e) => this.handleTouchEnd(action, e));
  });
}
}