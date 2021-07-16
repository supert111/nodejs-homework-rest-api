const { Schema } = require('mongoose');

const contactSchema = Schema({
  name: {
    type: String,
    minlength: [2, 'Name must contain at least 2 letters'],
    required: [true, 'Set name for contact'],
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
    required: [true, 'Email required'],
  },
  phone: {
    type: String,
    match: [/^[\d\s\- +()]+$/],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

module.exports = contactSchema;
