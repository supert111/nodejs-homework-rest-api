const Joi = require('joi');

const contactPatchSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().pattern(/^[\d\s\- +()]+$/)
})

module.exports = contactPatchSchema;
