const express = require('express');
const router = express.Router();
const Achievement = require('../models/achievementModel');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all achievements (public)
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ year: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create achievement (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update achievement (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete achievement (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 