class BossHp extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
  ];

  percentages;

  /**
   * Creates an instance of the `BossHp` class.
   * Initializes the object with default position, dimensions, and loads the health bar images.
   * 
   * @constructor
   */
  constructor() {
    super().loadImage(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
    this.x = 570;
    this.y = 10;
    this.width = 120;
    this.height = 60;
  }

  /**
   * Sets the percentage of the boss's health and updates the image accordingly.
   * 
   * @param {number} percentages - The current health percentage of the boss.
   */
  setPercentage(percentages) {
    this.percentages = percentages;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current percentage of the boss's health.
   * 
   * @returns {number} The index of the corresponding image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentages > 80) {
      return 5;
    } else if (this.percentages > 60) {
      return 4;
    } else if (this.percentages > 40) {
      return 3;
    } else if (this.percentages > 20) {
      return 2;
    } else if (this.percentages > 1) {
      return 1;
    } else {
      return 0;
    }
  }
}