const mongoose = require('mongoose');

const connectWithRetry = async (uri, retries = 5, timeout = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log('Attempting to connect to MongoDB...');
      const conn = await mongoose.connect(uri, {
        dbName: 'sports_portal'  // Explicitly specify database name
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error.message);
      if (error.code === 8000) {
        console.error('Authentication failed. Please check your credentials.');
        break; // Don't retry on auth failures
      }
      if (i < retries - 1) {
        console.log(`Retrying in ${timeout/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, timeout));
      }
    }
  }
  throw new Error('Failed to connect to MongoDB after multiple attempts');
};

const connectDB = async () => {
  try {
    // Try MongoDB Atlas first
    await connectWithRetry(process.env.MONGO_URI);
  } catch (atlasError) {
    console.error('Failed to connect to MongoDB Atlas:', atlasError.message);
    
    // Try local MongoDB as fallback
    try {
      console.log('Attempting to connect to local MongoDB...');
      await connectWithRetry(process.env.MONGO_URI_LOCAL);
    } catch (localError) {
      console.error('Failed to connect to local MongoDB:', localError.message);
      process.exit(1);
    }
  }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err);
    process.exit(1);
  }
});

module.exports = connectDB; 