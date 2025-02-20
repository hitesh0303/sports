const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Achievement = require('../models/achievementModel');
const achievements = require('../data/achievementsSeed');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB...');
    
    // Clear existing achievements
    await Achievement.deleteMany({});
    
    // Insert seed data
    await Achievement.insertMany(achievements);
    
    console.log('Seed data inserted successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  }); 