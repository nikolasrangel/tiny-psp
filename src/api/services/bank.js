const mastercardService = require('./credit-card-networks/mastercard')
const visaService = require('./credit-card-networks/visa')

const authorizeMasterCardTransaction = (transactionBody) => {
  const success = mastercardService.authorize(transactionBody)
  return { success }
}

const authorizeVisaTransaction = (transactionBody) => {
  const success = visaService.authorize(transactionBody)
  return { success }
}

const authorizeTransaction = (transactionBody, creditCardCompany) => {
  switch (creditCardCompany) {
    case 'mastercard':
      return authorizeMasterCardTransaction(transactionBody)
    case 'visa':
      return authorizeVisaTransaction(transactionBody)
    default:
      return false
  }
}

module.exports = {
  authorizeTransaction,
}
