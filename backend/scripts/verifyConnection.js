const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function verifyConnection() {
  try {
    console.log('Testing MongoDB connection...');
    // Hide password in logs
    const sanitizedUri = process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log('Using connection string:', sanitizedUri);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'sports_portal'
    });
    
    console.log('Connection successful!');
    console.log('Connected to host:', conn.connection.host);
    console.log('Database name:', conn.connection.name);
    
    // Test database operations
    const testCollection = conn.connection.collection('connection_test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('Write test successful');
    
    await mongoose.disconnect();
    console.log('All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('Connection test failed:', error);
    if (error.code === 8000) {
      console.error('Authentication failed. Please check your credentials in .env file');
    }
    process.exit(1);
  }
}

verifyConnection(); 