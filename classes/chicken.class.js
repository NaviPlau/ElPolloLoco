class Chicken extends MovableObject {
  height = 80;
  width = 60;
  y = 345;
  x = 1000 + Math.random() * 30000;
  speed = 0.2 + Math.random() * 2;
  offset = {
    top: -10,
    bottom: 30,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  /**
   * Creates an instance of the `Chicken` class.
   * Initializes the chicken with default position, size, and speed.
   * Loads the walking and dead images and starts the animation.
   * 
   * @constructor
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Animates the chicken by playing the walking animation and moving the chicken.
   */
  animate() {
    this.playWalkingAnimation();
    this.moveChicken();
  }

  /**
   * Handles the death of the chicken by updating its offset, playing the death sound,
   * stopping movement and animation intervals, and showing the dead chicken image.
   */
  die() {
    this.setDeadOffset();
    this.playDeadSound();
    this.clearMoementIntervals();
    this.showDeadChicken();
  }

  /**
   * Plays the walking animation by cycling through the walking images at a set interval.
   */
  playWalkingAnimation() {
    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 8);
  }

  /**
   * Moves the chicken to the left continuously and plays background music.
   */
  moveChicken() {
    this.movementInterval = setInterval(() => {
      this.moveLeft();
      this.otherDirection = null;
      playSound(backgroundMusic, 0.02);
    }, 1000 / 60);
  }

  /**
   * Sets the offset values for the chicken after it dies.
   * 
   * @returns {Object} The new offset values for the chicken.
   */
  setDeadOffset() {
    return this.offset = {
      top: 100,
      bottom: -50,
      left: 0,
      right: 0,
    };
  }

  /**
   * Clears the intervals for movement and walking animation to stop the chicken.
   */
  clearMoementIntervals() {
    clearInterval(this.walkingAnimationInterval);
    clearInterval(this.movementInterval);
  }

  /**
   * Plays the sound associated with the chicken's death.
   */
  playDeadSound() {
    playSound(normalChickenHurt, 0.02);
  }

  /**
   * Changes the chicken's image to the dead chicken image.
   */
  showDeadChicken() {
    this.loadImage(this.IMAGES_DEAD);
  }
}