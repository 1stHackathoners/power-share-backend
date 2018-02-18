var User = require('../models/user');
var PowerStation = require('../models/powerstation');

exports.user_info = function(req, res, next) {

  req.checkBody('username', 'Enter an alphanumeric username!').isAlphanumeric();
  var validation_errors = req.validationErrors();
  if(validation_errors){ res.send(validation_errors); return; };

  console.log(req.body.username);
  User.findOne({ username: req.body.username }, function(error, result) {
    
    if(error){ return next(error); };
    if (!result){ res.json({ 'msg': 'No such username!', code: 0 }); return; };
    
    res.json({ "username": result.username, "credit": result.credit, "session": result.session, "password": result.password, "code": 1 });
  });
};

exports.session_controller = function(req, res, next) {

  req.checkBody('username', 'Enter an alphanumeric username!').isAlphanumeric();
  req.checkBody('changedTo', 'changedTo must be a boolean!').isBoolean();
  var validation_errors = req.validationErrors();
  if(validation_errors){ res.send(validation_errors); return; };

  console.log(req.body.username);
  User.findOne({ username: req.body.username }, function(error, result) {
    
    if (error) { return next(error) };
    if (!result){ res.json({ 'msg': 'No such username!', 'code': 0 }); return; };
    
    if (req.body.changedTo) {
      if(result.credit < 5){ res.json({ 'msg': 'session not started: low credit', 'code': 0 }); }
      if(!result.session['isOn']){

        setter = {};
        setter['session.session_start'] = Date.now();
        setter['session.isOn'] = true;
        User.update(
          { username: result.username }, setter, function(err, user) {
            if(err){console.log(err); return next(err);}
            else{

              PowerStation.findOne({ name: req.body.psName }, function(ps_err, ps_res ){
                if(ps_err){console.log(ps_err); return next(ps_err);};
                if (!ps_res){ res.json({ 'msg': 'No such power station!', 'code': 0 }); return; }
                else{

                  setter = {};
                  setter['available_pb_num'] = ps_res['available_pb_num'] - 1;
                  setter['available_cp_num'] = ps_res['available_cp_num'] + 1;
                  PowerStation.update(
                    { name: req.body.psName }, setter, function(psu_err, psu_res){
                      if(psu_err){console.log(psu_err); return next(psu_err);}
                      else{
                        res.json({ 'msg': 'session started', 'code': 1 });
                      }
                    }
                  );

                }
              });
            }
          }
        );
      } else{ res.json({ 'msg': 'user already has a session!', 'code': 0 }); };
    } else{
      if(result.session['isOn']){
        fee = ( Date.now() - result.session.session_start ) * 0.000003;
        setter = {};
        setter['session.session_end'] = Date.now();
        setter['session.isOn'] = false;
        setter['credit'] = result.credit - fee;
        User.update(
          { username: result.username }, setter, function(err, user) {
            if(err){console.log(err); return next(err);}
            else{

              PowerStation.findOne({ name: req.body.psName }, function(ps_err, ps_res ){
                if(ps_err){console.log(ps_err); return next(ps_err);};
                if (!ps_res){ res.json({ 'msg': 'No such power station!', 'code': 0 }); return; }
                else{

                  setter = {};
                  setter['available_pb_num'] = ps_res['available_pb_num'] + 1;
                  setter['available_cp_num'] = ps_res['available_cp_num'] - 1;
                  PowerStation.update(
                    { name: req.body.psName }, setter, function(psu_err, psu_res){
                      if(psu_err){console.log(psu_err); return next(psu_err);}
                      else{
                        res.json({ 'msg': 'session ended', 'fee': fee, 'code': 1 });
                      }
                    }
                  );

                }
              });
            }
          }
        );
      } else { res.json({ 'msg': 'user has no session!', 'code': 0 }); };
    };
  })
};

exports.create_user = function(req, res, next) {

  req.checkBody('username', 'Enter an alphanumeric username!').isAlphanumeric();
  req.checkBody('password', 'Enter an alphanumeric password!').isAlphanumeric();
  var validation_errors = req.validationErrors();
  if(validation_errors){ res.send(validation_errors); return; };

  User.findOne( { username: req.body.username }, function(error, result){
    if(result){ res.json({ 'msg': 'username already taken', 'code': 0 }); return res.end(); }
    else {
      var usr = new User({
        username: req.body.username,
        password: req.body.password,
        credit: 11,
      });

      usr.save(function(err){
        if(err){ return next(err); }
        else{ return res.json({ 'msg': 'user created successfully', 'code': 1 }); }
      });
    }
  });
};