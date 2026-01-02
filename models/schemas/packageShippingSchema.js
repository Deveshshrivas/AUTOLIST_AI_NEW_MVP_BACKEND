const mongoose = require('mongoose');

// K. PACKAGE & SHIPPING
const packageShippingSchema = new mongoose.Schema({
  numberOfItems: {
    type: Number,
    min: 1,
    default: 1
  },
  itemPackageQuantity: {
    type: Number,
    min: 1,
    default: 1
  },
  packageLength: {
    type: Number,
    min: 0
  },
  packageLengthUnit: {
    type: String,
    enum: ['CM', 'IN', 'MM', 'M'],
    default: 'CM'
  },
  packageWidth: {
    type: Number,
    min: 0
  },
  packageWidthUnit: {
    type: String,
    enum: ['CM', 'IN', 'MM', 'M'],
    default: 'CM'
  },
  packageHeight: {
    type: Number,
    min: 0
  },
  packageHeightUnit: {
    type: String,
    enum: ['CM', 'IN', 'MM', 'M'],
    default: 'CM'
  },
  packageWeight: {
    type: Number,
    min: 0
  },
  packageWeightUnit: {
    type: String,
    enum: ['KG', 'G', 'LB', 'OZ'],
    default: 'KG'
  },
  itemWeight: {
    type: Number,
    min: 0
  },
  itemWeightUnit: {
    type: String,
    enum: ['KG', 'G', 'LB', 'OZ'],
    default: 'KG'
  }
}, { _id: false });

module.exports = packageShippingSchema;
