const { red } = require('../../util/chalk')

const errorHandling = (errorObject) => {
  const { message } = errorObject
  red(message)
}

module.exports = {
  errorHandling,
}
