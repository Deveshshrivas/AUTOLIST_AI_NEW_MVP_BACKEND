const express = require('express');
const router = express.Router();

// Import sub-route modules
const crudRoutes = require('./crud');
const lookupRoutes = require('./lookup');
const syncRoutes = require('./sync');

// Mount sub-routes
router.use('/', crudRoutes);
router.use('/', lookupRoutes);
router.use('/', syncRoutes);

module.exports = router;
