var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
    minlength: 3
  }
})
