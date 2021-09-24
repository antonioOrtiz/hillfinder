/* eslint-disable no-var */
var mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  maps:  [{
    lat : String,
    lng : String,
    required: true
     }],
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Map', MapSchema);
