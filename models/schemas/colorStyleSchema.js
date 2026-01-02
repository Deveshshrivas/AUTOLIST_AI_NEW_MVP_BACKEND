const mongoose = require('mongoose');

// H. COLOR & STYLE
const colorStyleSchema = new mongoose.Schema({
  colorMap: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  backStyles: {
    style1: { type: String, trim: true },
    style2: { type: String, trim: true },
    style3: { type: String, trim: true },
    style4: { type: String, trim: true },
    style5: { type: String, trim: true }
  },
  neckStyles: {
    style1: { type: String, trim: true },
    style2: { type: String, trim: true },
    style3: { type: String, trim: true },
    style4: { type: String, trim: true },
    style5: { type: String, trim: true }
  },
  sleeveType: {
    type: String,
    trim: true
  },
  closureTypes: {
    type1: { type: String, trim: true },
    type2: { type: String, trim: true }
  }
}, { _id: false });

module.exports = colorStyleSchema;
