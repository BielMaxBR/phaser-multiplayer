export default  {
  keydown(game, client, event) {

    if(event.keyCode == 83) {
      game.player.x += 10
      client.emit('updatePos',game.player.pos())
    }
  }
}