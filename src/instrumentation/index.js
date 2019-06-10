/* eslint-disable global-require */
const { blue, green } = require('../util/chalk')
const { errorHandling } = require('../api/commom/error')

const loadEnvironmentVariables = () => require('./environment')

const initializeRedis = () => require('../database/redis')

const initializePostgres = () => require('../database/postgres')
  .authenticate()

const initialize = async (type) => {
  try {
    blue(`Initializing: ${type}...`)
    loadEnvironmentVariables()
    green('Carregada variaveis do .env 👍')
    await initializeRedis()
    green('Estabelecida conexao com Redis 👌')
    await initializePostgres()
    green('Estabelecida conexao com Postgres 🤙')
  } catch (error) {
    errorHandling(error)
  }
}

module.exports = {
  initialize,
}
