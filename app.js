'use strict';

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var config = require('./config');
var session = require('cookie-session');
var csrf = require('csurf');
var bodyParser = require('body-parser');

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

app.get('/', function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login', function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/register', function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('session has expired or form tampered with')
})

var server = app.listen(config.port, function() {
  console.log('App is listening on port ' + config.port + '.');
});