import { Room, Client } from "colyseus";
import { GameState } from "./schema/GameState";
import { Player } from "./schema/PlayerSchema";

export class GameRoom extends Room<GameState> {
    onCreate(options: any) {
        this.setState(new GameState());
        this.state.mapWidth = 600;
        this.state.mapHeight = 400;
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        const player = new Player();
        player.x = Math.random() * this.state.mapWidth;
        player.y = Math.random() * this.state.mapHeight;

        this.state.players.set(client.sessionId, player);
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
