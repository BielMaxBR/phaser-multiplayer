import { GameObjects, Math as PhaserMath, Scene, Tilemaps } from "phaser";
import Tile from "./Tile";

export default class GameMap extends GameObjects.Container {
    grid: Tile[][] = [];
    private layer = new Tilemaps.LayerData({
        baseTileHeight: 64,
        baseTileWidth: 64,
    });
    constructor(scene: Scene) {
        super(scene);
        scene.add.existing(this);

        // testes
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                const pos = this.tileToWorld(x, y);
                this.addTile(new Tile(scene, pos.x, pos.y), x, y);
            }
        }
    }

    addTile(tile: Tile, x: number, y: number) {
        if (typeof this.grid[x] == "undefined") this.grid[x] = [];
        this.grid[x][y] = tile;
        this.add(tile);
    }

    generateTile(x: number, y: number) {
        // const newTile: Tile = new Tile(this.scene)
    }

    // função copiada do código fonte do phaser
    tileToWorld(tileX: number, tileY: number) {
        let point = new PhaserMath.Vector2();

        var tileWidth = this.layer.baseTileWidth;
        var tileHeight = this.layer.baseTileHeight;

        var worldX = 0;
        var worldY = 0;

        //  origin
        var tileWidthHalf = tileWidth / 2;
        var tileHeightHalf = tileHeight / 2;

        var x = worldX + tileWidth * tileX + tileWidth;
        var y = worldY + 1.5 * tileY * tileHeightHalf + tileHeightHalf;

        if (tileY % 2 === 0) {
            x -= tileWidthHalf;
        }

        return point.set(x, y);
    }

    // função copiada do código fonte do phaser
    worldToTile(worldX: number, worldY: number) {
        let point = new PhaserMath.Vector2();

        var tileWidth = this.layer.baseTileWidth;
        var tileHeight = this.layer.baseTileHeight;
        //  Hard-coded orientation values for Pointy-Top Hexagons only
        var b0 = 0.5773502691896257; // Math.sqrt(3) / 3
        var b1 = -0.3333333333333333; // -1 / 3
        var b2 = 0;
        var b3 = 0.6666666666666666; // 2 / 3

        //  origin
        var tileWidthHalf = tileWidth / 2;
        var tileHeightHalf = tileHeight / 2;

        //  x = b0 * tileWidth
        //  y = tileHeightHalf
        var px = (worldX - tileWidthHalf) / (b0 * tileWidth);
        var py = (worldY - tileHeightHalf) / tileHeightHalf;

        var q = b0 * px + b1 * py;
        var r = b2 * px + b3 * py;

        var s = -q - r;

        var qi = Math.round(q);
        var ri = Math.round(r);
        var si = Math.round(s);

        var qDiff = Math.abs(qi - q);
        var rDiff = Math.abs(ri - r);
        var sDiff = Math.abs(si - s);

        if (qDiff > rDiff && qDiff > sDiff) {
            qi = -ri - si;
        } else if (rDiff > sDiff) {
            ri = -qi - si;
        }

        var y = ri;

        var x = y % 2 === 0 ? ri / 2 + qi : ri / 2 + qi - 0.5;

        return point.set(x, y);
    }
}
