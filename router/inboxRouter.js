// external imports
const express = require("express");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {getInbox} = require("../controller/inboxController");

// internal imports

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), getInbox);
module.exports = router
