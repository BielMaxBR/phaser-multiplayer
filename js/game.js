import Game from '/js/scenes/Game.js'

const game = new Phaser.Game({
  type: Phaser.WEBGL,
  width: 600,
  height: 400,
  canvas: document.getElementById('game'),
  scene: [Game]
})

export default game