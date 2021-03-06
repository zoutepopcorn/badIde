let Ser = require('./serBadge')
//  woezel.install('appname')
const PORT = 8888;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const colors = require('colors');
let cl;

let onData = (dat) => {
    if(dat.type == "type") {
      console.log("hiiiii");
      console.log(dat.data);
    }
    if(cl) {
      console.log(`${dat.type} ${dat.data}`.red);
      cl.emit(dat.type, { data: dat.data});
    }
}
let ser = new Ser('/dev/ttyUSB0', onData)

app.use(express.static(__dirname + '/pub'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');
    ser.write(`print("I am connected :|")`);
    cl = client;
    client.on('join', function(data) {
        console.log(data.grey);
        client.emit("broad", {"msg" : "hi"})
    });
    client.on('msg', function(data) {
      data.data.split("\n").forEach((val) => { ser.write(val) })
    });
    client.on('code', function(data) {
      console.log("code");
      ser.write(data.data)
    });

});

server.listen(PORT);
