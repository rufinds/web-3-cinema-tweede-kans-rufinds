const { body } = require("express-validator");

const registerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("lastName").notEmpty().withMessage("Last name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty.")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 2,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 6 characters long with 2 uppercase, 1 number, and 1 symbol"
    ),
];

module.exports = registerValidator;
