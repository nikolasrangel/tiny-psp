const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  api_key: Joi.string().required(),
})

module.exports = schema
