var mongoose = require('mongoose');

/* Image Schema for storing images in the mongodb database */

var UserImageCollectionSchema = new mongoose.Schema({
  avatar: {
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    imageName: { type: String, default: 'none', required: true },
    imageData: {
      data: Buffer,
      contentType: String
    }
  }
});

module.exports = mongoose.model('UserImageCollection', UserImageCollectionSchema);
