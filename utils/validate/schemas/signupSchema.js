const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(5).max(255).required(),
})

module.exports = signupSchema;
