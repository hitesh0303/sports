const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../config/fileStorage');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/gallery');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Serve static files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Upload image
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = `/uploads/gallery/${req.file.filename}`;
    
    res.status(201).json({
      url: imageUrl,
      title: req.body.title,
      description: req.body.description
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete image
router.delete('/:filename', protect, admin, async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(uploadsDir, filename);
    
    await fs.unlink(filepath);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 