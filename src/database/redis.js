const redis = require('redis')
const { promisify } = require('util')
const config = require('../config/database/redis')

// eslint-disable-next-line no-var
var client = redis.createClient(config)

module.exports = {
  ...client,
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  keys: promisify(client.keys).bind(client),
}
