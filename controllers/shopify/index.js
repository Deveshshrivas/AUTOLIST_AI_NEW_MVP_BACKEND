// Import all Shopify controllers
const crudController = require('./crudController');
const lookupController = require('./lookupController');
const syncController = require('./syncController');

module.exports = {
  // CRUD operations
  ...crudController,
  
  // Lookup operations
  ...lookupController,
  
  // Sync operations
  ...syncController
};
