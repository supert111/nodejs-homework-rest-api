const { Schema, SchemaTypes } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    validate: {
      validator: function(v) {
        // eslint-disable-next-line no-useless-escape
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: 'Please enter a valid email'
    },
    required: [true, 'Email is required'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
    // required: 'true',
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = userSchema;
