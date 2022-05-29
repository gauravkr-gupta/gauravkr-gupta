'use strict';

var express = require('express'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    cors = require('cors');

require('./db');

var app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json())

var normalizedPath = require("path").join(__dirname, "./model");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./model/" + file);
});

require('./routes')(app);

var port = config.server.port;

app.listen(port);

console.log('Todo list app started on port ' + port);
