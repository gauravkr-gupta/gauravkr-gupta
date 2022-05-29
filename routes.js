'use strict';

const Userapi = require('./router/user');

module.exports = function(app){
  app.use('/user', Userapi);
}

