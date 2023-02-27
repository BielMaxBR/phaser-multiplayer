import { ClientChannel, geckos } from "@geckos.io/client";

export default class ClientManager {
    channel: ClientChannel;
    constructor(url: string) {
        this.channel = geckos({
            url,
            port: 9208,
            iceServers: [
                // { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
                // { urls: "stun:stun.l.google.com:19302" },
                // { urls: "stun:stun2.l.google.com:19302" },
                // { urls: "stun:stun4.l.google.com:19302" },
            ],
        });
        this.channel.on("connection", (_) => {
            console.log("OK, bro");
        });
        this.channel.onConnect((err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("OK");
            this.channel.emit("message", "opa");
        });
    }
}
