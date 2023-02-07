export default class Game extends Phaser.Scene {
    client = Colyseus.Client;

    room = Colyseus.Room;

    currentPlayer;
    playerEntities = {};

    inputPayload = {
        left: false,
        right: false,
        up: false,
        down: false,
        tick: undefined,
    };

    cursorKeys = {};

    elapsedTime = 0;
    fixedTimeStep = 1000 / 60;

    currentTick = 0;

    connected = false;
    constructor() {
        super("game");
    }

    preload() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.load.image("ovni", "assets/ovni.png");
    }

    create() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    async connect(url) {
        if (!url) return
        const connectionStatusText = this.add
            .text(0, 0, "Trying to connect with the server...")
            .setStyle({ color: "#ff0000" })
            .setPadding(4);

        this.client = new Colyseus.Client(url);

        try {
            this.room = await this.client.joinOrCreate("game", {});
            this.connected = true;

            this.room.state.players.onAdd = (player, sessionId) => {
                const entity = this.physics.add.image(
                    player.x,
                    player.y,
                    "ovni"
                );
                this.playerEntities[sessionId] = entity;

                if (sessionId === this.room.sessionId) {
                    this.currentPlayer = entity;
                } else {
                    entity.setData("serverX", player.x);
                    entity.setData("serverY", player.y);
                }
            };

            this.room.state.players.onRemove = (player, sessionId) => {
                const entity = this.playerEntities[sessionId];
                if (entity) {
                    entity.destroy();
                    delete this.playerEntities[sessionId];
                }
            };

            this.room.onMessage("moved", ({ player, sessionId }) => {
                const entity = this.playerEntities[sessionId];
                if (sessionId === this.room.sessionId) {
                    entity.x = player.x
                    entity.y = player.y
                    return
                }
                entity.setData("serverX", player.x);
                entity.setData("serverY", player.y);
            });
            connectionStatusText.destroy();
        } catch (e) {
            connectionStatusText.text = "Could not connect with the server.";
        }
    }

    update(time, delta) {
        // skip loop if not connected yet.
        if (!this.currentPlayer && !this.connected) {
            return;
        }

        this.elapsedTime += delta;
        while (this.elapsedTime >= this.fixedTimeStep) {
            this.elapsedTime -= this.fixedTimeStep;
            this.fixedTick(time, this.fixedTimeStep);
        }
    }
    fixedTick(time, delta) {
        this.currentTick++;

        const velocity = 2;
        this.inputPayload.left = this.cursorKeys.left.isDown;
        this.inputPayload.right = this.cursorKeys.right.isDown;
        this.inputPayload.up = this.cursorKeys.up.isDown;
        this.inputPayload.down = this.cursorKeys.down.isDown;
        this.inputPayload.tick = this.currentTick;
        this.room.send(0, this.inputPayload);

        if (this.inputPayload.left) {
            this.currentPlayer.x -= velocity;
        } else if (this.inputPayload.right) {
            this.currentPlayer.x += velocity;
        }

        if (this.inputPayload.up) {
            this.currentPlayer.y -= velocity;
        } else if (this.inputPayload.down) {
            this.currentPlayer.y += velocity;
        }

        for (let sessionId in this.playerEntities) {
            if (sessionId === this.room.sessionId) {
                continue;
            }

            const entity = this.playerEntities[sessionId];
            const { serverX, serverY } = entity.data.list;

            entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
            entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
        }
    }
}
