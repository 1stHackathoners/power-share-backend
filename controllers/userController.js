var User = require('../models/user');

exports.user_info = function(req,res) {
  console.log(req.body.username);
  User.findOne({ username: req.body.username }, function(error, result) {
    if(error)(res.redirect("/"));
    res.json({ "username": result.username, "credit": result.credit, "session": result.session, "password": result.password });
  });
};

exports.session_controller = function(req, res, next) {
  console.log(req.body.username);
  User.findOne({ username: req.body.username }, function(error, result) {
    if (error) { return next(error) };
    if (req.body.changedTo) {
      if(result.credit < 5){ res.json({ 'msg': 'session not started: low credit' }); }
      if(!result.session['isOn']){
        setter = {};
        setter['session.session_start'] = Date.now();
        setter['session.isOn'] = true;
        User.update(
          { username: result.username }, setter, function(err, user) {
            if(err){console.log(err); return next(err);}
            else{
              res.json({ 'msg': 'session started' });
            }
          }
        );
      };
    } else{
      if(result.session['isOn']){
        fee = ( result.session.session_start - Date.now() ) * 0.000003;
        setter = {};
        setter['session.session_end'] = Date.now();
        setter['session.isOn'] = false;
        setter['credit'] = result.credit + fee;
        User.update(
          { username: result.username }, setter, function(err, user) {
            if(err){console.log(err); return next(err);}
            else{
              res.json({ 'msg': 'session ended' });
            }
          }
        );
      };
    };
  })
};

exports.create_user = function(req, res, next) {
  User.findOne( { username: req.body.username }, function(error, result){
    if(result){ res.json({ 'msg': 'username already taken' }); return res.end(); }
    else {
      var usr = new User({
        username: req.body.username,
        password: req.body.password,
        credit: 11,
      });

      usr.save(function(err){
        if(err){ return next(err); }
        else{ return res.json({ 'msg': 'user created successfully' }); }
      });
    }
  });
};