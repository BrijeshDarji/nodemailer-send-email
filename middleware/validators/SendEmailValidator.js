const { body } = require('express-validator')

exports.sendEmailValidator = [
    body("name", "Name is required")
        .trim()
        .notEmpty()
        .bail()
        .isLength({
            min: 5,
            max: 50,
        })
        .withMessage(`Min and max 'name' characters must be 5 and 50 respectively`),

    body("email", "Email is required")
        .trim()
        .notEmpty()
        .bail()
        .matches(/^([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        .withMessage("Email is not valid")
        .bail()
        .isLength({
            min: 10,
            max: 100,
        })
        .withMessage(`Min and max 'email' characters must be 10 and 100 respectively`),

    body("phoneNumber", "Phone Number is required")
        .trim()
        .notEmpty()
        .bail()
        .isLength({
            min: 10,
            max: 20,
        })
        .withMessage(`Min and max 'phoneNumber' characters must be 10 and 20 respectively`),

    body("message", "Message is required")
        .trim()
        .notEmpty()
        .bail()
        .isLength({
            min: 20,
            max: 5000,
        })
        .withMessage(`Min and max 'message' characters must be 20 and 5000 respectively`),
]
