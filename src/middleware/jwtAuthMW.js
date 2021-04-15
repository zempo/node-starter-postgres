const authService = require("../services/authService");

const requireAuth = (req, res, next) => {
  const authToken = req.get("Authorization") || "";

  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({
      success: false,
      message: `Unauthorized Request. Please provide proper credentials.`,
    });
  } else {
    bearerToken = authToken.slice(7);
  }
  try {
    const payload = authService.verifyJwt(bearerToken);

    authService
      .getUserByEmail(req.app.get("db"), payload.sub)
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized Request. Please provide proper credentials.",
          });
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Unauthorized Request. Please provide proper credentials.`,
    });
  }
};

module.exports = { requireAuth };
