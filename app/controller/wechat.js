'use strict';

// const sendToWormhole = require('stream-wormhole');

module.exports = app => {
  class WechatController extends app.Controller {
    * start() {
      const { ctx } = this;
      const uuid = yield ctx.service.wechat.start();

      ctx.body = {
        qrcode: `https://login.weixin.qq.com/qrcode/${uuid}`,
      };
    }

    * status() {
      const { ctx } = this;
      ctx.body = {
        status: app.wechatBot.state,
      };
    }

    * stop() {
      const { ctx } = this;

      const result = yield ctx.service.wechat.stop();

      ctx.body = {
        success: result,
      };
    }

    * send() {
      const { ctx } = this;

      const parts = ctx.multipart();
      let result = {};
      let part;

      const groupIds = yield ctx.service.wechat.getFilteredGroupIds();

      while ((part = yield parts) != null) {
        if (part.length) {
          // 如果是数组的话是 filed
          // const [ field, value ] = part;

          // if (field === 'userName') {
            // userName = value;
          // }
        } else {
          if (!part.filename) {
            return;
          }

          for (const groupId of groupIds) {
            try {
              result = yield app.wechatBot.sendMsg({ file: part, filename: part.filename }, groupId);
            } catch (err) {
              app.logger.error(err);
              // throw err;
            }
          }
        }
      }

      ctx.body = result;
    }

    * getContact() {
      const { ctx } = this;
      ctx.body = yield ctx.service.wechat.getContact();
    }
  }
  return WechatController;
};
