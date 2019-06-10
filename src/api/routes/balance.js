const express = require('express')
const Controller = require('../controllers/balance')

const router = express.Router()

router
  .route('/balance')

  // GET /api/v1/balance?api_key= - Obtém saldo para transacoes com a api_key
  .get(Controller.find)

module.exports = router
