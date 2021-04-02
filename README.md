# Node Express Starter

Personal project starter

## Set Up

Complete the following steps to begin a new project

```bash
# 1. First, clone to your machine
git clone https://github.com/zempo/node-starter-postgres.git my_project

# 2. Go to the project directory
cd my_project

# 3. Reset project .git history with this command
rm -rf .git && git init

# 4. Install project dependencies
npm i

# 5. Rename the example .env file, if you plan on using environmental variables in your project
mv example.env .env
```

> Be sure to update your package.json w/ your project details!

## Database (Sql)

1. Add migrations then create project database

```bash

createdb -U postgres new_db

```

2. Run migrations 1 by 1 (or all at once)

```bash
# migrate up
npm run migrate -- 1
# migrate down
npm run migrate -- 0

# migrate up, full
npm run migrate

```

3. Seed database

```bash

psql -U postgres -d new_db -f ./seeds/seed.db_tables.sql

```

## Integrate Knex

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
