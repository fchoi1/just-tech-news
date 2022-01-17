/* eslint-disable no-console */
/* eslint-disable max-len */
const express = require('express');
const routes = require('./routes');
const sequalize = require('./config/connection');

const app = express();
const PORT = process.env.PROT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes, all done in the routes directory
app.use(routes);

// connect to mysql server, sync means taking config and connecting to associted database tables, creates on if not found
// force means to recreated all of the tables on startup if there are changes
sequalize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
