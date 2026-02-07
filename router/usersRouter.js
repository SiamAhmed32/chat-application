// external imports
const express = require("express");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const { getUsers, addUser, removeUser } = require("../controller/usersController.js");

// internal imports
const avatarUpload = require("../middlewares/users/avatarUpload.js");
const {
  addUserValidators,
  addUservalidationHandler,
} = require("../middlewares/users/userValidators.js");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);

router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUservalidationHandler,
  addUser,
);

router.delete("/:id", removeUser);

module.exports = router;
