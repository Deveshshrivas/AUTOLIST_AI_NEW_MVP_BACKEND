const express = require('express');
const router = express.Router();
const {
  syncSingleProduct,
  syncAllProducts,
  previewMapping
} = require('../../controllers/shopify');

// Preview mapping without saving
router.get('/products/map/preview/:shopifyId', previewMapping);

// Sync single product to Amazon items
router.post('/products/map/:shopifyId', syncSingleProduct);

// Sync all products to Amazon items
router.post('/products/map-all', syncAllProducts);

module.exports = router;
