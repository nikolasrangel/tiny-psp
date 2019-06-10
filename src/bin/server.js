require('../instrumentation/index').initialize('server')
const server = require('../server/server')
const { green } = require('../util/chalk')
const { getEnvVariable } = require('../config/config')

const PORT = getEnvVariable('PORT')

const initialize = async () => {
  server.listen(PORT, () => green(`Servidor escutando na porta 🚪: ${PORT}`))
}

(() => {
  initialize()
})()
