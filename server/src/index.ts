import * as geckolyseus from "@geckolyseus/server";

import Game from "./phaser/game.js";
export const game: Game = new Game();

const config: geckolyseus.ServerOptions = {
    colyseusOptions: { greet: false },
    geckosOptions: {
        cors: { allowAuthorization: true, origin: "*" },
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun2.l.google.com:19302" },
            { urls: "stun:stun4.l.google.com:19302" },
        ],
    },
};

export const server = new geckolyseus.Server(config);
server.listenAll(4000, 4100);

console.log(`Colyseus signaling server is running on port 4000`);
