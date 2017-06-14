'use strict';

module.exports = app => {
  app.get('/start', 'wechat.start');
  app.get('/status', 'wechat.status');
  app.get('/stop', 'wechat.stop');
  app.get('/contact', 'wechat.getContact');
  app.post('/message', 'wechat.send');
};
