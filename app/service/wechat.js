'use strict';

module.exports = app => {
  class WechatService extends app.Service {
    * getContact() {
      return app.bot.contacts;
    }

    * getFilteredGroupIds() {
      const contacts = app.bot.contacts;
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
