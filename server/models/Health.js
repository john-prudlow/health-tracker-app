const mongoose = require('mongoose');

// Define the schema for storing health metrics
const healthSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    trim: true
  },
  steps: {
    type: String,
    required: true,
    trim: true
  },
  sleep: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Health = mongoose.model('Health', healthSchema);

module.exports = Health;