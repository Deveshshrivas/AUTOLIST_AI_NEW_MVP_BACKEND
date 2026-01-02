const express = require('express');
const router = express.Router();
const {
  bulkCreate,
  syncProduct
} = require('../../controllers/shopify');

// Bulk operations
router.post('/products/bulk', bulkCreate);

// Sync operation (upsert)
router.post('/products/sync', syncProduct);

module.exports = router;
