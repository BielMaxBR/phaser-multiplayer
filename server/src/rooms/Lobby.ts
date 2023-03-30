import {Client, Room} from "colyseus"
import { LobbyState } from "./states/LobbyState.js";
import { game } from "../index.js";
import { BaseScene } from "../phaser/BaseScene.js";


export class Lobby extends Room<LobbyState>  {
    onCreate() {
        const scene = game.scene.add("lobby", BaseScene)
        this.setState(new LobbyState(scene));
    }
    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        console.log("entrou!!")
    }
}