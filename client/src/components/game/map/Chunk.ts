import { Game, GameObjects, Scene } from "phaser";
import Tile from "./Tile";

export default class Chunk extends GameObjects.Container {
    center: Tile
    chunkPosition: Phaser.Math.Vector2
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y)
    }
}