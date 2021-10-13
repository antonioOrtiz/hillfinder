import mongoose from 'mongoose';
import emailValidator from 'email-validator'
import bcrypt from 'bcrypt'

import crypto from 'crypto'

const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
      validate: {
        validator: emailValidator.validate,
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 7,
      maxlength: 11
    },
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    passwordResetToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function preSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto
    .randomBytes(20)
    .toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};



export default mongoose.models.User || mongoose.model('User', UserSchema)
