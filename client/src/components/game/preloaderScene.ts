import { PRELOADER_SCENE } from "../../Utils/constants";

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: PRELOADER_SCENE,
        });
    }
    create() {
        this.plugins.start("client")
        console.log("cena pronta")
        // this.sys.client.onReady(err => {
        //     if (err) return
        //     this.scene.start(GAME_SCENE)
        // })
    }
}