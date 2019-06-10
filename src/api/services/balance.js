const R = require('ramda')
const repository = require('../repositories/balance')
const schemaBalanceRequest = require('../../schemas/balance')
const { validateRequestBasedOnSchema } = require('../commom/validation')
const { errorHandling } = require('../commom/error')

const getErrorMessage = validation => R.pipe(
  R.path(['error', 'details']),
  R.head(),
  R.prop('message')
)(validation)

const getErrorMessageFromValidation = validation => getErrorMessage(validation)

const isValidRequest = (queryString) => {
  const validation = validateRequestBasedOnSchema(
    queryString,
    schemaBalanceRequest
  )

  const isValid = !validation.error
  const message = isValid ? null : getErrorMessageFromValidation(validation)

  return { isValid, message }
}

const getStatus = obj => R.prop('status')(obj)

const isPaid = obj => getStatus(obj) === 'paid'

const isWaitingFunds = obj => getStatus(obj) === 'waiting_funds'

const filterObject = (filter, obj) => R.filter(filter)(obj)

const calculateAmountToPay = (obj) => {
  const amount = R.path(['transaction', 'amount'])(obj)
  const fee = R.prop('fee')(obj)
  return R.subtract(amount, fee)
}

const getPayAmount = arrayOfPayables => R.pipe(
  R.map(calculateAmountToPay),
  R.reduce(R.add, 0)
)(arrayOfPayables)

const createPayAmountObject = (arrayOfPayables) => {
  const amount = getPayAmount(arrayOfPayables)

  return {
    amount,
  }
}

/**
 * Valor pagavel/pago de cada transacao é a subtracao do valor (amount) menos
 * a taxa (fee).
 * @param {Object} payablesAndTransactions
 */
const calculateBalance = (payablesAndTransactions) => {
  const paidObjects = filterObject(isPaid, payablesAndTransactions)
  const waitingFundsObjects = filterObject(
    isWaitingFunds,
    payablesAndTransactions
  )

  return {
    object: 'balance',
    available: createPayAmountObject(paidObjects),
    waiting_funds: createPayAmountObject(waitingFundsObjects),
  }
}

const getBalance = async (query) => {
  let success = true; let balance

  try {
    const payablesAndTransactions = await repository
      .getPayablesAndItsTransactions(query)

    balance = calculateBalance(payablesAndTransactions)
  } catch (error) {
    [success, balance] = [false, {}]
    errorHandling(error)
  }

  return { success, balance }
}

module.exports = {
  isValidRequest,
  getBalance,
}
