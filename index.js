'use strict';

// npm run dev DO NOT read this file

require('egg').startCluster({
  baseDir: __dirname,
  worker: 2,
  port: process.env.PORT || 7001, // default to 7001
});
