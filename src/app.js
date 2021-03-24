/**
 * DEPENDENCIES
 */
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const winston = require("winston");
/**
 * LOCAL IMPORTS
 */
const logger = require("./middleware/logMW").logger;
const errCatch = require("./middleware/errMW");
const { NODE_ENV, WORKING, PORT } = require("./config");

// Route imports
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");

//----------------------------------------------
const app = express();

/**
 * MIDDLEWARE
 */
app.use(cors());
const morganOption = NODE_ENV === "production" ? "tiny" : "dev";
if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
app.use(morgan(morganOption));
app.use(helmet());

/**
 * ROUTES
 */
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  let statusPg = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Server Status</title>
    </head>
    <body>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&family=Roboto&display=swap");
  
        body {
          background: #f0efef;
          margin: 0;
          padding: 10rem 5rem;
        }
  
        h1 { 
          text-align: center;
          color: #8f6d19;
          font-family: "Raleway", sans-serif;
          font-size: calc(1.7rem + 1vw);
        }
  
        main {
          max-width: 1200px;
          margin: auto;
        }
  
        h2 {
          color: #4d4d4d;
          font-family: "Raleway", sans-serif;
          font-size: calc(1rem + 0.5vw);
          margin-top: 5rem;
          line-height: 1;
        }
  
        ul {
          list-style: none;
        }
  
        li {
          font-family: "Roboto", sans-serif;
          font-size: calc(1rem + 0.25vw);
          text-transform: uppercase;
          line-height: 2;
        }
  
        .on {
          color: rgb(36, 150, 21);
        }
  
        .off {
          color: rgb(233, 32, 75);
        }
      </style>
      <h1>Server for ''Your App''</h1>
      <main>
        <h2>Debug</h2>
        <hr />
        <ul>
          <li>
            <b>Env Vars:</b>
            <span class="${
              WORKING === "online" ? "on" : "off"
            }"> ${WORKING} </span>
          </li>
        </ul>
        <h2>Routes</h2>
        <hr />
        <ul>
          <li>
            <a href="http://localhost:${PORT}">Home</a>
          </li>
        </ul>
      </main>
    </body>
  </html>`;

  // load app status pg w/ variable checks
  res.status(200).send(statusPg);
});

module.exports = app;
