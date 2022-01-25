const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

// Collects all api endpoints
router.use('/api', apiRoutes);

// Home routes/ webpages
router.use('/', homeRoutes);

// Dashboard routes/ 
router.use('/dashboard', dashboardRoutes);

// Catch all other request not found
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
