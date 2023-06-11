import { GAME_SCENE } from "../../../Utils/constants";
import ChunkManager from "../map/chunkManager";
import TileManager from "../map/tileManager";

export class GameScene extends Phaser.Scene {
    tileManager: TileManager;
    chunkManager: ChunkManager 
    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    constructor() {
        super({
            key: GAME_SCENE,
        });
    }
    create() {
        console.log("criando tilemap");
        this.tileManager = new TileManager(this);
        this.chunkManager = new ChunkManager(this, this.tileManager);

        // controles de teste pra visão (temporários)
        const cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setZoom(0.2);
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
        this.chunkManager.update(this.cameras.main.worldView);
    }
    update(_time: number, delta: number): void {
        this.chunkManager.update(this.cameras.main.worldView);
        // controle de teste temporário
        this.controls.update(delta);
    }
}
