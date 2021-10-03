/* eslint-disable no-var */
import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var Token;

var token = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
  },
  token: { type: String, required: true },
}, {
  timestamps: true,
}
);

mongoose.models = {};

Token = mongoose.model('Token', token);

export default Token;

