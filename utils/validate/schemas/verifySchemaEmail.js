const Joi = require('joi');

const verifySchemaEmail = Joi.object({ email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() })

module.exports = verifySchemaEmail;
