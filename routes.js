'use strict';

const Userapi = require('./router/user');
const Todoapi = require('./router/todo');

module.exports = function(app){
  app.use('/user', Userapi);

  app.use('/todo', Todoapi);
}

