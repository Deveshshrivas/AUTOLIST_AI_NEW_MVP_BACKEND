const mongoose = require('mongoose');

// B. PRODUCT IDENTITY
const productIdentitySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item Name is required'],
    trim: true
  },
  brandName: {
    type: String,
    required: [true, 'Brand Name is required'],
    trim: true
  },
  productIdType: {
    type: String,
    enum: ['ASIN', 'EAN', 'GTIN', 'ISBN', 'UPC'],
    required: true
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    trim: true
  },
  recommendedBrowseNodes: {
    node1: { type: String, trim: true },
    node2: { type: String, trim: true },
    node3: { type: String, trim: true },
    node4: { type: String, trim: true },
    node5: { type: String, trim: true }
  },
  modelNumber: {
    type: String,
    trim: true
  },
  modelName: {
    type: String,
    trim: true
  },
  manufacturer: {
    type: String,
    trim: true
  },
  partNumber: {
    type: String,
    trim: true
  }
}, { _id: false });

module.exports = productIdentitySchema;
