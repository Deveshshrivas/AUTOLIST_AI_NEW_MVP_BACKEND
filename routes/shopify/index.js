const express = require('express');
const router = express.Router();

// Import sub-route modules
const crudRoutes = require('./crud');
const lookupRoutes = require('./lookup');
const syncRoutes = require('./sync');
const mapRoutes = require('./map');
const analysisRoutes = require('./analysis');

// Mount sub-routes (specific routes first)
router.use('/', analysisRoutes);  // Must be before CRUD
router.use('/', lookupRoutes);
router.use('/', syncRoutes);
router.use('/', mapRoutes);
router.use('/', crudRoutes);      // General CRUD last

module.exports = router;
