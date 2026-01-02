const mongoose = require('mongoose');

// O. IMAGES
const imagesSchema = new mongoose.Schema({
  mainImageURL: {
    type: String,
    required: [true, 'Main Image URL is required'],
    trim: true
  },
  otherImageURLs: {
    url1: { type: String, trim: true },
    url2: { type: String, trim: true },
    url3: { type: String, trim: true },
    url4: { type: String, trim: true },
    url5: { type: String, trim: true }
  }
}, { _id: false });

module.exports = imagesSchema;
