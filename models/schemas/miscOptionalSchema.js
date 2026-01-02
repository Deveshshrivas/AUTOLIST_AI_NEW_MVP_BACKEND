const mongoose = require('mongoose');

// P. MISC / OPTIONAL
const miscOptionalSchema = new mongoose.Schema({
  teamName: {
    type: String,
    trim: true
  },
  externalProductInformationEntity: {
    type: String,
    trim: true
  },
  externalProductInformation: {
    type: String,
    trim: true
  },
  unitCount: {
    type: Number,
    min: 0
  },
  unitCountType: {
    type: String,
    trim: true
  },
  includedComponents: {
    component1: { type: String, trim: true },
    component2: { type: String, trim: true },
    component3: { type: String, trim: true },
    component4: { type: String, trim: true },
    component5: { type: String, trim: true }
  }
}, { _id: false });

module.exports = miscOptionalSchema;
