const express = require('express');
const router = express.Router();
const {
  getItemSection,
  updateItemSection,
  updateListingIdentity,
  updateProductIdentity,
  updateOffer,
  updateImages,
  updateCompliance
} = require('../../controllers/amazon');

// Section-specific update routes (named sections)
router.patch('/items/:id/listing-identity', updateListingIdentity);
router.patch('/items/:id/product-identity', updateProductIdentity);
router.patch('/items/:id/offer', updateOffer);
router.patch('/items/:id/images', updateImages);
router.patch('/items/:id/compliance', updateCompliance);

// Generic section operations
router.get('/items/:id/:section', getItemSection);
router.patch('/items/:id/:section', updateItemSection);

module.exports = router;
