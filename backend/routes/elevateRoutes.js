const express = require('express');
const router = express.Router();
const ElevateRegistration = require('../models/elevateRegistrationModel');
const { protect, admin } = require('../middleware/authMiddleware');

// Submit registration (public)
router.post('/register', async (req, res) => {
  try {
    const registration = await ElevateRegistration.create(req.body);
    res.status(201).json(registration);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: error.message });
  }
});

// Get all registrations (admin only)
router.get('/registrations', protect, admin, async (req, res) => {
  try {
    const registrations = await ElevateRegistration.find()
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update registration status (admin only)
router.patch('/registrations/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const registration = await ElevateRegistration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete registration (admin only)
router.delete('/registrations/:id', protect, admin, async (req, res) => {
  try {
    const registration = await ElevateRegistration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 