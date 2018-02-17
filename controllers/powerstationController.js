var PowerStation = require('../models/powerstation');

exports.find_near_ps = function(req, res){
  var lat = req.body.latitude;
  var lon = req.body.longitude;
  var range = req.body.range;

  
};