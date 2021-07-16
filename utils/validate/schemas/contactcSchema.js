const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().pattern(/^[\d\s\- +()]+$/)
})

module.exports = contactsSchema;
