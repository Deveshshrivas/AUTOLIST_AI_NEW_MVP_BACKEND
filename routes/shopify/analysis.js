const express = require('express');
const router = express.Router();
const {
  analyzeSingleProduct,
  analyzeAllProducts,
  getIncompleteProducts,
  getEnhancedProductData
} = require('../../controllers/shopify');

// Analyze single product
router.get('/products/analyze/:shopifyId', analyzeSingleProduct);

// Analyze all products (summary)
router.get('/products/analyze', analyzeAllProducts);

// Get products with incomplete data
router.get('/products/incomplete', getIncompleteProducts);

// Get enhanced product data for Amazon listing
router.get('/products/enhanced/:shopifyId', getEnhancedProductData);

module.exports = router;
