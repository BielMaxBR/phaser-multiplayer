export default function(game, event, args) {
  const data = args[0]
  
  switch(event) {
    case "newPlayer":
      console.log('Nrodado ',data)
      game.addNewPlayer(data);
      break;

    case "updatePos":
      game.updatePlayer(args[0], args[1])
      break;

      case "allPlayers":
      console.log('Arodado ', data)
      for(let player of Object.values(data)){
        if (player.id != game.player.id) game.addNewPlayer(player);
      }
      break;

      case "remove":
        game.removePlayer(data);
        break;
  }
}