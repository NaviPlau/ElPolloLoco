class Clouds extends MovableObject {
  height = 100 + Math.random() * 200;
  width = 200 + Math.random() * 400;
  y = 20;
  x = -200 + Math.random() * 25000;
  speed = 0.2 + Math.random() * 1;

  /**
   * Creates an instance of the `Clouds` class.
   * Initializes the cloud with a random size and position, loads the cloud image, and starts animation.
   * 
   * @constructor
   * @param {string} imagepath - The path to the image file for the cloud.
   */
  constructor(imagepath) {
    super().loadImage(imagepath);
    this.animate();
  }

  /**
   * Starts the cloud animation by moving the clouds.
   */
  animate() {
    this.moveClouds();
  }

  /**
   * Moves the cloud continuously to the left at a set interval.
   */
  moveClouds() {
    setInterval(() => {
      this.moveLeft();
      this.otherDirection = null;
    }, 1000 / 60);
  }
}