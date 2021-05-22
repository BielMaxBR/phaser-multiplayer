let express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  socketController = require('./socketController.js')

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(8081,function(){ // Listens to port 8081
  console.log('Listening on '+server.address().port);
});

io.on('connection',socketController)