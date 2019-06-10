const R = require('ramda')
const repository = require('../repositories/transaction')
const schemaTransactionRequest = require('../../schemas/transaction')
const { validateRequestBasedOnSchema, validateCreditCardNumber } = require('../commom/validation')
const bankService = require('./bank')
const payableService = require('./payable')
const { errorHandling } = require('../commom/error')

const ACCEPTED_COMPANIES = ['visa', 'mastercard']

const findAll = async () => {
  let finded = true; let transactions
  try {
    transactions = await repository.findAll()
  } catch (error) {
    [finded, transactions] = [false, []]
    errorHandling(error)
  }

  return { finded, transactions }
}

const creditCardCompanyPath = R.path(['card', 'type'])

const getCreditCardCompany = cardObject => creditCardCompanyPath(cardObject)

const parseCreditCardNumber = transaction => R.evolve(
  { card_number: R.takeLast(4) },
  transaction
)

const renameCreditCardKey = (transaction) => {
  const keyRenamed = R.assoc(
    'card_last_digits',
    R.prop('card_number')(transaction),
    transaction
  )

  const oldKeyRemoved = R.omit(['card_number'])(keyRenamed)

  return oldKeyRemoved
}

const addCreditCardCompany = (transaction, company) => R.assoc(
  'card_brand',
  company,
  transaction
)

const createTransactionObjectToInsert = (transaction, company) => {
  const creditCardParsed = parseCreditCardNumber(transaction)

  const creditCardKeyRenamed = renameCreditCardKey(creditCardParsed)

  const finalObject = addCreditCardCompany(creditCardKeyRenamed, company)

  return finalObject
}

const create = async (transaction, creditCardCompany) => {
  let created = true; let transactionCreated

  try {
    // Autorizacao da transacao junto a companhia do cartao
    await bankService.authorizeTransaction(
      transaction,
      creditCardCompany
    )

    const transactionObject = createTransactionObjectToInsert(
      transaction,
      creditCardCompany
    )

    const payableObject = await payableService
      .createPayableObject(transactionObject)

    // Criacao da transacao e do payable
    transactionCreated = await repository
      .create(transactionObject, payableObject)
  } catch (error) {
    [created, transactionCreated] = [false, {}]
    errorHandling(error)
  }

  return { created, transactionCreated }
}

const getErrorMessage = validation => R.pipe(
  R.path(['error', 'details']),
  R.head(),
  R.prop('message')
)(validation)

const getErrorMessageFromValidation = validation => getErrorMessage(validation)

const isValidRequest = (transaction) => {
  const validation = validateRequestBasedOnSchema(
    transaction,
    schemaTransactionRequest
  )

  const isValid = !validation.error
  const message = isValid ? null : getErrorMessageFromValidation(validation)

  return { isValid, message }
}

const acceptedCompany = company => R.contains(company, ACCEPTED_COMPANIES)

const creditCardValid = (creditCardNumber) => {
  const creditCardValidation = validateCreditCardNumber(creditCardNumber)

  const { isValid } = creditCardValidation

  const creditCardCompany = getCreditCardCompany(creditCardValidation)

  const isAcceptedCompany = acceptedCompany(creditCardCompany)

  return {
    isCredCardValid: isValid,
    isAcceptedCompany,
    company: creditCardCompany,
  }
}

module.exports = {
  findAll,
  create,
  isValidRequest,
  creditCardValid,
}
