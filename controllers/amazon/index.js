// Import all Amazon controllers
const crudController = require('./crudController');
const searchController = require('./searchController');
const bulkController = require('./bulkController');
const sectionController = require('./sectionController');

module.exports = {
  // CRUD operations
  ...crudController,
  
  // Search & Filter operations
  ...searchController,
  
  // Bulk operations
  ...bulkController,
  
  // Section-specific operations
  ...sectionController
};
