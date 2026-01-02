const express = require('express');
const router = express.Router();
const {
  searchItems,
  getItemsByStatus,
  updateItemStatus,
  filterByPriceRange,
  filterByBrand
} = require('../../controllers/amazon');

// Search items
router.get('/items/search', searchItems);

// Filter routes
router.get('/items/filter/price', filterByPriceRange);
router.get('/items/filter/brand/:brand', filterByBrand);

// Status operations
router.get('/items/status/:status', getItemsByStatus);
router.patch('/items/:id/status', updateItemStatus);

module.exports = router;
