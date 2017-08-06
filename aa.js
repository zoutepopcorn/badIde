let Ser = require('./serBadge')
let serCon = new Ser('/dev/ttyUSB0')
const PORT = 8888;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/pub'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log(data.grey);
        client.emit("broad", {"msg" : "hi"})
    });
    client.on('msg', function(data) {
        console.log(data);
    });
});

server.listen(PORT);
