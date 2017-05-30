'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/contact', 'home.getContact');
  app.post('/message', 'home.send');
};
