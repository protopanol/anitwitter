'use strict';

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var config = require('./config');

app.use(serveStatic('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(config.port, function() {
  console.log('App is listening on port ' + config.port + '.');
});