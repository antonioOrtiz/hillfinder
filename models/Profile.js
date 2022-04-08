/* eslint-disable no-var */
import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var Profile;

const profile = new Schema({
  _user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  'displayName': {
    type: String,
    default: ''
  },
  'interestedActivities': ['Ping-pong'],
  'memberSince': { type: Date, default: Date.now },
  'userAvatar': {
    type: String,
    default: 'https://www.fillmurray.com/g/141/100'
  }
}
)

mongoose.models = {};

Profile = mongoose.model('Profile', profile);



export default Profile;
