const service = require('../services/balance')
const resolverGeneral = require('../resolvers/general')
const { sendResponse } = require('../commom/http')

const find = async ({ query }, res) => {
  const { isValid, message } = service.isValidRequest(query)

  if (!isValid) {
    const { status, json } = resolverGeneral.invalidRequest(message)
    return sendResponse(res, status, json)
  }

  const { success, balance } = await service.getBalance(query)

  if (!success) {
    const { status, json } = resolverGeneral.internalServerError()
    return sendResponse(res, status, json)
  }

  const { status, json } = resolverGeneral.okRequest(balance)
  return sendResponse(res, status, json)
}

module.exports = {
  find,
}
