require('dotenv').config();
/**
 * DEPENDENCIES
*/
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const winston = require('winston')
/**
 * LOCAL IMPORTS
*/
const logger = require('./middleware/logMW').logger
const errCatch = require('./middleware/errMW')
const { NODE_ENV } = require("./config");

// Route imports
const authRouter = require('./routes/authRouter')
const usersRouter = require('./routes/usersRouter')

//----------------------------------------------
const app = express()

/**
 * MIDDLEWARE
*/
app.use(cors())
const morganOption = NODE_ENV === "production" ? "tiny" : "dev"
if (NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    )
}
app.use(morgan(morganOption))
app.use(helmet())

/**
 * ROUTES
*/
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
    // load app status pg w/ variable checks
    res.status(200).json('Welcome to your app')
})

module.exports = app
