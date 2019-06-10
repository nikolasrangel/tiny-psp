const {
  NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, OK,
} = require('http-status-codes')

const notFound = () => ({
  status: NOT_FOUND,
  json: {
    errors: {
      message: 'Recurso procurado nao foi encontrado.',
    },
  },
})

const internalServerError = () => ({
  status: INTERNAL_SERVER_ERROR,
  json: {
    errors: {
      message: 'Ocorreu um erro interno no servidor.',
    },
  },
})

const invalidRequest = message => ({
  status: BAD_REQUEST,
  json: {
    errors: {
      message,
    },
  },
})

const invalidCreditCard = () => ({
  status: BAD_REQUEST,
  json: {
    errors: {
      message: 'Cartao de credito invalido',
    },
  },
})

const nonAcceptedCreditCardCompany = () => ({
  status: BAD_REQUEST,
  json: {
    errors: {
      message: 'A bandeira deste cartao ainda nao é aceita',
    },
  },
})

const okRequest = body => ({
  status: OK,
  json: body,
})

module.exports = {
  notFound,
  internalServerError,
  invalidRequest,
  invalidCreditCard,
  nonAcceptedCreditCardCompany,
  okRequest,
}
