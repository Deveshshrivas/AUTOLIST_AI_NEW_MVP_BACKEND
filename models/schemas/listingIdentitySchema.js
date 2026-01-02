const mongoose = require('mongoose');

// A. LISTING IDENTITY (REQUIRED SYSTEM FIELDS)
const listingIdentitySchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    trim: true,
    uppercase: true
  },
  listingAction: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'PARTIAL_UPDATE'],
    default: 'CREATE'
  },
  productType: {
    type: String,
    required: [true, 'Product Type is required'],
    trim: true
  }
}, { _id: false });

module.exports = listingIdentitySchema;
