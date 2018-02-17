var PowerStation = require('../models/powerstation');

exports.find_near_pb = function(req, res, next){

  req.checkBody('longitude', 'Enter a valid longitude!').isLatLong();
  req.checkBody('latitude', 'Enter a valid latitude!').isLatLong();
  req.checkBody('range', 'Enter a valid range! (in meters)').isFloat();
  var validation_errors = req.validationErrors();
  if(validation_errors){ res.send(validation_errors); return; };

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
      if(error){ return next(error); };
      res.json({'result': result});
  });
};

exports.find_near_cp = function(req,res,next){

  req.checkBody('longitude', 'Enter a valid longitude!').isLatLong();
  req.checkBody('latitude', 'Enter a valid latitude!').isLatLong();
  req.checkBody('range', 'Enter a valid range! (in meters)').isFloat();
  var validation_errors = req.validationErrors();
  if(validation_errors){ res.send(validation_errors); return; };

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
      if(error){ return next(error); };
      res.json({'result': result});
  });
};