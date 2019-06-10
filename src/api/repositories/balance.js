const Transaction = require('../../database/models/transaction')
const Payable = require('../../database/models/payable')

/**
 * @param {*} query
 */
const getPayablesAndItsTransactions = query => Payable.findAll({
  include: [{
    model: Transaction,
    where: query,
  }],
})

module.exports = {
  getPayablesAndItsTransactions,
}
