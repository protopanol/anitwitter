'use strict';

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var config = require('./config');
var session = require('cookie-session');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var routes = require('./routes');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/' + config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

app.use(serveStatic('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(session({
  keys: config.session.keys,
}))
app.use(csrf());

//set views location
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', routes.index);
app.post('/login', routes.user.login);
app.post('/register', routes.user.register);

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('session has expired or form tampered with')
})

var server = app.listen(config.port, function() {
  console.log('App is listening on port ' + config.port + '.');
});