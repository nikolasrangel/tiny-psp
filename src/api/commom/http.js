/**
 * Responsabilidade de retornar uma resposta HTTP.
 * @param {Object} res - Objeto de resposta do Express
 * @param {Number} status - código de status HTTP
 * @param {Object} json - JSON de resposta
 */
const sendResponse = (res, status, json = {}) => res.status(status).json(json)

module.exports = {
  sendResponse,
}
