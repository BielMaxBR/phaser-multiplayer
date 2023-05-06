import { Game, GameObjects, Scene } from "phaser";

export default class Chunk extends GameObjects.Container {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y)
    }
}