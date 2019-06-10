const {
  OK, INTERNAL_SERVER_ERROR,
} = require('http-status-codes')

const findAll = transactions => ({
  status: transactions ? OK : INTERNAL_SERVER_ERROR,
  json: transactions,
})

const created = transaction => ({
  status: transaction ? OK : INTERNAL_SERVER_ERROR,
  json: transaction,
})

module.exports = {
  findAll,
  created,
}
