const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  amount: Joi.number().min(100).required(),
  description: Joi.string().required(),
  payment_method: Joi.string().valid(['credit_card', 'debit_card']).required(),
  card_number: Joi.string().creditCard().required(),
  card_holder_name: Joi.string().required(),
  card_expiration_date: Joi.string().required(),
  card_cvv: Joi.string().required(),
  api_key: Joi.string().required(),
})

module.exports = schema
