export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    init() {
        this.connect();
    }

    async connect() {
        const connectionStatusText = this.add
            .text(0, 0, "Trying to connect with the server...")
            .setStyle({ color: "#ff0000" })
            .setPadding(4);

        const client = new Colyseus.Client(
            "wss://2567-bielmaxbr-phasermultipl-9mjk4ralmzn.ws-us85.gitpod.io"
        );

        try {
            const room = await client.joinOrCreate("game", {});

            connectionStatusText.destroy();
        } catch (e) {
            connectionStatusText.text = "Could not connect with the server.";
        }
    }
}
