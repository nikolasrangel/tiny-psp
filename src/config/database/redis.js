require('../../instrumentation/environment')
const config = require('config')

const getRedisConfig = () => (process.env.NODE_ENV === 'production'
  ? process.env.REDIS_URL
  : config.get('redis'))

module.exports = getRedisConfig()
