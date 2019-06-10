const postgres = require('./postgres')
const redis = require('./redis')

const findFeeValue = async (paymentType) => {
  let feeFromDatabase

  const feeFromCache = await redis.get(paymentType)

  if (!feeFromCache) {
    feeFromDatabase = await postgres.findFeeValue(paymentType)
    redis.set(paymentType, feeFromDatabase)
  }

  return feeFromCache || feeFromDatabase
}

module.exports = {
  findFeeValue,
}
