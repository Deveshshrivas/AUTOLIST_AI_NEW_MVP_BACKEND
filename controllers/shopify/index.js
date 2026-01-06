// Import all Shopify controllers
const crudController = require('./crudController');
const lookupController = require('./lookupController');
const syncController = require('./syncController');
const mapController = require('./mapController');
const analysisController = require('./analysisController');

module.exports = {
  // CRUD operations
  ...crudController,
  
  // Lookup operations
  ...lookupController,
  
  // Sync operations
  ...syncController,
  
  // Map operations
  ...mapController,
  
  // Analysis operations
  ...analysisController
};
