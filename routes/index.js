exports.index = function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
}

exports.user = require("./user.js");