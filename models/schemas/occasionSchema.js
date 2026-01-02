const mongoose = require('mongoose');

// J. OCCASION & USE
const occasionSchema = new mongoose.Schema({
  occasions: {
    occasion1: { type: String, trim: true },
    occasion2: { type: String, trim: true },
    occasion3: { type: String, trim: true },
    occasion4: { type: String, trim: true },
    occasion5: { type: String, trim: true }
  }
}, { _id: false });

module.exports = occasionSchema;
