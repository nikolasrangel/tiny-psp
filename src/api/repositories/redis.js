const redis = require('../../database/redis')

const get = key => redis.get(key)

const set = (key, value) => redis.set(key, value)

module.exports = {
  set,
  get,
}
