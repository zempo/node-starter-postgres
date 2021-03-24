const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config");

const AuthService = {
  getUserByEmail(db, email) {
    return db("db_users").where({ email }).first();
  },
  parseBasicToken(token) {
    return Buffer.from(token, "base64").toString().split(":");
  },
  comparePwds(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, {
      subject,
      expiresIn: JWT_EXPIRY,
      algorithm: "HS256",
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
  },
};

module.exports = AuthService;
