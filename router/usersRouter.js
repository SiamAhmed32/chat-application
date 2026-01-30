// external imports
const express = require("express");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const getUsers = require('../controller/usersController')

// internal imports

const router = express.Router()

router.get('/', decorateHtmlResponse('Users'), getUsers)