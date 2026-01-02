const mongoose = require('mongoose');

// N. IMPORT / PACK / MANUFACTURER DETAILS
const contactDetailsSchema = new mongoose.Schema({
  manufacturerContactInformation: {
    type: String,
    trim: true
  },
  importerContactInformation: {
    type: String,
    trim: true
  },
  packerContactInformation: {
    type: String,
    trim: true
  }
}, { _id: false });

module.exports = contactDetailsSchema;
