var User = require('../models/user');

exports.user_info = function(req,res) {
  User.findOne({ username: req.params.username }, function(error, result) {
    if(error)(res.redirect("/"));
    res.json({ "username": result.username, "credit": result.credit, "session": result.session, "password": result.password });
  });
};

exports.session_controller = function(req, res, next) {
  User.findOne({ username: req.body.username }, function(error, result) {
    if (error) { return next(error) };
    if (req.body.changedTo ) {};
  })
};