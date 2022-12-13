const NodeMediaServer = require("node-media-server");

require("dotenv/config");

const config = {
  rtmp: {
    port: process.env.RTMP || 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: process.env.HTTP || 8000,
    allow_origin: "*",
  },
};

var nms = new NodeMediaServer(config);
nms.run();
