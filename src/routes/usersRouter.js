const express = require('express')
const path = require('path')
const { requireAuth } = require('../middleware/jwtAuthMW')

/**
 * SETUP
 * */ 
const UsersService = require('../services/usersService')
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .route('/')
    .get(requireAuth, checkUsersExist)
    .post(jsonBodyParser, (req, res, next) => {
        const { password, user_name, full_name, email } = req.body;
        const newUser = { password, user_name, admin: false, full_name, email };
    
        async function validateUser(user, service) {
          try {
            // if we get an error, we step out of function
            let missingKeys = await service.checkAllFields(user);
            if (missingKeys) return res.status(400).json({ error: missingKeys });
    
            let invalidUser = await service.validateUserName(user.user_name);
            if (invalidUser) return res.status(400).json({ error: invalidUser });
    
            let invalidName = await service.validateFullName(user.full_name);
            if (invalidName) return res.status(400).json({ error: invalidName });
    
            let invalidEmail = await service.validateEmail(user.email);
            if (invalidEmail) return res.status(400).json({ error: invalidEmail });
    
            let invalidPassword = await service.validatePassword(user.password);
            if (invalidPassword)
              return res.status(400).json({ error: invalidPassword });
    
            let userNameExists = await service.uniqueUserName(
              req.app.get("db"),
              user.user_name
            );
            if (userNameExists)
              return res.status(400).json({ error: "Username already taken." });
    
            let emailExists = await service.uniqueEmail(
              req.app.get("db"),
              user.email
            );
            if (emailExists)
              return res
                .status(400)
                .json({
                  error: "An account with this email has already been created."
                });
    
            // then we hash password
            let hashpwd = await service.hashPassword(user.password);
            user.password = hashpwd;
            // then we insert the new user
            let insertedUser = await service.insertUser(req.app.get("db"), user);
            if (!insertedUser)
              return res
                .status(500)
                .json({ error: "Sorry, our servers appear to be down :/" });
    
            return res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${insertedUser.id}`))
              .json(service.serializeUser(insertedUser));
          } catch (error) {
            next(error);
          }
        }
    
        const result = validateUser(newUser, UsersService);
        result;
      });

async function checkUsersExist(req, res, next) {
  try {
    const users = await UsersService.getUsers(req.app.get("db"));

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.users = users;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkUserExists(req, res, next) {
  try {
    const user = await UsersService.getUserById(
      req.app.get("db"),
      req.params.user_id
    );

    if (!user) {
      return res.status(404).json({ message: "This user no longer exists" });
    }

    res.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

      module.exports = usersRouter;