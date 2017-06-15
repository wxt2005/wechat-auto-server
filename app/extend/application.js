'use strict';

const Wechat = require('wechat4u');
const WECHAT_BOT = Symbol('Application#wechatBot');
const fse = require('fs-extra');

module.exports = {
  get wechatBot() {
    if (!this[WECHAT_BOT]) {
      const { botInfoFilePath } = this.config;
      const existInfo = fse.readJsonSync(botInfoFilePath, { throws: false });
      let client = null;

      if (existInfo) {
        client = new Wechat(existInfo);
        client.restart();
      } else {
        client = new Wechat();
      }

      client.on('login', () => fse.outputJson(botInfoFilePath, client.botData));
      client.on('logout', () => fse.remove(botInfoFilePath));

      this[WECHAT_BOT] = client;
    }

    return this[WECHAT_BOT];
  },
};
