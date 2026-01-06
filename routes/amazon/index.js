const express = require('express');
const router = express.Router();

// Import sub-route modules
const crudRoutes = require('./crud');
const searchRoutes = require('./search');
const bulkRoutes = require('./bulk');
const sectionRoutes = require('./section');

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Amazon API is working!',
    timestamp: new Date().toISOString()
  });
});

// Mount sub-routes (order matters - more specific routes first)
router.use('/', searchRoutes);  // Must be before crud routes
router.use('/', bulkRoutes);
router.use('/', sectionRoutes);
router.use('/', crudRoutes);    // General routes last

module.exports = router;
