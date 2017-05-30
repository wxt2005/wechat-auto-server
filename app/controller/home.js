'use strict';

const sendToWormhole = require('stream-wormhole');

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = 'hi, egg';
    }

    * send() {
      const { ctx } = this;

      const parts = ctx.multipart();
      let result = {};
      let part;
      let userName = '';

      while ((part = yield parts) != null) {
        if (part.length) {
          // 如果是数组的话是 filed
          const [ field, value ] = part;

          if (field === 'userName') {
            userName = value;
          }
        } else {
          if (!part.filename) {
            return;
          }

          try {
            result = yield app.bot.sendMsg({ file: part, filename: part.filename }, userName);
          } catch (err) {
            throw err;
          }
        }
      }

      ctx.body = result;
    }

    * getContact() {
      const { ctx } = this;
      ctx.body = app.bot.contacts;
    }
  }
  return HomeController;
};
