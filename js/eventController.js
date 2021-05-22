export default function(game, event, args) {
  const data = args[0]
  
  switch(event) {
    case "newPlayer":
      console.log('Nrodado ',data)
      game.addNewPlayer({ id:data.id, x:data.x, y:data.y });
      break;

      case "allPlayers":
      console.log('Arodado ', data)
      for(let player of Object.values(data)){
        game.addNewPlayer({ id:player.id, x:player.x, y:player.y });
      }
      break;

      case "remove":
        game.removePlayer(data);
        break;
  }
}