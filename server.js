let express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server)

server.listen(8081,function(){ // Listens to port 8081
  console.log('Listening on '+server.address().port);
});