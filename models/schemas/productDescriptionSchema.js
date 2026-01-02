const mongoose = require('mongoose');

// D. PRODUCT DESCRIPTION & CONTENT
const productDescriptionSchema = new mongoose.Schema({
  productDescription: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  bulletPoints: {
    point1: { type: String, trim: true, maxlength: 500 },
    point2: { type: String, trim: true, maxlength: 500 },
    point3: { type: String, trim: true, maxlength: 500 },
    point4: { type: String, trim: true, maxlength: 500 },
    point5: { type: String, trim: true, maxlength: 500 }
  },
  style: {
    type: String,
    trim: true
  },
  lifestyle: {
    type: String,
    trim: true
  },
  fitType: {
    type: String,
    enum: ['Regular', 'Slim', 'Loose', 'Relaxed', 'Athletic', 'Oversized', 'Tailored'],
    trim: true
  },
  designName: {
    type: String,
    trim: true
  },
  pattern: {
    type: String,
    trim: true
  }
}, { _id: false });

module.exports = productDescriptionSchema;
