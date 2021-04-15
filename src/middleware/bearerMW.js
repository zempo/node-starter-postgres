require("dotenv").config();

/**
 * IF USING BEARER API-KEY
 */
const bearer = (req, res, next) => {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_KEY;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request. Please provide proper credentials.",
    });
  }

  next();
};
