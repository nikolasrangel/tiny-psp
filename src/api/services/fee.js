const R = require('ramda')
const commomQueries = require('../repositories/general')

const getFeeValueBasedOnPaymentType = type => commomQueries.findFeeValue(type)

const calculateFeeAmount = (amount, feePercentage) => R.multiply(
  amount,
  feePercentage
)

const getFeeAmount = async (amount, paymentType) => {
  const feePercentage = await getFeeValueBasedOnPaymentType(paymentType)

  const feeAmount = calculateFeeAmount(amount, feePercentage)

  return feeAmount
}

module.exports = {
  getFeeAmount,
}
