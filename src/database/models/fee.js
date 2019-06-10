const Sequelize = require('sequelize')
const connection = require('../../database/postgres')

const Fee = connection.define('fee', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  fee_value: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  payment_method: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
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

module.exports = Fee
