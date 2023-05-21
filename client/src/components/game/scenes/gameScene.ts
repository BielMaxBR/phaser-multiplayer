import { GAME_SCENE, HEXSIZE } from "../../../Utils/constants";
import GameMap from "../map/GameMap";

export class GameScene extends Phaser.Scene {
    map: GameMap;
    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
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
        // this.cameras.main.setZoom(0.6);
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.02,
            drag: 0.0005,
            maxSpeed: 0.7,
        };
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
            controlConfig
        );
    }
    update(_time: number, delta: number): void {
        // controle de teste temporário
        this.controls.update(delta);
        this.map?.generateChunks(this.cameras.main.worldView);
        const worldPoint = this.input.activePointer;

        if (worldPoint.isDown && worldPoint.getDuration() < 1) {
            const vect = this.map.getCurrentChunk({
                x: worldPoint.worldX,
                y: worldPoint.worldY - HEXSIZE / 4,
            });
            
            console.log("tile", vect?.x, vect?.y);
        }
    }
}
