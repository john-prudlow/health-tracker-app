const mongoose = require('mongoose');

// Define the schema for storing health metrics
const dataSchema = new mongoose.Schema({
  date: {
    type: String,
    unique: true,
    required: true
  },
  steps: {
    type: Number,
    required: false
  },
  sleep: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

const Data = mongoose.model('Data', dataSchema, 'data');

module.exports = Data;