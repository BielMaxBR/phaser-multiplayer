import { ClientChannel, geckos } from "@geckos.io/client";
import { Plugins } from "phaser";

export default class ClientManager extends Plugins.ScenePlugin {
  channel: ClientChannel;
  constructor(scene: Phaser.Scene, pluginManager: Plugins.PluginManager, pluginKey: string) {
    super(scene, pluginManager, pluginKey);

    this.channel = geckos({
      url: process.env.REACT_ENV_SERVER_URL,
      port: 9208,
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
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
  onReady() {}
}
