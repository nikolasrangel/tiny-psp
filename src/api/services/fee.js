const R = require('ramda')
const commomQueries = require('../repositories/general')

const getFeeValueBasedOnPaymentType = type => commomQueries.findFeeValue(type)

const calculateFeeAmount = (amount, feePercentage) => {
  const feeAmount = R.multiply(amount, feePercentage)

  return parseInt(feeAmount, 10)
}

const getFeeAmount = async (amount, paymentType) => {
  const feePercentage = await getFeeValueBasedOnPaymentType(paymentType)

  const feeAmount = calculateFeeAmount(amount, feePercentage)

  return feeAmount
}

module.exports = {
  getFeeAmount,
}
