import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import gsap from "gsap";

export default class Pokeball extends Container {
  /**
   * @Returns object
   * @static
   */
  static get events() {
    return {
      OPEN_END: "open_end",
      OPEN_START: "open_start",
      CLOSE_END: "cose_end",
      CLOSE_START: "close_start",
    };
  }

  constructor() {
    super();
    this.name = "pokeball";
    this.text = new Text("KURVI", {
      fontFamily: "Arial",
      fontSize: 150,
      fill: 0xffffff,
      fontWeight: "bold",
      align: "center",
    });
    this.text.anchor.set(0.5, 0.5);
    this.text.x = this.width / 2;
    this.text.y = this.width / 2 - 100;
    this.text.alpha = 0;
    this.top = Sprite.from("ballTop");
    this.bottom = Sprite.from("ballBottom");
    this.isOpened = false;
    this.top.anchor.set(0.5, 0.5);
    this.top.y = -150;
    this.bottom.anchor.set(0.5, 0.5);
    this.bottom.y = 40;
    this.addChild(this.text);
    this.addChild(this.top);
    this.addChild(this.bottom);

    this.pokemons = [
      "Bulbasour",
      "Charizard",
      "Squirtle",
      "Rattata",
      "Pikachu",
      "Eevee",
    ];
  }

  /**
   * @async
   */

  async open() {
    this.emit(Pokeball.events.OPEN_START);
    gsap.to(this.top, { y: -300, ease: "bounce", duration: 1 });
    gsap.to(this.bottom, { y: 100, ease: "bounce", duration: 1 });
    gsap.to(this.text, { alpha: 1 });
    await this._shuffle();
    await gsap.to(this.text, { alpha: 0 });
  }

  /**
   * @async
   */
  async close() {
    this.emit(Pokeball.events.CLOSE_START);
    gsap.to(this.top, { y: -150, duration: 0.2 });
    gsap.to(this.bottom, { y: 40, duration: 0.2 });
  }

  /**
   * @async
   * @private
   */
  async _shuffle() {
    let prev = 0;
    const dummy = { value: 0 };
    const steps = gsap.to(dummy, {
      duration: 1,
      ease: "steps(100)",
      value: 100,
      paused: true,
      onUpdate: () => {
        if (dummy.value !== prev) this._setRandomText();
        prev = dummy.value;
      },
    });
    await gsap.to(steps, { duration: 5, progress: 1, ease: "circ.out" });
  }
  /**
   * @private
   */
  _setRandomText() {
    this.text.text = this.pokemons[
      Math.floor(Math.random() * this.pokemons.length)
    ];
  }
}
