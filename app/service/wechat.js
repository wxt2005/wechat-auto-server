'use strict';

module.exports = app => {
  class WechatService extends app.Service {
    * start() {
      const { wechatBot } = app;

      wechatBot.start();

      return new Promise(resolve => {
        wechatBot.once('uuid', uuid => {
          resolve(uuid);
        });
      });
    }

    * stop() {
      const { wechatBot } = app;

      wechatBot.stop();

      return new Promise(resolve => {
        wechatBot.once('logout', () => {
          resolve(true);
        });
      });
    }

    * restart() {
      const { wechatBot } = app;

      wechatBot.restart();
    }

    * getContact() {
      return app.wechatBot.contacts;
    }

    * getFilteredGroupIds() {
      const contacts = app.wechatBot.contacts;
      const results = [];

      Object.keys(contacts).forEach(id => {
        const item = contacts[id];

        if (id.startsWith('@@') && item.NickName.endsWith(app.config.wechatGroupSuffix)) {
          results.push(id);
        }
      });

      return results;
    }
  }

  return WechatService;
};
