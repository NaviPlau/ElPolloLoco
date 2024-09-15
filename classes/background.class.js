class Background extends MovableObject {
  height = 600;
  width = 720;
  y = -100;
  x = 0;

  /**
   * Creates an instance of the `Background` class.
   * Loads the image and sets the horizontal position (`x`).
   * 
   * @constructor
   * @param {string} imagepath - The path to the image file for the background.
   * @param {number} x - The initial horizontal position of the background.
   */
  constructor(imagepath, x) {
    super().loadImage(imagepath);
    this.x = x;
  }
}