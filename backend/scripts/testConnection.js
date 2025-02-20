const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGO_URI.replace(/:[^:]*@/, ':****@'));
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connection successful!');
    console.log('Connected to:', conn.connection.host);
    console.log('Database name:', conn.connection.name);
    
    // Test write permission
    const testCollection = conn.connection.collection('connection_test');
    await testCollection.insertOne({ test: 'test', date: new Date() });
    console.log('Write test successful!');
    
    await testCollection.deleteOne({ test: 'test' });
    console.log('Delete test successful!');
    
    await mongoose.disconnect();
    console.log('All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('Connection test failed:', error);
    process.exit(1);
  }
}

testConnection(); 