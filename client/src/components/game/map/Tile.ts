import { GameObjects, Scene } from "phaser";

export default class Tile extends GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "tiles");
    }

    protected preUpdate(time: number, delta: number): void {
        // console.log("a")
    }
}
