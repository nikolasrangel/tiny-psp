const R = require('ramda')

const selectNecessaryFields = transaction => R.pick(['card_number',
  'card_holder_name',
  'card_expiration_date',
  'card_cvv'])(transaction)

const insertOneDollarValue = transaction => R.assoc('value', 123, transaction)

// eslint-disable-next-line no-unused-vars, arrow-body-style
const sendAuthorizeRequest = (data) => {
  return new Promise(resolve => setTimeout(resolve(true), 1000))
}

const authorize = async (transaction) => {
  const cardToAuthorize = selectNecessaryFields(transaction)

  const cardToAuthorizeWithOneDollar = insertOneDollarValue(cardToAuthorize)

  const authorized = await sendAuthorizeRequest(cardToAuthorizeWithOneDollar)

  return { authorized }
}

module.exports = {
  authorize,
}
