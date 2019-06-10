const Joi = require('@hapi/joi')
const creditCardValidator = require('card-validator')

const validateRequestBasedOnSchema = (obj, schema) => Joi.validate(obj, schema)

const validateCreditCardNumber = number => (creditCardValidator.number(number))

module.exports = {
  validateRequestBasedOnSchema,
  validateCreditCardNumber,
}
