import { Math as PhaserMath, Geom, Scene } from "phaser";
import Chunk from "./Chunk";
import TileManager from "./tileManager";
import {
    centerOf,
    getArea,
    getCurrentChunkPosition,
    tileToWorld,
    worldToTile,
} from "../../../Utils/hexFunctions";

export default class chunkManager {
    tileManager: TileManager;
    scene: Scene;
    chunkRadius = 1;
    loadedChunks: Chunk[] = [];
    visibleChunks: Chunk[] = [];
    calculatedChunks: Chunk[] = [];
    currentCenterChunk: PhaserMath.Vector2;
    calculatedDistance = 4;
    viewedDistance = 0;

    constructor(scene: Scene, tileManager: TileManager) {
        this.tileManager = tileManager;
        this.scene = scene;
    }

    update(view: Geom.Rectangle) {
        // console.log("******")
        const center = new PhaserMath.Vector2({
            x: view.centerX,
            y: view.centerY,
        });
        this.updateCenterChunk(center);

        this.updateCalculatedChunkList();
        this.updateVisibleChunkList();

        this.renderVisibleChunks();
        this.processCalculatedChunks();
    }

    updateCenterChunk(cameraCenterPosition: PhaserMath.Vector2) {
        const cameraChunkPosition = getCurrentChunkPosition(
            cameraCenterPosition,
            this.chunkRadius
        );

        if (
            this.currentCenterChunk == undefined ||
            !this.currentCenterChunk.equals(cameraChunkPosition)
        ) {
            console.log(worldToTile(cameraCenterPosition))
            this.currentCenterChunk = cameraChunkPosition;
        }
    }

    updateCalculatedChunkList() {
        // console.log("calculateds")
        this.unloadChunks(this.calculatedChunks);
        this.calculatedChunks = [];

        for (const chunkPosition of getArea(
            this.currentCenterChunk,
            this.calculatedDistance
        )) {
            if (this.isLoaded(chunkPosition)) {
                // console.log(chunkPosition, "já carregado")
                this.calculatedChunks.push(this.getChunk(chunkPosition));
            } else {
                // console.log(chunkPosition, "não existe, criando agora")
                this.calculatedChunks.push(this.createChunk(chunkPosition));
            }
        }
    }

    updateVisibleChunkList() {
        // console.log("visibles")
        this.hideChunks(this.visibleChunks);
        this.visibleChunks = [];

        for (const chunkPosition of getArea(
            this.currentCenterChunk,
            this.viewedDistance
        )) {
            if (this.isLoaded(chunkPosition)) {
                this.visibleChunks.push(this.getChunk(chunkPosition));
            } else {
                this.visibleChunks.push(this.createChunk(chunkPosition));
            }
        }
    }

    renderVisibleChunks() {
        // Lógica para renderizar os chunks visíveis
        for (const chunk of this.visibleChunks) {
            chunk.show();
        }
    }

    processCalculatedChunks() {
        // Lógica para processar os chunks calculados
        for (const chunk of this.calculatedChunks) {
            chunk.load();
            chunk.update();
        }
    }

    hideChunks(list: Chunk[]) {
        for (const chunk of list) {
            chunk.hide();
        }
    }

    unloadChunks(list: Chunk[]) {
        for (const chunk of list) {
            chunk.unload();
        }
    }

    createChunk(chunkPosition: PhaserMath.Vector2) {
        const centerTilePosition = centerOf(chunkPosition, this.chunkRadius);
        const newChunk = new Chunk(this.scene, tileToWorld(centerTilePosition));

        newChunk.chunkPosition = chunkPosition;
        newChunk.center = this.tileManager.createAndAddTile(centerTilePosition);
        newChunk.setTiles(this.chunkRadius, this.tileManager);
        newChunk.hide()
        newChunk.unload()
        this.addLoaded(newChunk);
        return newChunk;
    }

    getChunk(position: PhaserMath.Vector2) {
        return this.loadedChunks.find((chunk) =>
            chunk.chunkPosition.equals(position)
        );
    }

    isLoaded(position: PhaserMath.Vector2) {
        // console.log(position, "checando")
        return (
            this.loadedChunks.find((chunk) =>
                chunk.chunkPosition?.equals(position)
            ) != undefined
        );
    }

    addLoaded(chunk: Chunk) {
        this.loadedChunks.push(chunk);
    }
}
