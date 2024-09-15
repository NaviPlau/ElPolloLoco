class Character extends MovableObject {
  x = 100;
  y = 190;
  img;
  height = 240;
  width = 90
  speed = 6
  offset = {
    right: 20,
    left: 10,
    top: 70,
    bottom: 0,
  }
  world;
  pepeIsDead = false
  isMovingLeft = false
  isMovingRight = false
  isInvincible = false
  idleStartTime;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ]

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ]
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ]

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ]
  
  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ]

  /**
   * Creates an instance of the character, loading the initial image and setting up animations and behaviors.
   * @constructor
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadAllImages();
    this.animate();
    this.isFalling();
    this.applyGravity();
  }

  /**
   * Loads all images for the character's different states.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }

  /**
   * Sets up animations by starting intervals for movement and image updates.
   */
  animate() {
    this.intervalMoving();
    this.intervaIMAGES();
  }

  /**
   * Creates an interval to handle character movement based on keyboard input.
   */
  intervalMoving() {
    setInterval(() => {
      if (this.pressRight()) {
        this.pepeMoveRight();
      }
      if (this.pressLeft()) {
        this.pepeMoveLeft();
      }
      if (this.pressUp() || this.pressSpace()) {
        this.pepeJump();
      }
      if (this.pressDown()) {
        this.pepeFallFaster();
      }
      this.adjustCamera();
    }, 1000 / 60);
  }

  /**
   * Creates an interval to update the character's image based on its state.
   */
  intervaIMAGES() {
    setInterval(() => {
      if (this.isDead()) {
        this.playDeadAnimation();
      } else if (this.isInvincible) {
        this.playHurtAnimation();
      } else if (this.isAboveGround()) {
        this.playJumpAnimation();
      } else if (this.pepeIsWalking()) {
        this.playPepeWalkingAnimation();
      } else {
        this.checkIdleTimer();
        this.playIdleAnimation();
      }
    }, 150);
  }

  /**
   * Checks if the right arrow key is pressed and if the character has not reached the level end.
   * @returns {boolean} True if the right arrow key is pressed and the character is within bounds, otherwise false.
   */
  pressRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right and plays the walking sound.
   */
  pepeMoveRight() {
    this.moveRight();
    this.isMovingRight = true;
    this.isMovingLeft = false;
    playSound(pepe_walking_sound, 0.005);
  }

  /**
   * Checks if the left arrow key is pressed and if the character is not too close to the left edge.
   * @returns {boolean} True if the left arrow key is pressed and the character is within bounds, otherwise false.
   */
  pressLeft() {
    return this.world.keyboard.LEFT && this.x > 80;
  }

  /**
   * Moves the character to the left and plays the walking sound.
   */
  pepeMoveLeft() {
    this.moveLeft();
    this.isMovingLeft = true;
    this.isMovingRight = false;
    playSound(pepe_walking_sound, 0.005);
  }

  /**
   * Checks if the up arrow key is pressed and if the character is on the ground.
   * @returns {boolean} True if the up arrow key is pressed and the character is on the ground, otherwise false.
   */
  pressUp() {
    return this.world.keyboard.UP && !this.isAboveGround();
  }

  /**
   * Checks if the space bar is pressed and if the character is on the ground.
   * @returns {boolean} True if the space bar is pressed and the character is on the ground, otherwise false.
   */
  pressSpace() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Makes the character jump and plays the jump sound.
   */
  pepeJump() {
    this.jump();
    playSound(pepe_jump, 0.05);
  }

  /**
   * Checks if the down arrow key is pressed and if the character is above the ground.
   * @returns {boolean} True if the down arrow key is pressed and the character is above the ground, otherwise false.
   */
  pressDown() {
    return this.world.keyboard.DOWN && this.isAboveGround();
  }

  /**
   * Increases the falling speed of the character and applies gravity.
   */
  pepeFallFaster() {
    this.isFalling();
    this.speedY -= 1.5;
    if (this.speedY < -19) {
      this.speedY = -29;
    }
  }

  /**
   * Adjusts the camera position to follow the character.
   */
  adjustCamera() {
    this.world.camera_x = -this.x + 60;
  }

  /**
   * Plays the dead animation and sound, marking the character as dead.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    playSound(pepe_dead_sound, 0.05);
    this.pepeIsDead = true;
    this.idleStartTime = null;
  }

  /**
   * Plays the hurt animation and sound, resetting the hurt sound after a timeout.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    playSound(pepeHurt, 0.01);
    setTimeout(() => {
      pepeHurt.pause();
      pepeHurt.currentTime = 0;
    }, 1000);
    this.idleStartTime = null;
  }

  /**
   * Plays the jump animation and resets the idle timer.
   */
  playJumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.idleStartTime = null;
  }

  /**
   * Checks if the character is walking based on keyboard input.
   * @returns {boolean} True if the right or left arrow key is pressed, otherwise false.
   */
  pepeIsWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Plays the walking animation and stops any idle animation.
   */
  playPepeWalkingAnimation() {
    this.speedY = 0;
    this.playAnimation(this.IMAGES_WALKING);
    this.idleStartTime = null;
  }

  /**
   * Checks if the idle timer should start or continue.
   */
  checkIdleTimer() {
    if (this.idleStartTime === null) {
      this.idleStartTime = Date.now();
    }
  }

  /**
   * Plays the idle animation based on the duration of idleness.
   */
  playIdleAnimation() {
    const idleDuration = Date.now() - this.idleStartTime;
    if (idleDuration >= 6000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      setTimeout(() => {
        this.playAnimation(this.IMAGES_IDLE);
      }, 60);
    }
  }
}