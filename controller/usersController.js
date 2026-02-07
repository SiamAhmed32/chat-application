// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const People = require("../models/people");

async function getUsers(req, res, next) {
  try {
    const users = await People.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

// addUser
const addUser = async (req, res, next) => {
  try {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
      newUser = new People({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      newUser = new People({
        ...req.body,
        password: hashedPassword,
      });
    }

    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
    });
  } catch (err) {
    console.log("CRITICAL ERROR IN ADDUSER:");
    console.log(err); // This prints the full Mongoose error object

    res.status(500).json({
      errors: {
        common: {
          msg: err.message || "Unknown error occured!",
        },
      },
    });
  }
};

// remove user
const removeUser = async (req, res, next) => {
  try {
    const user = await People.findByIdAndDelete({
      _id: req.params.id,
    });

    if (user && user.avatar) {
      unlink(
        path.join(__dirname, "..", "public", "uploads", "avatars", user.avatar),
        (err) => {
          if (err) console.log("File unlink error:", err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    console.log("Error in removeUser:", err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
