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

// Mount sub-routes
router.use('/', crudRoutes);
router.use('/', searchRoutes);
router.use('/', bulkRoutes);
router.use('/', sectionRoutes);

module.exports = router;
