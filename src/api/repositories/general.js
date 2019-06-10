const orchestrator = require('./orchestrator')

const findFeeValue = paymentType => orchestrator.findFeeValue(paymentType)

module.exports = {
  findFeeValue,
}
