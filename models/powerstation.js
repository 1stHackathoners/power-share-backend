var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PowerStationSchema = new Schema({
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  available_pb_num: { type: Number, default: 0 },   // pb: powerbank, num: number
  available_cp_num: { type: Number, default: 0 }    // cp: charge port, num: number
});

module.exports = mongoose.model('PowerStation', PowerStationSchema);