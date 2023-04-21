import { GAME_SCENE } from "../../Utils/constants";
import { PRELOADER_SCENE } from "../../Utils/constants";

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: PRELOADER_SCENE,
        });
    }

    preload() {
        this.load.image("tiles", "assets/tileset.png")
    }

    create() {
        // this.plugins.start("client")
        console.log("cena pronta")
        // this.sys.client.onReady(err => {
        //     if (err) return
        this.scene.start(GAME_SCENE)
        // })
    }
}