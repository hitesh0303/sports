const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const Achievement = require('../models/achievementModel');
const Contact = require('../models/contactModel');
const { protect, admin } = require('../middleware/authMiddleware');

// Get admin dashboard stats
router.get('/stats', protect, admin, async (req, res) => {
  try {
    // Get total events count
    const totalEvents = await Event.countDocuments();

    // Get upcoming events count
    const upcomingEvents = await Event.countDocuments({
      startDate: { $gt: new Date() }
    });

    // Get total achievements count
    const totalAchievements = await Achievement.countDocuments();

    // Get unread messages count
    const unreadMessages = await Contact.countDocuments({ read: false });

    // Get recent achievements (last 5)
    const recentAchievements = await Achievement.find()
      .sort({ date: -1 })
      .limit(5);

    // Get upcoming events (next 5)
    const nextEvents = await Event.find({
      startDate: { $gt: new Date() }
    })
      .sort({ startDate: 1 })
      .limit(5);

    // Get achievement stats by level
    const achievementsByLevel = await Achievement.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get achievement stats by sport
    const achievementsBySport = await Achievement.aggregate([
      {
        $group: {
          _id: '$sport',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalEvents,
      upcomingEvents,
      totalAchievements,
      unreadMessages,
      recentAchievements,
      nextEvents,
      achievementsByLevel,
      achievementsBySport
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 