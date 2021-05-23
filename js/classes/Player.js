export default class Player extends Phaser.GameObjects. Sprite {
  constructor(game, id, pos) {
    super(game, pos.x, pos.y, "sprite")
    game.add.existing(this)
    this.id = id
  }

  raw() {
    return {
      id:this.id,
      pos:this.pos()
    }
  }

  pos() {
    return {x:this.x,y:this.y}
  }
}