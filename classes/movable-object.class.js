class MovableObject extends DrawableObject {
  speed = 0.1
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  collectedCoins = 0;
  collectedBottles = 0;
  enemyIsDead = false
  walkingAnimationInterval;
  movementInterval;
  characterIsFallingDown = false
  isInvincible = false;


  /**
 * Checks if the current object is colliding with another moveable object.
 * @param {Object} mo - The moveable object to check for collision with.
 * @param {number} mo.x - The x-coordinate of the moveable object.
 * @param {number} mo.y - The y-coordinate of the moveable object.
 * @param {number} mo.width - The width of the moveable object.
 * @param {number} mo.height - The height of the moveable object.
 * @param {Object} mo.offset - The offset values for collision detection.
 * @returns {boolean} - Returns true if a collision is detected, false otherwise.
 */
  isColliding(mo) {
    return (this.x + this.width - this.offset.right > mo.x + mo.offset.left) &&
      (this.y + this.height - this.offset.bottom > mo.y + mo.offset.top) &&
      (this.x + this.offset.left < mo.x + mo.width - mo.offset.right) &&
      (this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom);
  }

  /**
   * Reduces the energy of the object by 20 when hit, unless invincible.
   * Activates invincibility for a short period after being hit.
   */
  hit() {
    if (!this.isInvincible) {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      }
      this.activateInvincibility();
    }
  }

  /**
   * Activates temporary invincibility for the object.
   * Invincibility lasts for 2 seconds before being disabled.
   */
  activateInvincibility() {
    this.isInvincible = true;
    setTimeout(() => {
      this.isInvincible = false;
    }, 2000);
  }

  /**
   * Checks if the object is dead by evaluating its energy level.
   * @returns {boolean} - Returns true if the object has no energy left, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is currently hurt based on the time since the last hit.
   * @returns {boolean} - Returns true if the object was hit within the last 500 milliseconds, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }

  /**
   * Increases the number of collected coins by 1 and plays a coin collection sound.
   */
  collectCoin() {
    this.collectedCoins += 1;
    playSound(coin_sound, 0.1);
  }

  /**
   * Increases the number of collected bottles by 20, up to a maximum of 100 bottles.
   */
  collectBottles() {
    if (this.collectedBottles <= 100) {
      this.collectedBottles += 20;
    }
  }

  /**
   * Moves the object to the right by increasing its x-coordinate by the speed.
   * Sets the object's direction to 'not the other direction'.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate by the speed.
   * Sets the object's direction to 'the other direction'.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Plays the current animation by cycling through a set of images.
   * @param {Array<string>} images - An array of image paths for the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the object, causing it to fall when above ground or moving upwards.
   * Continuously updates the object's vertical position and speed.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground level.
   * Special case: TabascoBottle objects are always considered above ground.
   * @returns {boolean} - Returns true if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof TabascoBottle) {
      return true;
    } else {
      return this.y < 190;
    }
  }

  /**
   * Causes the object to jump by setting its vertical speed.
   * The jump propels the object upwards.
   */
  jump() {
    this.speedY = 20;
  }

  /**
   * Checks if the object is currently falling.
   * @returns {boolean} - Returns true if the object is below a certain height and moving downwards.
   */
  isFalling() {
    return this.y < 140 && this.speedY < 0;
  }
}