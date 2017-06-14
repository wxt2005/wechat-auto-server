'use strict';

const Wechat = require('wechat4u');
const WECHAT_BOT = Symbol('Application#wechatBot');

module.exports = {
  get wechatBot() {
    if (!this[WECHAT_BOT]) {
      this[WECHAT_BOT] = new Wechat();
    }

    return this[WECHAT_BOT];
  },
};
