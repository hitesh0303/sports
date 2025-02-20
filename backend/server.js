const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const elevateRoutes = require('./routes/elevateRoutes');
const userRoutes = require('./routes/userRoutes');

// Load env vars before using them
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/elevate', elevateRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 