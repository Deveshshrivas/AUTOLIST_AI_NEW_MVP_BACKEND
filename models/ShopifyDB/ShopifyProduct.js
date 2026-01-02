const mongoose = require('mongoose');

// Image Schema (used for both single image and images array)
const imageSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  alt: {
    type: String,
    trim: true
  },
  position: {
    type: Number
  },
  product_id: {
    type: Number
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  admin_graphql_api_id: {
    type: String,
    trim: true
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  src: {
    type: String,
    trim: true
  },
  variant_ids: [{
    type: Number
  }]
}, { _id: false });

// Option Schema
const optionSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  product_id: {
    type: Number
  },
  name: {
    type: String,
    trim: true
  },
  position: {
    type: Number
  },
  values: [{
    type: String,
    trim: true
  }]
}, { _id: false });

// Variant Schema
const variantSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  product_id: {
    type: Number
  },
  title: {
    type: String,
    trim: true
  },
  price: {
    type: String
  },
  position: {
    type: Number
  },
  inventory_policy: {
    type: String,
    trim: true
  },
  compare_at_price: {
    type: String
  },
  option1: {
    type: String,
    trim: true
  },
  option2: {
    type: String,
    trim: true
  },
  option3: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  taxable: {
    type: Boolean
  },
  barcode: {
    type: String,
    trim: true
  },
  fulfillment_service: {
    type: String,
    trim: true
  },
  grams: {
    type: Number
  },
  inventory_management: {
    type: String,
    trim: true
  },
  requires_shipping: {
    type: Boolean
  },
  sku: {
    type: String,
    trim: true
  },
  weight: {
    type: Number
  },
  weight_unit: {
    type: String,
    trim: true
  },
  inventory_item_id: {
    type: Number
  },
  inventory_quantity: {
    type: Number
  },
  old_inventory_quantity: {
    type: Number
  },
  admin_graphql_api_id: {
    type: String,
    trim: true
  },
  image_id: {
    type: Number
  }
}, { _id: false });

// Main Shopify Product Schema
const shopifyProductSchema = new mongoose.Schema({
  shopify_id: {
    type: String,
    required: true,
    trim: true
  },
  shop_domain: {
    type: String,
    trim: true
  },
  admin_graphql_api_id: {
    type: String,
    trim: true
  },
  body_html: {
    type: String
  },
  created_at: {
    type: Date
  },
  handle: {
    type: String,
    trim: true
  },
  id: {
    type: Number
  },
  image: imageSchema,
  images: [imageSchema],
  options: [optionSchema],
  product_type: {
    type: String,
    trim: true
  },
  published_at: {
    type: Date
  },
  published_scope: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'draft'
  },
  synced_at: {
    type: Date
  },
  tags: {
    type: String,
    trim: true
  },
  template_suffix: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  updated_at: {
    type: Date
  },
  variants: [variantSchema],
  vendor: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
shopifyProductSchema.index({ shopify_id: 1 });
shopifyProductSchema.index({ shop_domain: 1 });
shopifyProductSchema.index({ handle: 1 });
shopifyProductSchema.index({ product_type: 1 });
shopifyProductSchema.index({ vendor: 1 });
shopifyProductSchema.index({ status: 1 });
shopifyProductSchema.index({ title: 'text', body_html: 'text', tags: 'text' });

module.exports = mongoose.model('ShopifyProduct', shopifyProductSchema);
