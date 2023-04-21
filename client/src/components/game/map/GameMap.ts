import { Scene, Tilemaps } from "phaser";
import Tile from "./Tile";

export default class GameMap extends Tilemaps.Tilemap {
    constructor(scene: Scene) {
        const mapData: Tilemaps.MapData = new Tilemaps.MapData({
            orientation: Tilemaps.HEXAGONAL,
            width: 20,
            height: 20,
            tileHeight: 64,
            tileWidth: 64,
            format: Tilemaps.Formats.TILED_JSON,
            layers: [
                new Tilemaps.LayerData({
                    name: "layer0",
                    width: 20,
                    height: 20,
                    data: [[0]],
                }),
            ],
            tilesets: [new Tilemaps.Tileset("tileset", 1, 64, 64)],
        });

        mapData.layers[0].hexSideLength = 34;
        mapData.layers[0].orientation = Tilemaps.HEXAGONAL;
        mapData.layers[0].staggerAxis = "y"
        super(scene, mapData);

        this.createLayer("layer0", this.addTilesetImage("tileset", "tiles", 64, 64), 0, 0);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const tile = new Tile(this.scene, this.layer, 1, i, j);
                this.setTile(tile, i, j);
            }
        }
    }

    setTile(tile: Tile, x: number, y: number) {
        const data = this.layer.data;

        if (data[y] === undefined) data[y] = [];

        data[y][x] = tile;
    }
}
