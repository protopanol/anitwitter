'use strict';

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var config = require('./config');

app.use(serveStatic('public'));

//set views location
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(config.port, function() {
  console.log('App is listening on port ' + config.port + '.');
});