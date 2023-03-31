import ClientManager from "../components/game/plugins/client/ClientManager";
import { Types } from "phaser";

export interface GameOptions {
    scale: object;
    type: number;
    width: number;
    height: number;
    parent: string;
    plugins: Types.Core.PluginObject;
}

export function getPhaserConfig(): GameOptions {
    return {
        scale: {
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
            autoCenter: Phaser.Scale.CENTER_VERTICALLY,
        },
        type: Phaser.CANVAS,
        width: 1280,
        height: 720,
        parent: "game",
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
