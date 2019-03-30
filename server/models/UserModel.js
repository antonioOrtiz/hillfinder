/* eslint-disable no-var */
var mongoose = require('mongoose');
var emailValidator = require('email-validator');
var bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
      validate: {
        validator: emailValidator.validate,
        message: props => `${props.value} is not a valid email address`
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 8
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function preSave(next) {
  var user = this;
  var hash;
  if (!user.isModified('password')) return next();
  try {
    hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
