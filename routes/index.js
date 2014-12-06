exports.index = function (req, res) {
  if(req.user){

  } else {
    res.render('landing', { csrfToken: req.csrfToken() });
  }
}

exports.user = require("./user.js");