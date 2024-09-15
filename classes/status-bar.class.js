class StatusBar extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ]
  percentages;

  /**
     * Creates an instance of `StatusBar`.
     * Calls the `super` constructor to initialize the drawable object,
     * loads the status bar images, and sets the initial position and size.
     */
  constructor() {
    super().loadImage(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 120;
    this.height = 60;
  }

  /**
   * Updates the percentage displayed on the status bar.
   * Changes the image based on the given percentage.
   * @param {number} percentages - The percentage to display on the status bar.
   */
  setPercentage(percentages) {
    this.percentages = percentages;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image based on the current percentage.
   * @returns {number} The index of the image in the `IMAGES` array.
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