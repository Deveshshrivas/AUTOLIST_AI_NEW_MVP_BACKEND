const mongoose = require('mongoose');

// C. OFFER (SELL ON AMAZON – IN)
const offerSchema = new mongoose.Schema({
  skipOffer: {
    type: Boolean,
    default: false
  },
  itemCondition: {
    type: String,
    enum: ['New', 'Refurbished', 'Used - Like New', 'Used - Very Good', 'Used - Good', 'Used - Acceptable'],
    default: 'New'
  },
  fulfillmentChannelCode: {
    type: String,
    enum: ['DEFAULT', 'AMAZON_IN'],
    default: 'DEFAULT'
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0,
    default: 0
  },
  inventoryAlwaysAvailable: {
    type: Boolean,
    default: false
  },
  yourPriceINR: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  salePriceINR: {
    type: Number,
    min: 0
  },
  saleStartDate: {
    type: Date
  },
  saleEndDate: {
    type: Date
  },
  merchantShippingGroup: {
    type: String,
    trim: true
  }
}, { _id: false });

module.exports = offerSchema;
