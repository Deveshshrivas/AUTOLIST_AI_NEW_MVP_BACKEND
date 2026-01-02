const express = require('express');
const router = express.Router();
const {
  getByShopifyId,
  getByHandle,
  searchProducts
} = require('../../controllers/shopify');

// Search
router.get('/products/search', searchProducts);

// Lookup by Shopify ID
router.get('/products/shopify/:shopifyId', getByShopifyId);

// Lookup by handle
router.get('/products/handle/:handle', getByHandle);

module.exports = router;
