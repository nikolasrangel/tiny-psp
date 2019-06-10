const R = require('ramda')
const Model = require('../../database/models/transaction')
const Payable = require('../../database/models/payable')
const connection = require('../../database/postgres')

const insertTransactionIdIntoPayable = (payable, id) => R.assoc(
  'transaction_id',
  id,
  payable
)

const findAll = () => Model.findAll()

const create = async (transactionObject, payableObject) => {
  const transactionCreated = await connection
    .transaction(async (sequelizeTransaction) => {
      const created = await Model
        .create(transactionObject, { transaction: sequelizeTransaction })

      const payableWithTransactionId = insertTransactionIdIntoPayable(
        payableObject,
        R.prop('id')(created)
      )

      await Payable
        .create(payableWithTransactionId, { transaction: sequelizeTransaction })

      return created
    })

  return transactionCreated
}

module.exports = {
  findAll,
  create,
}
