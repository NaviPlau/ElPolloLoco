class Coin extends MovableObject {
  height = 30;
  widths = [30, 25, 20, 15, 15, 10, 15, 20, 25, 30];
  x = 200 + Math.random() * 7000;
  y = 100 + Math.random() * 120;

  IMAGES_TURN = [
    'img/Gold/Gold_1.png',
    'img/Gold/Gold_2.png',
    'img/Gold/Gold_3.png',
    'img/Gold/Gold_4.png',
    'img/Gold/Gold_5.png',
    'img/Gold/Gold_6.png',
    'img/Gold/Gold_7.png',
    'img/Gold/Gold_8.png',
    'img/Gold/Gold_9.png',
    'img/Gold/Gold_10.png',
  ];

  /**
   * Creates an instance of the `Coin` class.
   * Initializes the coin with random position and sets up the turning animation.
   * 
   * @constructor
   */
  constructor() {
    super().loadImage(this.IMAGES_TURN[0]);
    this.loadImages(this.IMAGES_TURN);
    this.animate();
  }

  /**
   * Starts the coin's turning animation by calling the turning animation function.
   */
  animate() {
    this.playturningAnimation();
  }

  /**
   * Continuously plays the coin's turning animation by cycling through images.
   * Also updates the coin's width dynamically to simulate turning.
   */
  playturningAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_TURN);
      this.currentImage = (this.currentImage + 1) % this.IMAGES_TURN.length;
      let i = this.currentImage % this.IMAGES_TURN.length;
      this.width = this.widths[i];
    }, 200);
  }
}
