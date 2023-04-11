import { Client, Presence, Room } from "colyseus";
import { game } from "../phaser/game";
import { LobbyState } from "./states/LobbyState";
import { BaseScene } from "../phaser/BaseScene";

export class Lobby extends Room<LobbyState> {
    constructor(presence?: Presence | undefined) {
        super(presence);
    }
    onCreate(options: any) {
        const scene = game.scene.add("lobby", BaseScene);
        this.setState(new LobbyState(scene));

        this.onMessage(0, (client, input) => {});
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
