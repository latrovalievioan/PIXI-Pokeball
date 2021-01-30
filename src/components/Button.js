import { Container, Graphics, Sprite, Text } from "pixi.js";
import gsap from "gsap";
export default class Button extends Container {
  constructor() {
    super();
    this.name = "button";
    this.interactive = true;
    this.buttonMode = true;
    this.x = -150;
    this.y = 200;
    this._draw();
    this._drawText();
  }
  /**
   * @function shows the button
   */
  show() {
    gsap.to(this, { alpha: 1, duration: 0.2 });
  }
  /**
   * @function hides the button
   */
  hide() {
    gsap.to(this, { alpha: 0, duration: 0.2 });
  }
  /**
   * @private
   */
  _draw() {
    const rect = new Graphics();
    rect.beginFill(0xff0000);

    rect.lineStyle(5, 0xf60000);

    rect.drawRect(0, 0, 300, 100);
    this.addChild(rect);
  }
  /**
   * @private
   */
  _drawText() {
    const text = new Text("Throw Ball", {
      fontFamily: "Arial",
      fontSize: 28,
      fill: 0xffffff,
      fontWeight: "bold",
      align: "center",
    });
    text.anchor.set(0.5, 0.5);
    text.x = this.width / 2;
    text.y = this.width / 2 - this.y / 2;
    this.addChild(text);
  }
}
