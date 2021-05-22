export default function(game, event, args) {
  
  switch(event) {
    case "newplayer":
      console.log(args[0])
      break;
  }
}