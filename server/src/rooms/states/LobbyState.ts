import { Schema, type } from "@colyseus/schema";
import Phaser, { Scene } from "phaser";

export class LobbyState extends Schema {
    scene: Scene;
    constructor(scene: Scene) {
        super()
        this.scene = scene
    }
}