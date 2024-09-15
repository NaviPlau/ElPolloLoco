class World {
  character = new Character();
  level = level1;
  ctx = null;
  canvas = null;
  keyboard = null;
  camera_x = 0;
  bossHpBar = new BossHp();
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  tabascoBottle = [];
  endboss = new Endboss(this.character);

 /**
 * Creates an instance of the World.
 * @constructor
 * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
 * @param {Keyboard} keyboard - The keyboard handler for capturing user input.
 */
constructor(canvas, keyboard) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.keyboard = keyboard;
  this.draw();
  this.setWorld();
  this.startCollisionChecks();
}

   /**
   * Sets the world context for the character.
   */
   setWorld() {
    this.character.world = this;
  }

  /**
   * Starts collision checks for various game elements.
   */
  startCollisionChecks() {
    this.createInterval(this.checkChickenCollision.bind(this), 30);
    this.createInterval(this.checkCoinCollision.bind(this), 50);
    this.createInterval(this.checkBottleCollision.bind(this), 50);
    this.createInterval(this.checkTabascoThrow.bind(this), 120);
    this.createInterval(this.checkTabascoEnemyCollision.bind(this), 30);
    this.createInterval(this.checkTabascoBossCollision.bind(this), 200);
    this.createInterval(this.checkCharacterEndBossCollision.bind(this), 50);
  }

  /**
   * Creates a repeating interval to execute a function.
   * @param {Function} fn - The function to execute.
   * @param {number} interval - The interval time in milliseconds.
   */
  createInterval(fn, interval) {
    setInterval(fn, interval);
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkChickenCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isFalling()) {
          this.handleEnemyDeath(index);
        } else {
          this.character.hit();
          this.updateStatusBar();
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCoinCollision() {
    this.level.coin.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.removeItemFromArray(this.level.coin, index);
        this.updateCoinBar();
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles on the ground.
   */
  checkBottleCollision() {
    this.level.bottleGround.forEach((bottleGround, index) => {
      if (this.character.isColliding(bottleGround)) {
        if (this.character.collectedBottles <= 80) {
          this.character.collectBottles();
          this.removeItemFromArray(this.level.bottleGround, index);
          this.updateBottleBar();
        }
      }
    });
  }

  /**
   * Checks if the player presses the throw tabasco key.
   */
  checkTabascoThrow() {
    if (this.keyboard.F && this.character.collectedBottles > 19) {
      this.throwTabasco();
    }
  }

  /**
   * Checks for collisions between tabasco bottles and enemies.
   */
  checkTabascoEnemyCollision() {
    this.tabascoBottle.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          this.handleTabascoHitEnemy(bottleIndex, enemyIndex);
        }
      });
    });
  }

  /**
   * Checks for collisions between tabasco bottles and the end boss.
   */
  checkTabascoBossCollision() {
    this.tabascoBottle.forEach((bottle, index) => {
      if (bottle.isColliding(this.endboss)) {
        this.handleTabascoHitBoss(index);
      }
    });
  }

  /**
   * Checks for collisions between the character and the end boss.
   */
  checkCharacterEndBossCollision() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.updateStatusBar();
    }
  }

  /**
   * Handles the death of an enemy.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  handleEnemyDeath(enemyIndex) {
    const enemy = this.level.enemies[enemyIndex];
    enemy.die();
    this.scheduleItemRemoval(this.level.enemies, enemyIndex, 200);
  }

  /**
   * Handles a collision between a tabasco bottle and an enemy.
   * @param {number} bottleIndex - The index of the tabasco bottle in the tabascoBottle array.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  handleTabascoHitEnemy(bottleIndex, enemyIndex) {
    const bottle = this.tabascoBottle[bottleIndex];
    const enemy = this.level.enemies[enemyIndex];
    bottle.playSplashAnimation();
    playSound(bottleBreakAudio, 0.03);
    enemy.die();
    this.scheduleItemRemoval(this.level.enemies, enemyIndex, 200);
    this.scheduleItemRemoval(this.tabascoBottle, bottleIndex, 500);
  }

  /**
   * Handles a collision between a tabasco bottle and the end boss.
   * @param {number} bottleIndex - The index of the tabasco bottle in the tabascoBottle array.
   */
  handleTabascoHitBoss(bottleIndex) {
    const bottle = this.tabascoBottle[bottleIndex];
    bottle.playSplashAnimation();
    this.endboss.hit();
    this.bossHpBar.setPercentage(this.endboss.energy);
    playSound(bottleBreakAudio, 0.03);
    this.scheduleItemRemoval(this.tabascoBottle, bottleIndex, 100);
  }

  /**
   * Throws a tabasco bottle and updates the character's bottle count.
   */
  throwTabasco() {
    let bottle = new TabascoBottle(this.character.x + 60, this.character.y + 70, this.character);
    this.tabascoBottle.push(bottle);
    this.character.collectedBottles -= 20;
    this.updateBottleBar();
  }

  /**
   * Updates the status bar with the current character's energy.
   */
  updateStatusBar() {
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Updates the coin bar with the current number of collected coins.
   */
  updateCoinBar() {
    this.coinBar.setPercentage(this.character.collectedCoins);
  }

  /**
   * Updates the bottle bar with the current number of collected bottles.
   */
  updateBottleBar() {
    this.bottleBar.setPercentage(this.character.collectedBottles);
  }

  /**
   * Removes an item from an array at a specified index.
   * @param {Array} array - The array from which to remove the item.
   * @param {number} index - The index of the item to remove.
   */
  removeItemFromArray(array, index) {
    array.splice(index, 1);
  }

  /**
   * Schedules the removal of an item from an array after a specified delay.
   * @param {Array} array - The array from which to remove the item.
   * @param {number} index - The index of the item to remove.
   * @param {number} delay - The delay in milliseconds before removal.
   */
  scheduleItemRemoval(array, index, delay) {
    setTimeout(() => {
      this.removeItemFromArray(array, index);
    }, delay);
  }

  /**
   * Clears the canvas and draws all game elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addBackgroundObjectsToMap();
    this.addMovablesToMap();
    this.ctx.translate(-this.camera_x, 0);
    this.addBarsToMap();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds background objects to the map.
   */
  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottleGround);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Adds status bars and the boss health bar to the map.
   */
  addBarsToMap() {
    this.addtoMap(this.statusBar);
    this.addtoMap(this.coinBar);
    this.addtoMap(this.bottleBar);
    this.addtoMap(this.bossHpBar);
  }

  /**
   * Adds movable objects and entities to the map.
   */
  addMovablesToMap() {
    this.addtoMap(this.character);
    this.addtoMap(this.endboss);
    this.addObjectsToMap(this.tabascoBottle);
    this.addObjectsToMap(this.level.enemies);
  }

  /**
   * Adds a list of objects to the map.
   * @param {Array} objects - The list of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addtoMap(o);
    });
  }

  /**
   * Draws an object on the map, flipping it if needed.
   * @param {Object} mo - The object to draw.
   */
  addtoMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    /*mo.drawFrame(this.ctx)*/
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally.
   * @param {Object} mo - The object whose image to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the horizontal flip of the image.
   * @param {Object} mo - The object whose image to unflip.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}