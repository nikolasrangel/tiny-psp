const express = require('express')
const Controller = require('../controllers/general')

const router = express.Router()

router
  .route('*')

  .all(Controller.notFound)

module.exports = router
