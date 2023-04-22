import { Scene, Tilemaps } from "phaser";
import Tile from "./Tile";

export default class GameMap extends Tilemaps.Tilemap {
    constructor(scene: Scene) {
        const mapData: Tilemaps.MapData = new Tilemaps.MapData({
            orientation: "hexagonal",
            width: 100,
            height: 100,
            tileHeight: 64,
            tileWidth: 64,
            format: Tilemaps.Formats.TILED_JSON,
            layers: [
                new Tilemaps.LayerData({
                    name: "layer0",
                    width: 20,
                    height: 20,
                    baseTileHeight: 64,
                    baseTileWidth: 64,
                    tileHeight: 64,
                    tileWidth: 64
                }),
            ],
            tilesets: [new Tilemaps.Tileset("tileset", 0, 64, 64)],
        });

        mapData.layers[0].hexSideLength = 34;
        mapData.layers[0].orientation = Tilemaps.HEXAGONAL;
        mapData.layers[0].staggerAxis = "y"
        super(scene, mapData);

        this.createLayer("layer0", this.addTilesetImage("tileset", "tiles", 64, 64), 0, 0);

        for (let x = 0; x < this.layer.width; x++) {
            for (let y = 0; y < this.layer.height; y++) {
                const tile = new Tile(this.scene, this.layer, 0, x, y);
                this.setTile(tile, x, y);
            }
        }
    }

    setTile(tile: Tile, x: number, y: number) {
        const data = this.layer.data;

        if (data[y] === undefined) data[y] = [];

        data[y][x] = tile;
    }
}
