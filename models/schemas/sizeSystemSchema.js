const mongoose = require('mongoose');

// F. SIZE SYSTEM (APPAREL)
const sizeSystemSchema = new mongoose.Schema({
  apparelSize: {
    sizeSystem: {
      type: String,
      enum: ['IN', 'US', 'UK', 'EU', 'AU'],
      trim: true
    },
    sizeClass: {
      type: String,
      enum: ['Alpha', 'Numeric'],
      trim: true
    },
    sizeValue: {
      type: String,
      trim: true
    },
    sizeToValue: {
      type: String,
      trim: true
    },
    bodyType: {
      type: String,
      enum: ['Petite', 'Regular', 'Plus', 'Tall', 'Big'],
      trim: true
    }
  },
  shirtSize: {
    sizeSystem: {
      type: String,
      enum: ['IN', 'US', 'UK', 'EU', 'AU'],
      trim: true
    },
    sizeClass: {
      type: String,
      enum: ['Alpha', 'Numeric'],
      trim: true
    },
    sizeValue: {
      type: String,
      trim: true
    },
    sizeToRange: {
      type: String,
      trim: true
    },
    bodyType: {
      type: String,
      enum: ['Petite', 'Regular', 'Plus', 'Tall', 'Big'],
      trim: true
    }
  }
}, { _id: false });

module.exports = sizeSystemSchema;
