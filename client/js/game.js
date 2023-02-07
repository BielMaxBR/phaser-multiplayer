import Game from "/js/scenes/Game.js";

const game = new Phaser.Game({
    type: Phaser.CANVAS,
    width: 600,
    height: 400,
    canvas: document.getElementById("game"),
    scene: [Game],
    physics: {
        default: "arcade",
    },
    pixelArt: true,
});
window.game = game;
export default game;
