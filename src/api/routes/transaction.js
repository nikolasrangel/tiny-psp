const express = require('express')
const Controller = require('../controllers/transaction')

const router = express.Router()

router
  .route('/transaction')
  // POST /api/v1/transaction - Processa uma transacao
  .post(Controller.create)

router
  .route('/transactions')
  // GET /api/v1/transactions - Obtém todas transacoes
  .get(Controller.findAll)

module.exports = router
