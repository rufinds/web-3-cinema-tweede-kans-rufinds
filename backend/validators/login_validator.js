const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

module.exports = loginValidator;
