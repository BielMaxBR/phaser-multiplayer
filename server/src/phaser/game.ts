import "@geckos.io/phaser-on-nodejs";
import Phaser from "phaser";

class Game extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.HEADLESS,
            parent: "phaser-game",
            width: 1024,
            height: 832,
            zoom: 1,
            banner: false,
        });
    }
}

export const game = new Game()