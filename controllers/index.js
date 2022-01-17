const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// Collects all api endpoints
router.use('/api', apiRoutes);

// Home routes/ webpages
router.use('/', homeRoutes);

// Catch all other request not found
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
