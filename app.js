const { NodeMediaServer } = require('node-media-server');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const process = require('process')
const port = process.env.PORT||5000
const port2 = process.env.PORT||8000
const port3 = process.env.PORT||8001


const server = http.createServer(app);
const io = require('socket.io').listen(server);
require('./app/controllers/socketIO')(io);

global.appRoot = path.resolve(__dirname);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.set('socketio', io);
app.set('server', server);
app.use(express.static(`${__dirname}/public`));

server.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port ${port}`);
  }
});

const nodeMediaServerConfig = {
  rtmp: {
    port: port2,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: port3,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(nodeMediaServerConfig);
nms.run();
