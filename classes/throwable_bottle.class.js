class TabascoBottle extends MovableObject {
  height = 50;
  width = 30;
  offset = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  }

  THROW_IMAGES = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  SPLASH_IMAGES = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /**
   * Creates an instance of `Throwable`.
   * Initializes the position, character, and loads all images required for the throwing and splash animations.
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   * @param {Character} character - The character that is throwing the object.
   */
  constructor(x, y, character) {
    super();
    this.character = character;
    this.x = x;
    this.y = y;
    this.loadAllImages();
    this.throw();
  }

  /**
   * Loads all images required for throwing and splash animations.
   */
  loadAllImages() {
    this.loadImage(this.THROW_IMAGES[0]);
    this.loadImages(this.THROW_IMAGES);
    this.loadImages(this.SPLASH_IMAGES);
  }

  /**
   * Initiates the throwing mechanics of the object.
   * Sets the vertical speed, applies gravity, and starts the throwing animation with a movement interval.
   */
  throw() {
    this.speedY = 10;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.playAnimation(this.THROW_IMAGES);
      this.x += 10;
    }, 25);
  }

  /**
   * Plays the splash animation for when the object lands or hits a target.
   * Clears the throwing interval and plays the splash animation frames.
   */
  playSplashAnimation() {
    clearInterval(this.throwInterval);
    this.playAnimation(this.SPLASH_IMAGES);
  }
}