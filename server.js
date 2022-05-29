'use strict';

var express = require('express'),
    config = require('./config'),
    cors = require('cors');

var app = express();

app.use(cors());

var port = config.server.port;

app.listen(port);

console.log('Todo list app started on port ' + port);
