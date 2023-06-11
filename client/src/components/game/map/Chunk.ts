import { GameObjects, Math, Scene } from "phaser";
import Tile from "./Tile";
import { getArea } from "../../../Utils/hexFunctions";
import TileManager from "./tileManager";

export default class Chunk extends GameObjects.Container {
    center: Tile;
    list: Tile[] = [];
    chunkPosition: Phaser.Math.Vector2;
    constructor(scene: Scene, position: Math.Vector2) {
        super(scene, position.x, position.y);
    }
    update() {
        // console.log('vai?')
    }

    show() {
        for (const tile of this.list) {
            tile.setVisible(true)
            tile.addToDisplayList()
        }
    }
    hide() {
        for (const tile of this.list) {
            tile.setVisible(false)
            tile.removeFromDisplayList()
        }
    }
    load() {
        for (const tile of this.list) {
            tile.setActive(true)
            tile.addToUpdateList()
        }
    }
    unload() {
        for (const tile of this.list) {
            tile.setActive(false)
            tile.removeFromUpdateList()
        }
    }

    setTiles(radius: number, tileManager: TileManager) {

        for (const tilePosition of getArea(this.center.tilePosition, radius)) {
            const newTile = tileManager.createAndAddTile(tilePosition);

            if (!this.list.includes(newTile)) {
                this.list.push(newTile);
            }
        }
    }
}
