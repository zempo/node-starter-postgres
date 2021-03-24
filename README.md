# Node Express Starter

Personal project starter

## Set Up

Complete the following steps to begin a new project

1. First, clone to your machine

   `git clone https://github.com/zempo/node-starter-postgres.git proj_name`

2. Go to the project directory

   `cd proj_name`

3. Reset project .git history with this command

   `rm -rf .git && git init`

4. Install project dependencies

   `npm i`

5. Rename the example .env file, if you plan on using environmental variables in your project

   `mv example.env .env`

6. Update the package.json with your project name and details

## Database (Sql)

1. Run `npm i knex` and then `npm i pg` (for postgres, in this case).
2. Reference the [Knex Documentation](https://knexjs.org/) for more.
3. A sample db url has been added to the example env
4. Getting started

```js
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

console.log("connection successful");
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
