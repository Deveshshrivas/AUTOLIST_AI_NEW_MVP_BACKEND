const mongoose = require('mongoose');

// L. VARIATIONS (PARENT–CHILD)
const variationsSchema = new mongoose.Schema({
  parentageLevel: {
    type: String,
    enum: ['parent', 'child'],
    trim: true
  },
  parentSKU: {
    type: String,
    trim: true,
    uppercase: true
  },
  variationThemeName: {
    type: String,
    enum: ['Color', 'Size', 'ColorSize', 'SizeColor'],
    trim: true
  }
}, { _id: false });

module.exports = variationsSchema;
