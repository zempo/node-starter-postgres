const { PORT, WORKING } = require("./config");

const statusPg = `<!DOCTYPE html>
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
    <h1>Server for "Your Project"</h1>
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
      <h2>Public Routes</h2>
      <hr />
      <ul>
        <li>
          <a href="http://localhost:${PORT}">Home</a>
        </li>
      </ul>
    </main>
  </body>
</html>`;

module.exports = { statusPg };
