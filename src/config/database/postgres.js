require('../../instrumentation/environment')
const config = require('config')

const getDatabaseConfigFromEnv = () => ({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
})

const getDatabaseConfig = () => (process.env.NODE_ENV === 'production'
  ? getDatabaseConfigFromEnv()
  : config.get('postgres'))

module.exports = getDatabaseConfig()
