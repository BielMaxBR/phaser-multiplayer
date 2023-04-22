import { Tilemaps } from "phaser";
import { GAME_SCENE } from "../../../Utils/constants";
import GameMap from "../map/GameMap";

export class GameScene extends Phaser.Scene {
    map: Tilemaps.Tilemap;
    controls;
    constructor() {
        super({
            key: GAME_SCENE,
        });
    }
    create() {
        console.log("criando tilemap");
        this.map = new GameMap(this);

        // controles de teste pra visão (temporários)
        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.02,
            drag: 0.0005,
            maxSpeed: 0.7
        };
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        
    }
    update(_time: number, delta: number): void {
        // controle de teste temporário
        this.controls.update(delta);
        
        let worldPoint = this.input.activePointer

        if (worldPoint.isDown && worldPoint.getDuration() < 1) {
            const tile = this.map.getTileAtWorldXY(worldPoint.x,worldPoint.y)
            console.log(tile?.x,tile?.y)
        }
    }
}
