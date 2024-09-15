class DrawableObject {
  x;
  y;
  height;
  width;
  img;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Loads a set of images into the image cache.
   * 
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Loads a single image and sets it as the current image.
   * 
   * @param {string} path - The path to the image file to be loaded.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image on the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  
  /**
   * Draws the frame around the object if it is an instance of a specific class.
   * 
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (this.setDrawInstances()) {
      this.drawFramesImages(ctx);
      this.drawOffsetFrame(ctx);
    }
  }
  
  /**
   * Draws a frame around the object's bounding box.
   * 
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawFramesImages(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Adjusts the frame dimensions based on the offset values.
   * 
   * @returns {Object} An object containing the adjusted position and size of the frame.
   */
  adjustOffsetFrame() {
    const adjustedX = this.x + this.offset.left;
    const adjustedY = this.y + this.offset.top;
    const adjustedWidth = this.width - this.offset.left - this.offset.right;
    const adjustedHeight = this.height - this.offset.top - this.offset.bottom;
    return {
      adjustedX,
      adjustedY,
      adjustedWidth,
      adjustedHeight
    };
  }

  /**
   * Draws the offset frame around the object.
   * 
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawOffsetFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'red';
    const { adjustedX, adjustedY, adjustedWidth, adjustedHeight } = this.adjustOffsetFrame();
    ctx.rect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
    ctx.stroke();
  }

  /**
   * Determines if the current object should have a frame drawn based on its type.
   * 
   * @returns {boolean} `true` if the object is an instance of specific classes, `false` otherwise.
   */
  setDrawInstances() {
    return this instanceof Character
      || this instanceof Chicken
      || this instanceof Coin
      || this instanceof SmallChicken
      || this instanceof Endboss
      || this instanceof BottleGround
      || this instanceof TabascoBottle;
  }
}