import Game from '/js/scenes/Game.js'

const game = new Phaser.Game({
  type: Phaser.WEBGL,
  width: 16*32,
  height: 600,
  canvas: document.getElementById('game'),
  scene: [Game]
})

export default game