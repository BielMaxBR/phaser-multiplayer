import { Room, Client } from "colyseus";
import { GameState } from "./schema/GameState";
import { Player } from "./schema/PlayerSchema";
import { InputData } from "./schema/InputDataInterface";

export class GameRoom extends Room<GameState> {
    fixedTimeStep = 1000 / 60;
    test = "";
    onCreate(options: any) {
        this.setState(new GameState());

        this.state.mapWidth = 600;
        this.state.mapHeight = 400;

        this.onMessage(0, (client, input) => {
            // handle player input
            const player = this.state.players.get(client.sessionId);
            // enqueue input to user input buffer.
            player.inputQueue.push(input);
        });

        let elapsedTime = 0;
        this.setSimulationInterval((deltaTime) => {
            elapsedTime += deltaTime;

            while (elapsedTime >= this.fixedTimeStep) {
                elapsedTime -= this.fixedTimeStep;
                this.fixedTick(this.fixedTimeStep);
            }
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        const player = new Player();
        player.x = Math.random() * this.state.mapWidth;
        player.y = Math.random() * this.state.mapHeight;
        player.sessionId = client.sessionId;

        this.state.players.set(client.sessionId, player);
        this.state.clients.set(client.sessionId, client);
        this.test = client.sessionId;
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    fixedTick(timeStep: number) {
        const velocity = 2;

        this.state.players.forEach((player: Player) => {
            let input: InputData;
            // dequeue player inputs
            input = player.inputQueue.shift();
            if (!input) return
            if (input.left) {
                player.x -= velocity;
            } else if (input.right) {
                player.x += velocity;
            }
            
            if (input.up) {
                player.y -= velocity;
            } else if (input.down) {
                player.y += velocity;
            }

            player.tick = input.tick;

            this.broadcast("moved", {
                player: player,
                sessionId: player.sessionId,
            });

            player.inputQueue = []
        });
    }
}
