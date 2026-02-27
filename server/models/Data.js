const mongoose = require('mongoose');

// Define the schema for storing health metrics
const dataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  steps: Number,
  sleep: Number,
  weight: Number
}, {
  timestamps: true
});

dataSchema.index({ userId: 1, date: 1 }, { unique: true });

const Data = mongoose.model('Data', dataSchema, 'data');

module.exports = Data;