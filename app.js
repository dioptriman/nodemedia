const NodeMediaServer = require("node-media-server");

require("dotenv/config");


const config = {
  logType: 3,
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
  trans: {
    ffmpeg: '/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        hlsKeep: true, // to prevent hls file delete after end the stream
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        dashKeep: true // to prevent dash file delete after end the stream
      }
    ]
  }
};

var nms = new NodeMediaServer(config);
nms.run();


console.log(`Server running at ${process.env.HTTP} and ${process.env.RTMP}`);
