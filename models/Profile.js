/* eslint-disable no-var */
import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var Profile;

const profile = new Schema({
  _user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  name: {
    type: String,
    default: ''
  },
  'interested-activities': [],
  'member-since': { type: Date, default: Date.now }
}
)

mongoose.models = {};

Profile = mongoose.model('Profile', profile);



export default Profile;
