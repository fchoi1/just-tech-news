/* eslint-disable no-console */
/* eslint-disable max-len */
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const hbs = exphbs.create({}); // Setup handlebars

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes, all done in the routes directory
app.use(routes);

// connect to mysql server, sync means taking config and connecting to associted database tables, creates on if not found
// force means to recreated all of the tables on startup if there are changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening`));
});
