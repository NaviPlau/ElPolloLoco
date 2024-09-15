class CoinBar extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];

  percentages;

  /**
   * Creates an instance of the `CoinBar` class.
   * Initializes the coin bar with the default position, size, and loads the coin bar images.
   * 
   * @constructor
   */
  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = 150;
    this.y = 0;
    this.width = 120;
    this.height = 60;
  }

  /**
   * Sets the percentage of coins collected and updates the image accordingly.
   * 
   * @param {number} percentages - The current percentage of coins collected.
   */
  setPercentage(percentages) {
    this.percentages = percentages;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current percentage of coins collected.
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