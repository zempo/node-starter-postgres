const express = require("express");
const authService = require("../services/authService");
const { requireAuth } = require("../middleware/jwtAuthMW");
// Set-up
const authRouter = express.Router();
const bodyParser = express.json();

/**
 * @desc POST valid user creds to get token
 * @route /api/login
 * @access Public
 */
authRouter.post("/login", bodyParser, (req, res, next) => {
  const { email, password } = req.body;
  const userCreds = { email, password };

  for (const [key, value] of Object.entries(userCreds)) {
    if (value == undefined || value == null) {
      return res.status(400).json({
        success: false,
        message: `Please provide a '${key}' in request body.`,
      });
    }
  }

  authService
    .getUserByEmail(req.app.get("db"), userCreds.email)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(401).json({
          success: false,
          message: `Incorrect email or password, please try again.`,
        });
      } else {
        return authService
          .comparePwds(userCreds.password, dbUser.password)
          .then((matching) => {
            if (matching) {
              const sub = dbUser.email;
              const payload = { user_id: dbUser.id };

              return res.status(201).json({
                success: true,
                message: `Created new token.`,
                token: authService.createJwt(sub, payload),
              });
            } else {
              return res.status(401).json({
                success: false,
                message: `Incorrect email or password, please try again.`,
              });
            }
          })
          .catch(next);
      }
    });
});

/**
 * @desc POST valid user creds to refresh token
 * @route /api/v1/refresh
 * @access Private
 */
authRouter
  .route("/refresh")
  .all(requireAuth)
  .post((req, res, next) => {
    const sub = req.user.email;
    const payload = { user_id: req.user.id };
    res.status(201).json({
      success: true,
      message: `Created token refresh.`,
      token: authService.createJwt(sub, payload),
    });
  });

module.exports = authRouter;
