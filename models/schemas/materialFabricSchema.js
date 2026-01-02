const mongoose = require('mongoose');

// G. MATERIAL & FABRIC (MULTI-VALUE)
const materialFabricSchema = new mongoose.Schema({
  materials: {
    material1: { type: String, trim: true },
    material2: { type: String, trim: true },
    material3: { type: String, trim: true }
  },
  fabricType: {
    type: String,
    trim: true
  },
  embroideryType: {
    type: String,
    trim: true
  },
  embellishmentFeatures: {
    feature1: { type: String, trim: true },
    feature2: { type: String, trim: true },
    feature3: { type: String, trim: true },
    feature4: { type: String, trim: true },
    feature5: { type: String, trim: true }
  }
}, { _id: false });

module.exports = materialFabricSchema;
