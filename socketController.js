let lastPlayerId = 0
module.exports = async (io,socket) => {
  console.log('entrou')

  socket.on('newPlayer',async ()=>{
    console.log('novo player')
    socket.player = {
      id: lastPlayerId++,
      x: 300,
      y: 200
    }
    const players = await getAllPlayers()
    console.log(players)
    socket.emit('allPlayers', players);
    socket.broadcast.emit('newPlayer',socket.player);
  })
  
  socket.on('disconnect',()=>{
    if (socket.player) {
      console.log(players)
      io.emit('remove',socket.player.id);
    }
  });

  async function getAllPlayers(){
    var players = {};
    let sockets = await io.fetchSockets()
    sockets.forEach((socket)=>{
      var player = socket.player;
      if(player) players[player.id] = player
    });
    return players;
}
}