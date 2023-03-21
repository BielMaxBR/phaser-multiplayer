import colyseus from "colyseus"

import Game from "./phaser/game.js";
export const game: Game = new Game();

class Server extends colyseus.Server {
    GlobalGame: Game
    constructor() {
        super()
        this.GlobalGame = game
    }
}
export const server = new Server()

server.listen(4000)