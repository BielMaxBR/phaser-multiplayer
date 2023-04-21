import { Types } from "phaser";
import ClientManager from "../components/game/plugins/client/ClientManager";
import { PreloaderScene } from "../components/game/preloaderScene";
import { GameScene } from "../components/game/scenes/gameScene";

export function getPhaserConfig(): Types.Core.GameConfig {
    return {
        scale: {
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
            autoCenter: Phaser.Scale.CENTER_VERTICALLY,
        },
        type: Phaser.CANVAS,
        width: 640,
        height: 360,
        parent: "game",
        pixelArt: true,
        scene: [PreloaderScene, GameScene],
        plugins: {
            scene: [
                {
                    sceneKey: "client",
                    key: "client",
                    plugin: ClientManager
                },
            ],
        },
    };
}
