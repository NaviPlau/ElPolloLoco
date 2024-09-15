class BottleGround extends DrawableObject {
  height = 50;
  width = 30;
  x = 400 + Math.random() * 5000;
  y = 380;
  offset = {
    right: 8,
    left: 8,
    top: 8,
    bottom: 3,
  };

  BOTTLE_GROUND_IMAGE = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';

  /**
   * Creates an instance of the `BottleGround` class.
   * Loads the bottle image and sets the initial position of the bottle on the ground.
   * The horizontal position (`x`) is randomized within a range.
   * 
   * @constructor
   */
  constructor() {
    super().loadImage(this.BOTTLE_GROUND_IMAGE);
  }
}