class BottleBar extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
  ];

  percentages;

  /**
   * Creates an instance of the `BottleBar` class.
   * Initializes the object with default position, dimensions, and loads the bottle status bar images.
   * 
   * @constructor
   */
  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = 280;
    this.y = 0;
    this.width = 120;
    this.height = 60;
  }

  /**
   * Sets the percentage of bottles collected and updates the image accordingly.
   * 
   * @param {number} percentages - The current percentage of bottles collected.
   */
  setPercentage(percentages) {
    this.percentages = percentages;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current percentage of bottles collected.
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