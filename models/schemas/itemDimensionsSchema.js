const mongoose = require('mongoose');

// I. ITEM DIMENSIONS & FIT
const itemDimensionsSchema = new mongoose.Schema({
  itemLengthDescription: {
    type: String,
    trim: true
  },
  itemLengthLongerEdge: {
    type: Number,
    min: 0
  },
  itemLengthUnit: {
    type: String,
    enum: ['CM', 'IN', 'MM', 'M'],
    default: 'CM'
  },
  shoulderToBottomHemLength: {
    type: Number,
    min: 0
  },
  shoulderToBottomHemLengthUnit: {
    type: String,
    enum: ['CM', 'IN', 'MM', 'M'],
    default: 'CM'
  },
  chestSize: {
    type: Number,
    min: 0
  },
  chestSizeUnit: {
    type: String,
    enum: ['CM', 'IN', 'MM', 'M'],
    default: 'CM'
  },
  numberOfPockets: {
    type: Number,
    min: 0,
    default: 0
  }
}, { _id: false });

module.exports = itemDimensionsSchema;
