exports.login = function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
}

exports.register = function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
}