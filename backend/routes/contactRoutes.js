const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all messages (admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit a new message (public)
router.post('/', async (req, res) => {
  try {
    const message = await Contact.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark message as read (admin only)
router.patch('/:id/read', protect, admin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete message (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 