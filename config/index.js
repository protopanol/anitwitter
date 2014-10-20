'use strict';

var environment = process.env.NODE_ENV;

if(environment == 'production'){
  module.exports = require("./production.js");
} else if (environment == 'testing') {
  module.exports = require("./testing.js");
}else {
  module.exports = require("./development.js");
}