class SmallChicken extends MovableObject {
  height = 50;
  width = 60;
  y = 375;
  x = 1000 + Math.random() * 30000;
  speed = 0.2 + Math.random() * 2;
  offset = {
    top: -10,
    bottom: 30,
    left: 10,
    right: 0,
  }
  die_audio = smallChickenHurt

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
 * Creates an instance of the class, loading the initial image and starting the animation.
 * Calls `super().loadImage` to load the first walking image, loads all images, and initiates animations.
 */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Initiates the animations for the chicken object.
   * Starts the walking animation and movement behavior of the chicken.
   */
  animate() {
    this.playWalkingAnimation();
    this.moveChicken();
  }

  /**
   * Starts the walking animation for the chicken.
   * Sets an interval to cycle through the walking images for animation.
   */
  playWalkingAnimation() {
    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 8);
  }

  /**
   * Handles the movement of the chicken.
   * Sets an interval to move the chicken left and play background music.
   */
  moveChicken() {
    this.movementInterval = setInterval(() => {
      this.moveLeft();
      this.otherDirection = null;
      playSound(backgroundMusic, 0.02);
    }, 1000 / 60);
  }

  /**
   * Handles the death of the chicken.
   * Sets the offset for the chicken and plays the dead animation.
   */
  die() {
    this.setChickenOffset();
    this.playDeadAnimation();
  }

  /**
   * Sets the offset for the chicken's position.
   * Adjusts the chicken's offset values to change its appearance on death.
   */
  setChickenOffset() {
    this.offset = {
      top: 80,
      bottom: -30,
      left: 0,
      right: 0,
    };
  }

  /**
   * Plays the dead animation for the chicken.
   * Stops the walking animation, halts movement, and loads the dead image.
   */
  playDeadAnimation() {
    playSound(this.die_audio, 0.015);
    clearInterval(this.walkingAnimationInterval);
    clearInterval(this.movementInterval);
    this.loadImage(this.IMAGES_DEAD);
  }

}