/* eslint-disable no-var */
import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});




export default mongoose.models.Token || mongoose.model('Token', TokenSchema)
