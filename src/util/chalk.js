const chalk = require('chalk')

const { log } = console

/**
 * Responsabilidade de printar o texto de parametro em azul negrito.
 * @param {String} text
 */
const blue = text => log(chalk.blue.bold(text))

/**
 * Responsabilidade de printar o texto de parametro em verde negrito.
 * @param {String} text
 */
const green = text => log(chalk.green.bold(text))

/**
 * Responsabilidade de printar o texto de parametro em vermelho negrito.
 * @param {String} text
 */
const red = text => log(chalk.red.bold(text))

module.exports = {
  blue,
  green,
  red,
}
