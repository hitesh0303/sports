const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['Khelo India', 'All India Inter University', 'South West Zone', 'Division Level', 'City Level'],
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['individual', 'team'],
    required: true
  },
  studentName: String,
  position: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema); 