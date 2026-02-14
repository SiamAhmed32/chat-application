const express = require("express");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const { getLogin, login } = require("../controller/loginController.js");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators.js");
const router = express.Router();

router.get("/", decorateHtmlResponse("login"), getLogin);
router.post("/", doLoginValidators, doLoginValidationHandler, login);

module.exports = router;
