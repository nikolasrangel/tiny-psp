const express = require('express')
const { cors, bodyParserUrl, bodyParserJSON } = require('../config/express')
const { transaction, balance, general } = require('../config/routes')
const { getEnvVariable } = require('../config/config')

const API_VERSION = getEnvVariable('API_VERSION')
const app = express()

app.use(cors)
app.use(bodyParserUrl())
app.use(bodyParserJSON())

app.use(API_VERSION, transaction)
app.use(API_VERSION, balance)
app.use(API_VERSION, general)

module.exports = app
