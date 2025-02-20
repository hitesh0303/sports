const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/calendarModel');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all calendar events
router.get('/', async (req, res) => {
  try {
    const events = await CalendarEvent.find({});
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create calendar event (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const event = await CalendarEvent.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update calendar event (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const event = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete calendar event (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 