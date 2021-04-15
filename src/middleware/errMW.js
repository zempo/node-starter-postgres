require("dotenv").config();
const { NODE_ENV } = require("../config");

const errCatch = (err, req, res, next) => {
  let response;

  if (NODE_ENV === "production") {
    response = { success: false, message: "Server Error", payload: err };
  } else {
    response = { success: false, message: "Server Error", payload: err };
  }
  return res.status(500).json(response);
};

module.exports = errCatch;
