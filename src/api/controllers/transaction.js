const service = require('../services/transaction')
const resolver = require('../resolvers/transaction')
const resolverGeneral = require('../resolvers/general')
const { sendResponse } = require('../commom/http')

const findAll = async (req, res) => {
  const { finded, transactions } = await service.findAll()

  if (!finded) {
    const { status, json } = resolverGeneral.internalServerError()
    return sendResponse(res, status, json)
  }

  const { status, json } = resolver.findAll(transactions)

  return sendResponse(res, status, json)
}

const create = async ({ body }, res) => {
  // eslint-disable-next-line camelcase
  const { card_number } = body

  const { isValid, message } = service.isValidRequest(body)

  if (!isValid) {
    const { status, json } = resolverGeneral.invalidRequest(message)
    return sendResponse(res, status, json)
  }

  const {
    isCredCardValid,
    isAcceptedCompany,
    company,
  } = service.creditCardValid(card_number)

  if (!isCredCardValid) {
    const { status, json } = resolverGeneral.invalidCreditCard()
    return sendResponse(res, status, json)
  } if (!isAcceptedCompany) {
    const {
      status,
      json,
    } = resolverGeneral.nonAcceptedCreditCardCompany(message)
    return sendResponse(res, status, json)
  }

  const { created, transactionCreated } = await service
    .create(body, company)

  if (!created) {
    const { status, json } = resolverGeneral.internalServerError()
    return sendResponse(res, status, json)
  }

  const { status, json } = resolver.created(transactionCreated)
  return sendResponse(res, status, json)
}

module.exports = {
  findAll,
  create,
}
