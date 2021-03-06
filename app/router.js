'use strict';

module.exports = app => {
  app.get('/start', 'wechat.start');
  app.get('/status', 'wechat.status');
  app.get('/restart', 'wechat.restart');
  app.get('/stop', 'wechat.stop');
  app.get('/contact', 'wechat.getContact');
  app.post('/message', 'wechat.send');
  app.post('/message_file', 'wechat.sendFileThroughLink');
};
