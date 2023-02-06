export default class Game extends Phaser.Scene {
    client = Colyseus.Client;
    room = Colyseus.Room;
    constructor() {
        super("game");
    }

    preload() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.load.image("ovni", "assets/ovni.png");
    }

    async create() {
        await this.connect();

        this.room.state.players.onAdd = (player, sessionId) => {
            const entity = this.physics.add.image(player.x, player.y, "ovni");
        };
    }

    async connect() {
        const connectionStatusText = this.add
            .text(0, 0, "Trying to connect with the server...")
            .setStyle({ color: "#ff0000" })
            .setPadding(4);

        this.client = new Colyseus.Client(
            "wss://2567-bielmaxbr-phasermultipl-9mjk4ralmzn.ws-us85.gitpod.io"
        );

        try {
            this.room = await this.client.joinOrCreate("game", {});

            connectionStatusText.destroy();
        } catch (e) {
            connectionStatusText.text = "Could not connect with the server.";
        }
    }
}
