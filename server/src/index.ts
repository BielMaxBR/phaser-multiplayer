import geckos, {
    ChannelId,
    Data,
    GeckosServer,
    ServerChannel,
} from "@geckos.io/server";
import Game from "./phaser/game.js";
import { Server, ServerOptions } from "@geckolyseus/server";
new Game();

const config: ServerOptions = {
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

const server = new Server(config);
server.listenAll(4000, 4100);

console.log("Avara quedava");
