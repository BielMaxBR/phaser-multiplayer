let lastPlayerId = 0
module.exports = async (io,socket) => {
  console.log('entrou')

  socket.on('newPlayer',async (player)=>{
    console.log('novo player')
    socket.player = player
    const players = await getAllPlayers()
    console.log(players)
    socket.emit('allPlayers', players);
    socket.broadcast.emit('newPlayer',socket.player);
  })
  
  socket.on('updatePos', (pos)=>{
    socket.player.pos = pos
    socket.emit('updatePos', socket.player.id, pos);
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