const mongoose = require('mongoose');

// E. TARGET AUDIENCE
const targetAudienceSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    enum: ['Men', 'Women', 'Boys', 'Girls', 'Baby', 'Unisex'],
    trim: true
  },
  targetGender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    trim: true
  },
  ageRangeDescription: {
    type: String,
    enum: ['Newborn', 'Infant', 'Toddler', 'Kids', 'Youth', 'Adult', 'All Ages'],
    trim: true
  }
}, { _id: false });

module.exports = targetAudienceSchema;
