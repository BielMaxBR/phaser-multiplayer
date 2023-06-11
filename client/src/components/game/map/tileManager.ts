import { GameObjects, Math as PhaserMath, Scene } from "phaser";
import Tile from "./Tile";
import {
    tileToWorld,
} from "../../../Utils/hexFunctions";

export default class TileManager extends GameObjects.Container {
    grid: Tile[][] = [];
    constructor(scene: Scene) {
        super(scene);
        scene.add.existing(this);
    }

    addTile(tile: Tile, position: PhaserMath.Vector2) {
        if (typeof this.grid[position.x] == "undefined") {
            this.grid[position.x] = [];
        }
        this.grid[position.x][position.y] = tile;
        this.scene.add.existing(tile);
        return tile;
    }

    removeTile(position: PhaserMath.Vector2) {
        this.grid[position.x].splice(position.y, 1);
    }

    getTile(position: PhaserMath.Vector2) {
        if (!this.tileExists(position)) return null;
        return this.grid[position.x][position.y];
    }

    tileExists(position: PhaserMath.Vector2) {
        if (typeof this.grid[position.x] == "undefined") return false;
        return this.grid[position.x][position.y] instanceof Tile;
    }

    createTile(position: PhaserMath.Vector2) {
        const tilePosition = tileToWorld(position);
        const newTile = new Tile(this.scene, tilePosition.x, tilePosition.y);
        newTile.tilePosition = new PhaserMath.Vector2(position);
        return newTile;
    }

    createAndAddTile(position: PhaserMath.Vector2) {
        if (this.tileExists(position)) return this.getTile(position);
        const tile = this.createTile(position);

        return this.addTile(tile, position);
    }

}
