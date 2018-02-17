var PowerStation = require('../models/powerstation');

exports.find_near_pb = function(req, res){
  var lat = req.body.latitude;
  var lon = req.body.longitude;
  var range = req.body.range;

  PowerStation.find({ latitude: { $gte: (lat - range), $lte: (lat + range) }, available_pb_num: { $gte: 1 } }, function(error, result) {
    console.log(result);
    res.json({'result': result});
  });
};

exports.find_near_cp = function(req,res) {
  var lat = req.body.latitude;
  var lon = req.body.longitude;
  var range = req.body.range;

  PowerStation.find({ latitude: { $gte: (lat - range), $lte: (lat + range) }, available_cp_num: { $gte: 1 } }, function(error, result) {
    console.log(result);
    res.json({'result': result});
  });
};