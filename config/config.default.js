'use strict';

const tokens = require('./tokens');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1496153016830_2894';

  // add your config here
  config.security = {
    csrf: {
      enable: false,
    },
  };

  Object.assign(config, tokens);

  return config;
};
