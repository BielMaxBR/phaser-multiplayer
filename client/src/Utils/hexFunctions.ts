import { Math as PhaserMath } from "phaser";
import { MATHS } from "./constants";
import { div } from "./maths";

// funções a seguir copiadas do site https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
export function tileToWorld(vect: PhaserMath.Vector2) {
    const point = new PhaserMath.Vector2();

    const x = Math.round(
        MATHS.HEXWITH * (MATHS.SQRT * vect.x + MATHS.SQRT32 * vect.y)
    );
    const y = MATHS.HEXHEIGHT * (1.5 * vect.y);

    return point.set(x, y);
}

export function worldToTile(vect: PhaserMath.Vector2) {
    const worldX: number = vect.x;
    const worldY: number = vect.y;

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
    return new PhaserMath.Vector2(x, y);
}
export function smallToBig(vect: PhaserMath.Vector2, radius: number) {
    const area = 3 * (radius ** 2 + radius) + 1;
    const shift = 3 * radius + 2;
    const z = -(vect.x + vect.y);

    const xh = div(vect.y + shift * vect.x, area),
        yh = div(z + shift * vect.y, area),
        zh = div(vect.x + shift * z, area);
    const i = div(1 + xh - yh, 3),
        j = div(1 + yh - zh, 3);
    // k = div(1 + zh - xh, 3);
    return new PhaserMath.Vector2(i, j);
}
export function getCurrentChunkPosition(vect: PhaserMath.Vector2,radius: number) {
    return smallToBig(worldToTile(vect),radius);
}

export function centerOf(vect: PhaserMath.Vector2, radius: number) {
    const z = -(vect.x + vect.y);

    return new PhaserMath.Vector2(
        (radius + 1) * vect.x - radius * z,
        (radius + 1) * vect.y - radius * vect.x
    );
}

export function getArea(center: PhaserMath.Vector2, range: number) {
    const results: PhaserMath.Vector2[] = [];
    for (let x = -range; x <= range; x++) {
        for (
            let y = Math.max(-range, -x - range);
            y <= Math.min(+range, -x + range);
            y++
        ) {
            results.push(
                new PhaserMath.Vector2({ x: center.x + x, y: center.y + y })
            );
        }
    }
    return results;
}
