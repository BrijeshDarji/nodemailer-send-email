const { validationResult } = require('express-validator')

module.exports = async (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg)

    if (!errors.isEmpty()) {
        if (errors.array()?.length) {
            return res.status(400).json({
                message: "bad_request",
                data: errors.array(),
            })
        }
    }
    next()
}
