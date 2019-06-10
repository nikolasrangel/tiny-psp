const Resolver = require('../resolvers/general')
const { sendResponse } = require('../commom/http')

const notFound = (req, res) => {
  const { status, json } = Resolver.notFound()

  return sendResponse(res, status, json)
}

module.exports = {
  notFound,
}
