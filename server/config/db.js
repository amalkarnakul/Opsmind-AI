const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Retry after 5 seconds instead of killing the process
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
