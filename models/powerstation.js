var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PowerStationSchema = new Schema({
  name: String,
  location: { 
    type: [Number], // lon, lat
    index: '2dsphere'
  },
  available_pb_num: { type: Number, default: 0 },   // pb: powerbank, num: number
  available_cp_num: { type: Number, default: 0 }    // cp: charge port, num: number
});

module.exports = mongoose.model('PowerStation', PowerStationSchema);