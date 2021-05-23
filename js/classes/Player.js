export default class Player extends Phaser.GameObjects.GameObject {
  constructor(game, id, pos) {
    super(game, id)
    this.pos = pos
    this.sprite = game.add.sprite('sprite')
  }
}