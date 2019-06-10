const bodyParser = require('body-parser')
const cors = require('../middlewares/cors')

const bodyParserUrl = () => bodyParser.urlencoded({ extended: true })

const bodyParserJSON = () => bodyParser.json()

module.exports = {
  bodyParserUrl,
  bodyParserJSON,
  cors,
}
