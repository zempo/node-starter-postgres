const AuthService = require("../services/authService");

const requireAuth = (res, req, next) => {
  const authToken = req.get("Authorization") || "";

  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res
      .status(401)
      .json({
        error: {
          message: "Unauthorized Request. Please provide bearer token.",
        },
      });
  } else {
    bearerToken = authToken.slice(7);
  }
  try {
    const payload = AuthService.verifyJwt(bearerToken);

    AuthService.getUserByEmail(req.app.get("db"), payload.sub)
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({
              error: {
                message:
                  "Unauthorized Request. Please provide proper credentials",
              },
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
    return res
      .status(401)
      .json({
        error: {
          message: "Unauthorized Request. Please provide proper credentials.",
        },
      });
  }
};

module.exports = { requireAuth };
