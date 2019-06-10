const Sequelize = require('sequelize')
const configs = require('../config/database/postgres')

const connection = new Sequelize(configs)

module.exports = connection
