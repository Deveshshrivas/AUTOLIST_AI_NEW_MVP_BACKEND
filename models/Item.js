const mongoose = require('mongoose');
const listingIdentitySchema = require('./schemas/listingIdentitySchema');
const productIdentitySchema = require('./schemas/productIdentitySchema');
const offerSchema = require('./schemas/offerSchema');
const productDescriptionSchema = require('./schemas/productDescriptionSchema');
const targetAudienceSchema = require('./schemas/targetAudienceSchema');
const sizeSystemSchema = require('./schemas/sizeSystemSchema');
const materialFabricSchema = require('./schemas/materialFabricSchema');
const colorStyleSchema = require('./schemas/colorStyleSchema');
const itemDimensionsSchema = require('./schemas/itemDimensionsSchema');
const occasionSchema = require('./schemas/occasionSchema');
const packageShippingSchema = require('./schemas/packageShippingSchema');
const variationsSchema = require('./schemas/variationsSchema');
const complianceRegulatorySchema = require('./schemas/complianceRegulatorySchema');
const contactDetailsSchema = require('./schemas/contactDetailsSchema');
const imagesSchema = require('./schemas/imagesSchema');
const miscOptionalSchema = require('./schemas/miscOptionalSchema');

// Amazon Product Listing Schema
const itemSchema = new mongoose.Schema({
  // A. LISTING IDENTITY (REQUIRED SYSTEM FIELDS)
  listingIdentity: listingIdentitySchema,

  // B. PRODUCT IDENTITY
  productIdentity: productIdentitySchema,

  // C. OFFER (SELL ON AMAZON – IN)
  offer: offerSchema,

  // D. PRODUCT DESCRIPTION & CONTENT
  productDescription: productDescriptionSchema,

  // E. TARGET AUDIENCE
  targetAudience: targetAudienceSchema,

  // F. SIZE SYSTEM (APPAREL)
  sizeSystem: sizeSystemSchema,

  // G. MATERIAL & FABRIC (MULTI-VALUE)
  materialFabric: materialFabricSchema,

  // H. COLOR & STYLE
  colorStyle: colorStyleSchema,

  // I. ITEM DIMENSIONS & FIT
  itemDimensions: itemDimensionsSchema,

  // J. OCCASION & USE
  occasion: occasionSchema,

  // K. PACKAGE & SHIPPING
  packageShipping: packageShippingSchema,

  // L. VARIATIONS (PARENT–CHILD)
  variations: variationsSchema,

  // M. COMPLIANCE & REGULATORY (INDIA)
  complianceRegulatory: complianceRegulatorySchema,

  // N. IMPORT / PACK / MANUFACTURER DETAILS
  contactDetails: contactDetailsSchema,

  // O. IMAGES
  images: imagesSchema,

  // P. MISC / OPTIONAL
  miscOptional: miscOptionalSchema,

  // Additional metadata
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  },
  lastSyncedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
itemSchema.index({ 'listingIdentity.sku': 1 });
itemSchema.index({ 'productIdentity.itemName': 'text', 'productIdentity.brandName': 'text' });
itemSchema.index({ status: 1 });

// Virtual for checking if item is on sale
itemSchema.virtual('isOnSale').get(function() {
  if (!this.offer.salePriceINR) return false;
  const now = new Date();
  if (this.offer.saleStartDate && now < this.offer.saleStartDate) return false;
  if (this.offer.saleEndDate && now > this.offer.saleEndDate) return false;
  return true;
});

// Method to get active price
itemSchema.methods.getActivePrice = function() {
  if (this.isOnSale) {
    return this.offer.salePriceINR;
  }
  return this.offer.yourPriceINR;
};

module.exports = mongoose.model('Item', itemSchema);
