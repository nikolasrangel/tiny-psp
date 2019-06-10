const Sequelize = require('sequelize')
const Transaction = require('./transaction')
const connection = require('../postgres')

const Payable = connection.define('payable', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  status: {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: 'processing',
  },
  transaction_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'transactions',
      key: 'id',
    },
  },
  fee: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  payment_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE,
  },
})

Payable.belongsTo(Transaction, { foreignKey: 'transaction_id', onDelete: 'CASCADE' })

module.exports = Payable
