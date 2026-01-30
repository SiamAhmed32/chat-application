const express  = require('express')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse.js')
const getLogin = require('../controller/loginController.js')
const router = express.Router()

router.get('/', decorateHtmlResponse("login"), getLogin)

module.exports = router