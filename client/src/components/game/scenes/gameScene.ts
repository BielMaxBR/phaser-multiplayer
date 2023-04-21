import { Tilemaps } from "phaser";
import { GAME_SCENE } from "../../../Utils/constants";
import GameMap from "../map/GameMap";
import Tile from "../map/Tile";

export class GameScene extends Phaser.Scene {
    map: Tilemaps.Tilemap;
    constructor() {
        super({
            key: GAME_SCENE,
        });
    }
    create() {
        console.log("criando tilemap");
        this.map = new GameMap(this);
    }
}
