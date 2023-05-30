import { GameObjects, Scene } from "phaser";

export default class Tile extends GameObjects.Sprite {
    tilePosition: Phaser.Math.Vector2
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "tiles");
    }
}
