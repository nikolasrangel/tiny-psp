const config = require('config')

/**
 * Responsabilidade de obter a variável de ambiente passada como parametro.
 * @param {String} prop - Nome da variável
 */
const getEnvVariable = prop => config.get(prop)

module.exports = {
  getEnvVariable,
}
