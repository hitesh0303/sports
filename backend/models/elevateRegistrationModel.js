const mongoose = require('mongoose');

const elevateRegistrationSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true,
    enum: ['Basketball', 'Volleyball', 'Cricket', 'Table Tennis', 'Chess', 'Carrom']
  },
  captainName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid phone number']
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1
  },
  alternateContact: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid phone number']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ElevateRegistration', elevateRegistrationSchema); 