const router = require('express').Router();

const apiRoutes = require('./api');

// Collects all api endpoints
router.use('/api', apiRoutes);

// Catch all other request not found
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
