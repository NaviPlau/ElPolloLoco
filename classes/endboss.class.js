class Endboss extends MovableObject {
  height = 400;
  width = 300;
  x = 720 * 9.5
  y = 72
  speed = 20
  speedY = 0;
  wasAlerted = false
  otherDirection = false;
  bossIsJumping = false;
  introPlayed = false;
  energy = 100
  acceleration = 1
  moveBossInterval;
  intervalNearBoss;
  offset = {
    right: 20,
    left: 20,
    top: 50,
    bottom: 50,
  }
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ]

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
  ];

  IMAGES_JUMP = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ]

  /**
    * Creates an instance of the `Endboss` class.
    * Initializes the boss with images and starts animations.
    * 
    * @param {Character} character - The character that interacts with the boss.
    * @constructor
    */
  constructor(character) {
    super();
    this.loadAllImages();
    this.character = character;
    this.animate();
  }

  /**
   * Loads all images for different states of the boss.
   */
  loadAllImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_JUMP);
  }

  /**
   * Starts the animations and behavior of the boss.
   */
  animate() {
    this.checkIfNearBoss();
    this.startMovingBoss();
    this.startRandomYChange();
    this.applyGravityBoss();
  }

  /**
   * Handles the boss being hit, updating animation and energy.
   */
  hit() {
    this.checkBossAlive();
    if (this.bossIsDead()) {
      this.playAnimationDead();
    } else {
      this.playAnimationHurt();
    }
  }

  /**
   * Plays the dead animation and handles the boss's death.
   */
  playAnimationDead() {
    this.energy = 0;
    this.playAnimation(this.IMAGES_DEAD);
    clearInterval(this.moveBossInterval);
    clearInterval(this.intervalNearBoss);
    playSound(normalChickenHurt, 0.4);
    this.enemyIsDead = true;
  }

  /**
   * Plays the hurt animation and decreases the boss's energy.
   */
  playAnimationHurt() {
    this.energy -= 20;
    this.playAnimation(this.IMAGES_HURT);
    playSound(normalChickenHurt, 0.1);
  }

  /**
   * Checks if the boss is alive based on its energy.
   */
  checkBossAlive() {
    if (this.energy <= 0) {
      return;
    }
  }

  /**
   * Determines if the boss is considered dead.
   * 
   * @returns {boolean} `true` if the boss's energy is less than or equal to 20, `false` otherwise.
   */
  bossIsDead() {
    return this.energy <= 20;
  }

  /**
   * Moves the boss if it has been alerted.
   */
  moveBoss() {
    if (this.wasAlerted) {
      this.setBossMovement();
      this.playMovementAnimations();
    }
  }

  /**
   * Sets the boss's movement direction and boundaries.
   */
  setBossMovement() {
    if (this.bossIsMovingLeft()) {
      this.setBoundaryBossLeft();
    } else {
      this.bossMoveRight();
      this.setBoundaryRight();
    }
  }

  /**
   * Plays the appropriate movement animations based on the boss's state.
   */
  playMovementAnimations() {
    if (this.bossIsJumping) {
      this.playAnimation(this.IMAGES_JUMP);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
      this.speed = 20;
    }
  }

  /**
   * Sets the boundary condition for the boss moving left.
   */
  setBoundaryBossLeft() {
    if (this.x > 720 * 7) {
      this.bossMoveLeft();
    } else {
      this.otherDirection = true;
    }
  }

  /**
   * Sets the boundary condition for the boss moving right.
   */
  setBoundaryRight() {
    if (this.x >= 720 * 9.5) {
      this.otherDirection = false;
    }
  }

  /**
   * Determines if the boss is moving left.
   * 
   * @returns {boolean} `true` if the boss is moving left, `false` otherwise.
   */
  bossIsMovingLeft() {
    return !this.otherDirection;
  }

  /**
   * Moves the boss to the left and updates its animation.
   */
  bossMoveLeft() {
    this.x -= this.speed;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Moves the boss to the right and updates its animation.
   */
  bossMoveRight() {
    this.x += this.speed;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Starts a random vertical movement (jump) for the boss.
   */
  startRandomYChange() {
    const randomInterval = Math.random() * (8000 - 3000) + 3000;
    setInterval(() => {
      this.bossJump();
      this.speed = 40;
      this.bossIsJumping = true;
    }, randomInterval);
  }

  /**
   * Applies gravity to the boss, affecting its vertical movement.
   */
  applyGravityBoss() {
    setInterval(() => {
      if (this.isAboveGroundBoss() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the boss is above the ground.
   * 
   * @returns {boolean} `true` if the boss is above the ground, `false` otherwise.
   */
  isAboveGroundBoss() {
    if (this.y < 70) {
      this.bossIsJumping = true;
      return true;
    } else {
      this.bossIsJumping = false;
      return false;
    }
  }

  /**
   * Initiates a jump for the boss.
   */
  bossJump() {
    this.bossIsJumping = true;
    this.speedY = 20;
  }

  /**
   * Checks if the boss is near the character and plays the intro sound if not already played.
   */
  checkNearingBoss() {
    if (this.character && Math.abs(this.character.x - this.x) <= 600 && !this.introPlayed) {
      this.wasAlerted = true;
      this.introPlayed = true;
      playSound(bossIntro, 0.07);
    }
  }

  /**
   * Periodically checks if the boss is near the character.
   */
  checkIfNearBoss() {
    this.intervalNearBoss = setInterval(() => {
      this.checkNearingBoss();
    }, 200);
  }

  /**
   * Starts the boss's movement and animation if it has been alerted.
   */
  startMovingBoss() {
    this.moveBossInterval = setInterval(() => {
      if (this.wasAlerted) {
        this.playAnimation(this.IMAGES_ALERT);
        this.moveBoss();
      }
    }, 120);
  }
}