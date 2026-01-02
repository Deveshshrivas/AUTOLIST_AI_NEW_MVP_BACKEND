const mongoose = require('mongoose');

// M. COMPLIANCE & REGULATORY (INDIA)
const complianceRegulatorySchema = new mongoose.Schema({
  countryOfOrigin: {
    type: String,
    required: [true, 'Country of Origin is required'],
    default: 'IN',
    trim: true
  },
  complianceRegulations: [
    {
      regulationType: { type: String, trim: true },
      regulatoryIdentification: { type: String, trim: true }
    }
  ],
  complianceWeaveType: {
    type: String,
    trim: true
  },
  complianceShirtType: {
    type: String,
    trim: true
  },
  hsnCode: {
    type: String,
    trim: true
  }
}, { _id: false });

module.exports = complianceRegulatorySchema;
