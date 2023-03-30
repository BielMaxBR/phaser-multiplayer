import http from "http";
import express from "express";
import cors from "cors";
import { Server as ColyseusServer } from "colyseus"

import Game from "./phaser/game.js";
import { Lobby } from "./rooms/Lobby.js";
import { WebSocketTransport } from "@colyseus/ws-transport";
export const game: Game = new Game();

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

class Server extends ColyseusServer {
    GlobalGame: Game
    constructor() {
        super({ server: httpServer })
        // super({ transport: new WebSocketTransport({ server: httpServer }) })
        this.GlobalGame = game

        this.define("lobby", Lobby)
    }
}
export const server = new Server()

server.listen(8922)