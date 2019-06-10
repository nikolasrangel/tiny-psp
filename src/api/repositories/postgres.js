const R = require('ramda')
const FeeModel = require('../../database/models/fee')

const getFeeValue = feeObject => R.pipe(R.path(['dataValues', 'fee_value']))(feeObject)

// eslint-disable-next-line camelcase
const findFeeValue = async (payment_method) => {
  const fee = await FeeModel.findOne({
    where: { payment_method },
    attributes: ['fee_value'],
  })

  return fee
    ? getFeeValue(fee)
    : null
}

module.exports = {
  findFeeValue,
}
