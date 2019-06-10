const escriba = require('escriba')
const log4js = require('log4js')

const log4jsConfig = {
  appenders: [{
    type: 'console',
    layout: {
      type: 'pattern',
      pattern: '%m',
    },
  }],
}
log4js.configure(log4jsConfig)

const escribaConfig = {
  loggerEngine: log4js.getLogger(),
  service: 'tiny psp',
  httpConf: {
    propsToLog: {
      request: [
        'id',
        'method',
        'url',
        'body',
        'httpVersion',
        'referrer',
        'referer',
      ],
      response: [
        'id',
        'method',
        'url',
        'statusCode',
        'body',
        'httpVersion',
        'referrer',
        'referer',
        'latency',
      ],
    },
  },
}

module.exports = escriba(escribaConfig)
