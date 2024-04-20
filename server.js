require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")
const port = process.env.PORT || 8000
const app = express()

// Middleware for parsing request bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors()) // TODO: Need to configure options heres

const ValidationMiddleware = require("./middleware/ValidationMiddleware")
const { sendEmailValidator } = require("./middleware/validators/SendEmailValidator")

const {
    TRANSPORTER_SERVICE,
    TRANSPORTER_USER_AUTH,
    TRANSPORTER_USER_PASSWORD,

    FROM_EMAIL,
    TO_EMAIL,
    SUBJECT,
    HEADLINE,
} = process.env

// Api routes
app.get("/", (req, res) => {
    res.send(`<h1> You've got something! </h1>`)
})

app.post(
    "/inquire",
    sendEmailValidator,
    ValidationMiddleware,
    async (req, res) => {
        try {
            const {
                name,
                email,
                phoneNumber,
                message,
            } = req.body

            const transporter = nodemailer.createTransport({
                service: TRANSPORTER_SERVICE,
                auth: {
                    user: TRANSPORTER_USER_AUTH,
                    pass: TRANSPORTER_USER_PASSWORD,
                },
            })

            const info = await transporter.sendMail({
                from: FROM_EMAIL, // sender address
                to: TO_EMAIL, // list of receivers
                subject: `${SUBJECT} ${name}`, // Subject line
                html: `
                    ${HEADLINE} <b>${name}</b>.
                    <br/><br/>

                    <b> Name: </b> ${name}
                    <br/><br/>

                    <b> Email: </b> ${email}
                    <br/><br/>

                    <b> Phone Number: </b> ${phoneNumber}
                    <br/><br/>

                    <b> Message: </b> <pre>${message}</pre>
                `,
            })

            return res.json({
                message: "Success!",
            })
        }
        catch (error) {
            console.log("🚀 ~ app.post ~ error:", error)

            return res.status(500).json({
                message: "Internal Server Error!",
                data: error.message,
            })
        }
    }
)

app.get("*", (req, res) => {
    res.send(`<h1> Nothing here! </h1>`)
})

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    })
})

app.listen(port, () => {
    console.log(`\nServer started on port ${port} :) \n`)
})

module.exports = app
