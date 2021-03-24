const xss = require("xss");
const Treeize = require("treeize");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
// Validation
const { REGEX } = require("../config");
const { VALID_USERNAME, VALID_PWD } = REGEX;

const UsersService = {
  getUsers(db) {
    return db.select("*").from("db_users");
  },
  getUserById(db, id) {
    return db.from("db_users").select("*").where("id", id).first();
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("db_users")
      .returning("*")
      .then(([user]) => {
        return user;
      });
  },
  deleteUser(db, id) {
    return db("db_users").where({ id }).delete();
  },
  uniqueUserName(db, user_name) {
    return db("db_users")
      .where({ user_name })
      .first()
      .then((user) => {
        return !!user;
      });
  },
  uniqueEmail(db, email) {
    return db("db_users")
      .where({ email })
      .first()
      .then((user) => {
        return !!user;
      });
  },
  checkAllFields(user) {
    for (const [key, value] of Object.entries(user)) {
      if (value == null) {
        return `Missing required '${key}' to create new user`;
      }
    }
    // if loops through and finds all keys
    return null;
  },
  validateUserName(user_name) {
    if (!VALID_USERNAME.test(user_name)) {
      return "Username can only consist of alphanumeric characters, underscores, or hyphens.";
    }
    if (user_name.length < 3) {
      return "Username must be longer than 3 characters.";
    }
    if (user_name.length > 72) {
      return "Username must be less than 72 characters.";
    }
    if (user_name.startsWith(" ") || user_name.endsWith(" ")) {
      return "Username must not start or end with empty spaces";
    }
    return null;
  },
  validateEmail(email) {
    if (validator.validate(email) == false) {
      return "Invalid email";
    }
    return null;
  },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters.";
    }
    if (password.length > 256) {
      return "Password must be less than 256 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!VALID_PWD.test(password)) {
      return "Password must contain 1 upper case, lower case, number and special character";
    }
    return null;
  },
  validateFullName(name) {
    if (name.length > 150) {
      return "Full names shall be abbreviated to 150 characters based on Minnesota Statutory Law. Please reach out to our support team if you would like to create an account for the kitten who walks across your keyboard.";
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUsers(users) {
    return users.map(this.serializeUser);
  },
  serializeUser(user) {
    const userTree = new Treeize();
    const userData = userTree.grow([user]).getData()[0];
    return {
      admin: userData.admin,
      user_name: xss(userData.user_name),
      full_name: xss(userData.full_name),
      email: xss(userData.email),
      date_created: new Date(userData.date_created),
      date_modified: userData.date_modified || null,
    };
  },
  serializeUsername(user) {
    const userTree = new Treeize();
    const userData = userTree.grow([user]).getData()[0];
    return {
      admin: userData.admin,
      user_name: xss(userData.user_name),
    };
  },
};

module.exports = UsersService;
