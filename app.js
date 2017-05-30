'use strict';

const Wechat = require('wechat4u');

module.exports = app => {
  app.beforeStart(function* () {
    const bot = new Wechat();
    bot.start();

    bot.on('uuid', uuid => {
      console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid);
    });

    bot.on('login', () => {
      console.log('logged in');
    });

    app.bot = bot;
  });
};
