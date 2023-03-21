import {Server as ColyseusServer} from "colyseus"

import Game from "./phaser/game.js";
import { Lobby } from "./rooms/Lobby.js";
export const game: Game = new Game();

class Server extends ColyseusServer {
    GlobalGame: Game
    constructor() {
        super()
        this.GlobalGame = game

        this.define("lobby", Lobby)
    }
}
export const server = new Server()

server.listen(4000)