class Level {
  enemies;
  clouds;
  background;
  coin;
  bottleGround;
  level_end_x = 719 * 10

  firstSet = [
    'img/5_background/layers/air.png',
    'img/5_background/layers/3_third_layer/1.png',
    'img/5_background/layers/2_second_layer/1.png',
    'img/5_background/layers/1_first_layer/1.png',
  ];

  secondSet = [
    'img/5_background/layers/air.png',
    'img/5_background/layers/3_third_layer/2.png',
    'img/5_background/layers/2_second_layer/2.png',
    'img/5_background/layers/1_first_layer/2.png',
  ];

/**
 * Represents a level in the game.
 * @param {Array} enemies - The array to store enemy objects.
 * @param {Array} clouds - The array to store cloud objects.
 * @param {Array} background - The array to store background objects.
 * @param {Array} coin - The array to store coin objects.
 * @param {Array} bottleGround - The array to store bottle ground objects.
 */
constructor(enemies, clouds, background, coin, bottleGround) {
  this.background = background;
  this.clouds = clouds;
  this.enemies = enemies;
  this.coin = coin;
  this.bottleGround = bottleGround;
  this.addElements();
}

/**
 * Adds all elements (enemies, coins, bottles, clouds, and background) to the game level.
 */
addElements() {
  this.addSmallChicken();
  this.addNormalChicken();
  this.addCoins();
  this.addBottles();
  this.addBackground();
  this.addClouds();
}

/**
 * Adds 40 small chicken enemies to the `enemies` array.
 */
addSmallChicken() {
  for (let i = 0; i < 40; i++) {
    this.enemies.push(new SmallChicken());
  }
}

/**
 * Adds 40 normal chicken enemies to the `enemies` array.
 */
addNormalChicken() {
  for (let i = 0; i < 40; i++) {
    this.enemies.push(new Chicken());
  }
}

/**
 * Adds 100 coin objects to the `coin` array.
 */
addCoins() {
  for (let i = 0; i < 100; i++) {
    this.coin.push(new Coin());
  }
}

/**
 * Adds 30 bottle ground objects to the `bottleGround` array.
 */
addBottles() {
  for (let i = 0; i < 30; i++) {
    this.bottleGround.push(new BottleGround());
  }
}

/**
 * Adds 100 cloud objects to the `clouds` array. 50 clouds with one image and 50 with another.
 */
addClouds() {
  for (let i = 0; i < 50; i++) {
    this.clouds.push(new Clouds('img/5_background/layers/4_clouds/2.png'));
  }
  for (let i = 0; i < 50; i++) {
    this.clouds.push(new Clouds('img/5_background/layers/4_clouds/1.png'));
  }
}

/**
 * Adds background elements to the `background` array. Creates two sets of backgrounds based on predefined images.
 */
addBackground() {
  for (let i = 0; i < 6; i++) {
    this.firstSet.forEach((image) => {
      this.background.push(new Background(image, 719 * (i * 2)));
    });
    this.secondSet.forEach((image) => {
      this.background.push(new Background(image, 719 * (i * 2 + 1)));
    });
  }
}
}