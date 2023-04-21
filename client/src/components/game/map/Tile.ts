import { Scene, Tilemaps } from "phaser";

export default class Tile extends Tilemaps.Tile {
    scene: Scene;
    constructor(
        scene: Scene,
        layer: Tilemaps.LayerData,
        index: number,
        x: number,
        y: number
    ) {
        super(layer, index, x, y, 64, 64, 64, 64);
        this.scene = scene;
    }
}
