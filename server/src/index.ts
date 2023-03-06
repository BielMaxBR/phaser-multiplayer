import geckos, {
    ChannelId,
    Data,
    GeckosServer,
    ServerChannel,
} from "@geckos.io/server";
import Game from "./phaser/game.js";

new Game()

const config = {
    cors: { allowAuthorization: true, origin: "*" },
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
    ],
};
const io: GeckosServer = geckos(config);

io.onConnection((channel: ServerChannel) => {
    console.log("ligado");
    channel.on("message", (data: Data, senderId: ChannelId) => {
        console.log(data);
    });
});

io.listen(9208);
export default io;

console.log("Avara quedava");
