import {
    GameObjects,
    Geom,
    Math as PhaserMath,
    Scene,
    Types,
} from "phaser";
import Tile from "./Tile";
import { div } from "../../../Utils/maths";
import { MATHS } from "../../../Utils/constants";
import Chunk from "./Chunk";

export default class GameMap extends GameObjects.Container {
    grid: Tile[][] = [];
    chunkRadius = 2;
    area = 3 * (this.chunkRadius ** 2 + this.chunkRadius) + 1;
    shift = 3 * this.chunkRadius + 2;
    chunks: Chunk[] = [];
    currentChunk: Chunk;
    /*
        o chunk terá uma lista com o dobro do tamanho da area de visão do player, ou talvez mais
        ele vai adicionando os chunks visíveis no inicio da lista, e ordena que os mais distantes fiquem no final, para serem apagados depois
        os que adiciono, eu ativo o loop fisico, e os que retiro eu paro
        
    */
    viewDistanceInChunks = 0;
    constructor(scene: Scene) {
        super(scene);
        scene.add.existing(this);

        // testes
        for (const { x, y } of this.get_area(
            { x: 0, y: 0 },
            this.viewDistanceInChunks
        )) {
            const pos = this.center_of({ x, y });
            console.log(pos);
            const realPos = this.tileToWorld(pos.x, pos.y);

            for (const aroundPos of this.get_area(
                { x: pos.x, y: pos.y },
                this.chunkRadius
            )) {
                const aroundReal = this.tileToWorld(aroundPos.x, aroundPos.y);
                // console.log(this.worldToTile(aroundReal).subtract(aroundPos));
                this.addTile(
                    new Tile(scene, aroundReal.x, aroundReal.y),
                    aroundPos.x,
                    aroundPos.y
                );
            }

            this.addTile(new Tile(scene, realPos.x, realPos.y), pos.x, pos.y);
        }
    }

    getCurrentChunk(vect: Types.Math.Vector2Like) {
        return this.smallToBig(this.worldToTile(vect));
    }

    addTile(tile: Tile, x: number, y: number) {
        if (typeof this.grid[x] == "undefined") this.grid[x] = [];
        this.grid[x][y] = tile;
        this.add(tile);
    }

    generateChunks(view: Geom.Rectangle) {
        const center = { x: view.centerX, y: view.centerY };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const centerChunk = this.getCurrentChunk(center);
        
        // if (this.currentChunk != centerChunk) {
        //     this.currentChunk = centerChunk
        // }
    }

    // funções a seguir copiadas do site https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
    tileToWorld(tileX: number, tileY: number) {
        const point = new PhaserMath.Vector2();

        const x = Math.round(
            MATHS.HEXWITH * (MATHS.SQRT * tileX + MATHS.SQRT32 * tileY)
        );
        const y = MATHS.HEXHEIGHT * (1.5 * tileY);

        return point.set(x, y);
    }

    worldToTile(vect: Types.Math.Vector2Like) {
        const worldX: number = vect.x;
        const worldY: number = vect.y;
        const point = new PhaserMath.Vector2();

        const tileWidth = MATHS.HEXWITH;
        const tileHeight = MATHS.HEXHEIGHT;

        const b0 = 0.5773502691896257; // Math.sqrt(3) / 3
        const b1 = -0.3333333333333333; // -1 / 3
        const b2 = 0.6666666666666666; // 2 / 3

        const q = (b0 * worldX + b1 * worldY) / tileWidth;
        const r = (b2 * worldY) / tileHeight;
        const s = -q - r;

        let x = Math.round(q);
        let y = Math.round(r);
        const z = Math.round(s);

        const q_diff = Math.abs(x - q);
        const r_diff = Math.abs(y - r);
        const s_diff = Math.abs(z - s);

        if (q_diff > r_diff && q_diff > s_diff) {
            x = -y - z;
        } else if (r_diff > s_diff) {
            y = -x - z;
        }
        return point.set(x, y);
    }

    smallToBig(vect: Types.Math.Vector2Like) {
        const z = -(vect.x + vect.y);

        const xh = div(vect.y + this.shift * vect.x, this.area),
            yh = div(z + this.shift * vect.y, this.area),
            zh = div(vect.x + this.shift * z, this.area);
        const i = div(1 + xh - yh, 3),
            j = div(1 + yh - zh, 3),
            k = div(1 + zh - xh, 3);
        return { x: i, y: j, z: k };
    }

    center_of(vect: Types.Math.Vector2Like) {
        const z = -(vect.x + vect.y);

        return new PhaserMath.Vector2(
            (this.chunkRadius + 1) * vect.x - this.chunkRadius * z,
            (this.chunkRadius + 1) * vect.y - this.chunkRadius * vect.x
        );
    }

    get_area(center: Types.Math.Vector2Like, range: number) {
        const results = [];
        for (let x = -range; x <= range; x++) {
            for (
                let y = Math.max(-range, -x - range);
                y <= Math.min(+range, -x + range);
                y++
            ) {
                results.push({ x: center.x + x, y: center.y + y });
            }
        }
        return results;
    }
}
