var PowerStation = require('../models/powerstation');

exports.find_near_pb = function(req, res){
  var lat = req.body.latitude;
  console.log(lat);
  var lon = req.body.longitude;
  console.log(lon);
  var range = req.body.range;
  console.log(range);

  PowerStation.find(
    {
      location:{
        $near: {
          $geometry: { type:'Point', coordinates: [ lon, lat ] },
          $maxDistance: range
        }
      },
      available_pb_num:{ $gte: 1 }
    },
    function(error, result) {
      console.log(error);
      console.log(result);
      res.json({'result': result});
  });
};

exports.find_near_cp = function(req,res) {
  var lat = req.body.latitude;
  console.log(lat);
  var lon = req.body.longitude;
  console.log(lon);
  var range = req.body.range;
  console.log(range);

  PowerStation.find(
    {
      location:{
        $near: {
          $geometry: { type:'Point', coordinates: [ lon, lat ] },
          $maxDistance: range
        }
      },
      available_cp_num: { $gte: 1 }
    },
    function(error, result) {
      console.log(error);
      console.log(result);
      res.json({'result': result});
  });
};