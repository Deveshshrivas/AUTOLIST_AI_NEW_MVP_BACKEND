const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  getItemBySku,
  createItem,
  updateItem,
  deleteItem
} = require('../../controllers/amazon');

// SKU lookup (must be before :id route)
router.get('/items/sku/:sku', getItemBySku);

// CRUD operations
router.route('/items')
  .get(getAllItems)
  .post(createItem);

router.route('/items/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
