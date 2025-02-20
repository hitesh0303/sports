const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['elevate', 'intra', 'prize'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  endDate: Date,
  venue: String,
  category: String, // For intra events (students/teachers)
  gender: String,
  sport: String,
  details: String,
  brochureUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema); 